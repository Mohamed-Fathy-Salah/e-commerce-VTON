async def garment_created_listener(msg):
    print("Received a message (seq={}): {}".format(msg.seq, msg.data))
    #todo
    # get front and back images - garment class - gender
    # assure garment class in enum
    # assure gender in enum
    # run ../../contours.py
    # publish event to subject texturemap:created ->  await sc.publish(subject, b'hello')
