#update customer {customerId: string, name: string, gender: (male, female), age: number, skin: (black,...), measurements: {...}, photo: file, sizePreferences: [{garmentClass:(shirt, ...), size: (s,m, ...)}]}
async def customer_data_updated_listener(msg):
    print("Received a message (seq={}): {}".format(msg.seq, msg.data))
    #todo
