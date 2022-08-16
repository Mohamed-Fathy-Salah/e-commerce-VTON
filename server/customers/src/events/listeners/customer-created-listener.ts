import { Listener, CustomerCreatedEvent, Subjects } from "@mfsvton/common";
import { Message } from "node-nats-streaming";
import { Customer } from "../../models/customer";
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

    msg.ack();
  }
}
