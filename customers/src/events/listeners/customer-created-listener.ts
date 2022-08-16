import { Listener, CustomerCreatedEvent, Subjects } from "@mfsvton/common";
import { Message } from "node-nats-streaming";
import { Customer } from "../../models/customer";
import { natsWrapper } from "../../nats-wrapper";
import { CustomerDataCreatedPublisher } from "../publishers/customer-data-created-publisher";
import { queueGroupName } from "./queue-group-name";

export class CustomerCreatedListener extends Listener<CustomerCreatedEvent> {
  subject: Subjects.CustomerCreated = Subjects.CustomerCreated;
  queueGroupName = queueGroupName;
  async onMessage(
    data: CustomerCreatedEvent["data"],
    msg: Message
  ): Promise<void> {
    const customer = Customer.build({
      customerId: data.customerId,
      name: data.name,
      age: data.age,
      gender: data.gender,
    });
    await customer.save();

    new CustomerDataCreatedPublisher(natsWrapper.client).publish({
      customerId: customer.customerId,
      name: customer.name,
      age: customer.age,
      gender: customer.gender,
      version: customer.version,
    });

    msg.ack();
  }
}
