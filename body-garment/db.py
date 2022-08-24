from sqlmodel import SQLModel, create_engine
from os import environ

class DB(object):
    def __new__(cls):
        if not hasattr(cls, 'instance'):
            cls.instance = super(DB, cls).__new__(cls)

            database_URI = environ.get('POSTGRESQL_URI')
            if(not database_URI):
                raise Exception("POSTGRESQL_URI not defined")

            cls.engine = create_engine(database_URI, echo=True)

            SQLModel.metadata.create_all(cls.engine)

        return cls.instance
