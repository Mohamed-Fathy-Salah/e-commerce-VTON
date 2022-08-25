import asyncio
from fastapi import Depends
from nats.aio.client import Client as NATS
from stan.aio.client import Client as STAN
from os import environ
import json
import logging as log
from db import get_session
from sqlalchemy.ext.asyncio import AsyncSession

from models.customers import Customers

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
    async def customer_data_created_listener(msg, session: AsyncSession = Depends(get_session)):
        data = json.loads(msg.data)
        log.warning(f"customer created {data}")
        customer = Customers(id= data['customerId'], gender= data['gender'], skin= 'white')

        session.add(customer)
        await session.commit()
        await session.refresh(customer)
        await sc.ack(msg)

    async def customer_data_updated_listener(msg):
        data = json.loads(msg.data)
        # with Session(DB().engine) as session:
            # session.get()
        log.warning(f" customer updated {data}")
        await sc.ack(msg)

    async def garment_created_listener(msg):
        data = json.loads(msg.data)
        log.warning(f" garment created {data}")
        await sc.ack(msg)

    async def garment_updated_listener(msg):
        data = json.loads(msg.data)
        log.warning(f" garment updated {data}")
        await sc.ack(msg)

    async def garment_deleted_listener(msg):
        data = json.loads(msg.data)
        log.warning(f" garment deleted {data}")
        await sc.ack(msg)

    async def texturemap_created_listener(msg):
        data = json.loads(msg.data)
        log.warning(f"texturemap created {data}")
        await sc.ack(msg)

    queueGroupName = "bodygarment-service"

    await sc.subscribe("customer:data:created", cb=customer_data_created_listener, deliver_all_available=True, manual_acks=True, ack_wait=True, durable_name= queueGroupName)
    await sc.subscribe("customer:data:updated", cb=customer_data_updated_listener, deliver_all_available=True, manual_acks=True, ack_wait=True, durable_name= queueGroupName)
    await sc.subscribe("garment:created", cb=garment_created_listener, deliver_all_available=True, manual_acks=True, ack_wait=True, durable_name= queueGroupName)
    await sc.subscribe("garment:updated", cb=garment_updated_listener, deliver_all_available=True, manual_acks=True, ack_wait=True, durable_name= queueGroupName)
    await sc.subscribe("garment:deleted", cb=garment_deleted_listener, deliver_all_available=True, manual_acks=True, ack_wait=True, durable_name= queueGroupName)
    await sc.subscribe("texturemap:created", cb=texturemap_created_listener, deliver_all_available=True, manual_acks=True, ack_wait=True, durable_name= queueGroupName)

def connect():
    check_environment_vars()

    loop = asyncio.get_running_loop()
    loop.create_task(run(loop))
    # loop.run_forever()
