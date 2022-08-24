import asyncio
from nats.aio.client import Client as NATS
from stan.aio.client import Client as STAN
from os import environ
import json
from sqlmodel import Session, select
from db import DB
import logging

from models.customers import Customers

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

    # {customerId: string, name: string, age: number, gender: Gender, version:number}
    async def customer_data_created_listener(msg):
        data = json.loads(msg.data)
        log.warning(data)
        with Session(DB().engine) as session:
            customer = Customers(id= data['customerId'], gender= data['gender'], skin= 'white')
            session.add(customer)
            session.commit()
            session.refresh(customer)
            await sc.ack(msg)
            return customer

    async def customer_data_updated_listener(msg):
        data = json.loads(msg.data)
        # with Session(DB().engine) as session:
            # session.get()
        log.warning(data)
        await sc.ack(msg)

    async def garment_created_listener(msg):
        data = json.loads(msg.data)
        log.warning(data)
        await sc.ack(msg)

    async def garment_updated_listener(msg):
        data = json.loads(msg.data)
        log.warning(data)
        await sc.ack(msg)

    async def garment_deleted_listener(msg):
        data = json.loads(msg.data)
        log.warning(data)
        await sc.ack(msg)

    async def texturemap_created_listener(msg):
        data = json.loads(msg.data)
        log.warning(data)
        await sc.ack(msg)

    await sc.subscribe("customer:data:created", cb=customer_data_created_listener)
    await sc.subscribe("customer:data:updated", cb=customer_data_updated_listener)
    await sc.subscribe("garment:created", cb=garment_created_listener)
    await sc.subscribe("garment:updated", cb=garment_updated_listener)
    await sc.subscribe("garment:deleted", cb=garment_deleted_listener)
    await sc.subscribe("texturemap:created", cb=texturemap_created_listener)

def connect():
    check_environment_vars()

    loop = asyncio.get_running_loop()
    loop.create_task(run(loop))
    # loop.run_forever()
