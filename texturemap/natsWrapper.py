import asyncio
from nats.aio.client import Client as NATS
from stan.aio.client import Client as STAN
# from .types import Subjects
from os import environ
from events.listeners.garment_created_listener import garment_created_listener

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

# async def run(loop):
async def run():
    check_environment_vars()
    nc = NATS()
    # await nc.connect(io_loop=loop)
    await nc.connect()

    sc = STAN()
    await sc.connect(cluster_id, client_id, nats=nats_uri)

    await sc.subscribe("garment:created", cb=garment_created_listener)

# def connect():
    # check_environment_vars()
    # loop = asyncio.new_event_loop()
    # asyncio.set_event_loop(loop)
    # loop.run_until_complete(run(loop))
    # loop.close()
