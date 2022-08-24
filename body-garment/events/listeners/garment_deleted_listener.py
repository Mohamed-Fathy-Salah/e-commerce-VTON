# delete garment garmentId: string
async def garment_deleted_listener(msg):
    print("Received a message (seq={}): {}".format(msg.seq, msg.data))
    #todo
