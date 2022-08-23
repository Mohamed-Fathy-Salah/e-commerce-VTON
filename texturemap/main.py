import asyncio
from nats.aio.client import Client as NATS
from stan.aio.client import Client as STAN
from os import environ
import json
import logging
from contours import run as generate

log = logging.getLogger()
log.addHandler(logging.StreamHandler())

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
        log.warning("Received a message (seq={}): {}".format(msg.seq, msg.data))

        data = json.loads(msg.data)

        garmentId = data['garmentId']
        garmentClass = data['garmentClass']
        gender = data['gender']
        frontPhoto = data['frontPhoto']
        backPhoto = data['backPhoto']

        try:
            texturemap = generate(frontPhoto, backPhoto, garmentClass, gender)
            response = json.dumps({"texturemap": texturemap, "garmentId": garmentId})
            log.warning(response)
            await sc.publish("texturemap:created", response)
            log.warning('ack')
            await sc.ack(msg)
        except Exception as e:
            log.error(e)


    async def garment_updated_listener(msg):
        log.warning("Received a message (seq={}): {}".format(msg.seq, msg.data))

        data = json.loads(msg.data)

        frontPhoto = data['frontPhoto']
        backPhoto = data['backPhoto']

        # work only when front & back are changed
        if(frontPhoto and backPhoto):
            garmentId = data['garmentId']
            garmentClass = data['garmentClass']
            gender = data['gender']

            texturemap = generate(frontPhoto, backPhoto, garmentClass, gender)
            response = json.dumps({"texturemap": texturemap, "garmentId": garmentId})
            await sc.publish("texturemap:created", response)

        await sc.ack(msg)

    await sc.subscribe("garment:created", cb=garment_created_listener)
    await sc.subscribe("garment:updated", cb=garment_updated_listener)

if __name__ == "__main__":
    check_environment_vars()
    loop = asyncio.get_event_loop()
    loop.run_until_complete(run(loop))
    loop.run_forever()

