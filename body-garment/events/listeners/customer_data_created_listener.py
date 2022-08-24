from sqlmodel import Session, SQLModel, create_engine, select
from ...db import DB
from ...models.customers import Customers

async def customer_data_created_listener(msg):
    print("Received a message (seq={}): {}".format(msg.seq, msg.data))
    
    customer = Customers(id=msg.data['customerId'], gender=msg.data['gender'], betas=None, skin=None)

    #todo : test
    with Session(DB.engine) as session:
        session.add(customer)    
        session.commit()
        session.refresh(customer)
        return customer
