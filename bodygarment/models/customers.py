from sqlmodel import Enum, Field, SQLModel
import json

class Customers(SQLModel, table=True):
    id: str = Field(default=None, primary_key=True)
    betas: str = Field(default=json.dumps([0]*10))
    gender: str = Field(Enum("male", "female", "neutral"))
    skin: str = Field(Enum("black", "white", "middleEastern"))
    version: int
