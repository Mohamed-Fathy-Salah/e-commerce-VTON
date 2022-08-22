import asyncio
from nats.aio.client import Client as NATS
from stan.aio.client import Client as STAN
from os import environ
import json

cluster_id = environ.get('NATS_CLUSTER_ID') 
client_id = environ.get('NATS_CLIENT_ID')
nats_uri = environ.get('NATS_URI')

def check_environment_vars():
    if(not cluster_id):
        raise Exception("NATS_CLUSTER_ID not defined")

    if(not client_id):
        raise Exception("NATS_CLIENT_ID not defined")

    if(not nats_uri):
        raise Exception("NATS_URI not defined")

async def run(loop):
    nc = NATS()
    await nc.connect(io_loop=loop, servers=[nats_uri])

    sc = STAN()
    await sc.connect(cluster_id, client_id, nats=nc, loop=loop)

    async def garment_created_listener(msg):
        print("Received a message (seq={}): {}".format(msg.seq, msg.data))
        data = json.loads(msg.data)
        garmentClass = data['garmentClass']
        gender = data['gender']
        frontPhoto = data['frontPhoto']
        backPhoto = data['backPhoto']
        print(garmentClass, gender)
        #todo : run ../../contours.py
        await sc.publish("texturemap:created", b'created')

    async def garment_updated_listener(msg):
        print("Received a message (seq={}): {}".format(msg.seq, msg.data))
        data = json.loads(msg.data)
        garmentClass = data['garmentClass']
        gender = data['gender']
        frontPhoto = data['frontPhoto']
        backPhoto = data['backPhoto']
        print(garmentClass, gender)
        #todo : run ../../contours.py
        await sc.publish("texturemap:created", b'updated')

    await sc.subscribe("garment:created", cb=garment_created_listener)
    await sc.subscribe("garment:updated", cb=garment_updated_listener)

if __name__ == "__main__":
    check_environment_vars()
    loop = asyncio.get_event_loop()
    loop.run_until_complete(run(loop))
    loop.run_forever()

# import base64
# from PIL import Image
# import cv2
# from StringIO import StringIO
# import numpy as np

# def readb64(base64_string):
    # sbuf = StringIO()
    # sbuf.write(base64.b64decode(base64_string))
    # pimg = Image.open(sbuf)
    # return cv2.cvtColor(np.array(pimg), cv2.COLOR_RGB2BGR)

# cvimg = readb64('R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7')
# cv2.imshow(cvimg)
# -----------------

# image = b'R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7'
# # or, more concisely using with statement

# with open("x.png", "wb") as fh:
    # fh.write(base64.decodebytes(image))

