# update garment {garmentId: string, garmentClass:(shirt, ...), texutre map: file}
async def garment_updated_listener(msg):
    print("Received a message (seq={}): {}".format(msg.seq, msg.data))
    #todo
