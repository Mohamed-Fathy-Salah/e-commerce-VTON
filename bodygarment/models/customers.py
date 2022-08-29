from sqlmodel import Field, SQLModel
import json

class Customers(SQLModel, table=True):
    id: str = Field(default=None, primary_key=True)
    betas: str = Field(default=json.dumps([0]*10))
    gender: str
    skin: str
    version: int
