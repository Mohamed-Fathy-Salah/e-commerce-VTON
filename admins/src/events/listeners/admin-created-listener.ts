import { Listener, AdminCreatedEvent, Subjects } from "@mfsvton/common";
import { Message } from "node-nats-streaming";
import { Admin } from "../../models/admin";
import { queueGroupName } from "./queue-group-name";

export class AdminCreatedListener extends Listener<AdminCreatedEvent> {
    subject: Subjects.AdminCreated = Subjects.AdminCreated;
    queueGroupName = queueGroupName;
    async onMessage(data: AdminCreatedEvent['data'], msg: Message) {
        const admin = Admin.build({
            adminId: data.adminId,
            name: data.name
        });
        await admin.save();

        msg.ack();
    }
}
