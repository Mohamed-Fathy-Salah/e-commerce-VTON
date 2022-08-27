import asyncio
from nats.aio.client import Client as NATS
from stan.aio.client import Client as STAN
from sqlalchemy.future import select
from os import environ
import json
import logging as log
from db import async_session
from asyncpg.exceptions import UniqueViolationError
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
    async def customer_data_created_listener(msg):
        data = json.loads(msg.data)

        try:
            customer = Customers(id= data['customerId'], gender= data['gender'], skin= 'white', version= data['version'])
            async with async_session() as session:
                session.add(customer)
                await session.commit()
        except UniqueViolationError:
            log.warning(f"customer already exists")
        except Exception as e:
            raise Exception('---------> something went wrong in customer data created listener', str(e))

        log.warning(f"customer created {data}")
        await sc.ack(msg)

    async def customer_data_updated_listener(msg):
        data = json.loads(msg.data)

        try:
            async with async_session() as session:
                customer = await session.execute(select(Customers).where(Customers.id == data['customerId'] and Customers.version == data['version'] - 1 )).one()

                if not customer:
                    raise Exception("customer not found")

                customer['gender'] = data['gender']
                # todo : customers['betas'] = get_betas(data['measurements'], data['gender'])
                customer['skin'] = data['skin']
                customer['version'] = data['version']
                
                await session.commit()
        except Exception as e:
            raise Exception('---------> something went wrong in customer data created listener', str(e))

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

    # todo: process new events only
    await sc.subscribe("customer:data:created", cb=customer_data_created_listener, deliver_all_available=True, manual_acks=True, durable_name= queueGroupName)
    await sc.subscribe("customer:data:updated", cb=customer_data_updated_listener, deliver_all_available=True, manual_acks=True, durable_name= queueGroupName)
    await sc.subscribe("garment:created", cb=garment_created_listener, deliver_all_available=True, manual_acks=True, durable_name= queueGroupName)
    await sc.subscribe("garment:updated", cb=garment_updated_listener, deliver_all_available=True, manual_acks=True, durable_name= queueGroupName)
    await sc.subscribe("garment:deleted", cb=garment_deleted_listener, deliver_all_available=True, manual_acks=True, durable_name= queueGroupName)
    await sc.subscribe("texturemap:created", cb=texturemap_created_listener, deliver_all_available=True, manual_acks=True, durable_name= queueGroupName)

def connect():
    check_environment_vars()

    loop = asyncio.get_running_loop()
    loop.create_task(run(loop))
    # loop.run_forever()
