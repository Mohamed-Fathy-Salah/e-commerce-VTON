#todo: https://testdriven.io/blog/fastapi-sqlmodel/
from sqlmodel import SQLModel
from os import environ
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.future import select
from sqlalchemy.orm import declarative_base, relationship, selectinload, sessionmaker

DATABASE_URL = environ.get("POSTGRESQL_URI")

engine = create_async_engine(DATABASE_URL, echo=True, future=True)

async_session = sessionmaker( engine, expire_on_commit=False, class_=AsyncSession)
# Session = scoped_session(sessionmaker(autocommit=False, autoflush=True, bind=engine))
# Session = sessionmaker( engine, class_=AsyncSession, autocommit=False, authflush=True, expire_on_commit=False)

async def init_db():
    if not DATABASE_URL:
        raise Exception("POSTGRESQL_URI not defined")

    async with engine.begin() as conn:
        # await conn.run_sync(SQLModel.metadata.drop_all)
        await conn.run_sync(SQLModel.metadata.create_all)



async def get_session():
    async with async_session() as session:
        yield session

# class DB(object):
    # def __new__(cls):
        # if not hasattr(cls, 'instance'):
            # cls.instance = super(DB, cls).__new__(cls)

            # database_URI = environ.get('POSTGRESQL_URI')
            # if(not database_URI):
                # raise Exception("POSTGRESQL_URI not defined")

            # cls.engine = create_engine(database_URI, echo=True)

            # SQLModel.metadata.create_all(cls.engine)

        # return cls.instance

