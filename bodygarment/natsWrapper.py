import asyncio
from nats.aio.client import Client as NATS
from stan.aio.client import Client as STAN
from sqlalchemy.future import select
from sqlalchemy import delete, and_, update
from os import environ
import json
import logging 
from db import async_session
from asyncpg.exceptions import UniqueViolationError
from models.customers import Customers
from models.garments import Garments
from texturemap import run as generate_texturemap
from betaCalc import run as get_betas

cluster_id = environ.get('NATS_CLUSTER_ID') 
client_id = environ.get('NATS_CLIENT_ID')
nats_uri = environ.get('NATS_URI')

log = logging.getLogger()
log.handlers.clear()
log.addHandler(logging.StreamHandler())
log.propagate = False

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

    # msg.data = {customerId: string, name: string, age: number, gender: Gender, version:number}
    async def customer_data_created_listener(msg):
        log.warning(f"------------------- customer created")
        data = json.loads(msg.data)

        try:
            customer = Customers(id= data['customerId'], gender= data['gender'], skin= 'white', version= data['version'])
            async with async_session() as session:
                session.add(customer)
                await session.commit()

            log.warning(f"customer created {data}")
            await sc.ack(msg)
        except UniqueViolationError:
            log.warning(f"customer already exists")
        except Exception as e:
            raise Exception('---------> something went wrong in customer data created listener', str(e))

    async def customer_data_updated_listener(msg):
        log.warning(f"------------------- customer updated")
        data = json.loads(msg.data)
        
        try:
            async with async_session() as session:
                stmt = None

                if 'measurements' in data:
                    betas = get_betas(data['measurements'], data['gender'])
                    stmt = update(Customers).where(and_(Customers.id == data['customerId'], Customers.version == data['version'] - 1)).values(gender=data['gender'], version=data['version'], skin=data['skin'], betas=betas).execution_options(synchronize_session="evaluate")
                else:
                    stmt = update(Customers).where(and_(Customers.id == data['customerId'], Customers.version == data['version'] - 1)).values(gender=data['gender'], version=data['version'], skin=data['skin']).execution_options(synchronize_session="evaluate")

                await session.execute(stmt)

                await session.commit()

            log.warning(f"customer updated {data}")
            await sc.ack(msg)
        except Exception as e:
            raise Exception('---------> something went wrong in customer data updated listener', str(e))

    # msg.data = {garmentId: string; adminId: string; garmentClass: GarmentClass; gender: Gender; small: number; medium: number; large: number; xlarge: number; xxlarge: number; price: number; frontPhoto: string; backPhoto: string; version: number;}
    async def garment_created_listener(msg):
        data = json.loads(msg.data)
        log.warning(f"------------------- garment created {data}")

        try:
            texturemap = generate_texturemap(data['frontPhoto'], data['backPhoto'], data['garmentClass'], data['gender'])

            garment = Garments(id= data['garmentId'], garmentClass= data['garmentClass'], textureMap= texturemap, version=data['version'])

            async with async_session() as session:
                session.add(garment)
                await session.commit()

            log.warning(f" garment created {data}")
            await sc.ack(msg)
        except UniqueViolationError:
            log.warning(f"garment already exists")
        except Exception as e:
            raise Exception('---------> something went wrong in garment created listener', str(e))

    # msg.data = {garmentId: string; adminId: string; garmentClass: GarmentClass; gender: Gender; small: number; medium: number; large: number; xlarge: number; xxlarge: number; price: number; frontPhoto?: string; backPhoto?: string; version: number;}
    async def garment_updated_listener(msg):
        log.warning(f"------------------- garment update")
        data = json.loads(msg.data)

        try:
            async with async_session() as session:
                stmt = None

                if 'frontPhoto' in data and 'backPhoto' in data:
                    texturemap = generate_texturemap(data['frontPhoto'], data['backPhoto'], data['garment'], data['gender'])
                    stmt = update(Garments).where(and_(Garments.id == data['garmentId'], Garments.version == data['version'] - 1)).values(garmentClass=data['garmentClass'], version=data['version'], texturemap=texturemap).execution_options(synchronize_session="evaluate")
                else:
                    stmt = update(Garments).where(and_(Garments.id == data['garmentId'], Garments.version == data['version'] - 1)).values(garmentClass=data['garmentClass'], version=data['version']).execution_options(synchronize_session="evaluate")
                
                await session.execute(stmt)
                await session.commit()

            log.warning(f" garment updated {data}")
            await sc.ack(msg)
        except Exception as e:
            raise Exception('---------> something went wrong in garment udpated listener', str(e))


    # msg.data = {garmentId: string; adminId: string; version: number;}
    async def garment_deleted_listener(msg):
        log.warning(f"------------------- garment deleted")
        data = json.loads(msg.data)

        try:
            async with async_session() as session:
                await session.execute(delete(Garments).where(and_(Garments.id == data['garmentId'], Garments.version == data['version'])))

                await session.commit()

            log.warning(f" garment deleted {data}")
            await sc.ack(msg)
        except Exception as e:
            raise Exception('---------> something went wrong in garment udpated listener', str(e))


    queueGroupName = "bodygarment-service"

    # todo: process new events only
    await sc.subscribe("customer:data:created", cb=customer_data_created_listener, manual_acks=True, durable_name= queueGroupName, ack_wait=10)
    await sc.subscribe("customer:data:updated", cb=customer_data_updated_listener, manual_acks=True, durable_name= queueGroupName, ack_wait=10)
    await sc.subscribe("garment:created", cb=garment_created_listener, manual_acks=True, durable_name= queueGroupName, ack_wait=10)
    await sc.subscribe("garment:updated", cb=garment_updated_listener, manual_acks=True, durable_name= queueGroupName, ack_wait=10)
    await sc.subscribe("garment:deleted", cb=garment_deleted_listener, manual_acks=True, durable_name= queueGroupName, ack_wait=10)

def connect():
    check_environment_vars()

    loop = asyncio.get_running_loop()
    loop.create_task(run(loop))
    # loop.run_forever()
