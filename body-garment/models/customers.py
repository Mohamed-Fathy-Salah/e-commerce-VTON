from sqlmodel import Enum, Field, SQLModel

class Customers(SQLModel, table=True):
    id: str = Field(default=None, primary_key=True)
    betas: list[float] = Field(default=[0]*10)
    gender: str = Field(Enum("male", "female", "neutral"))
    skin: str = Field(Enum("black", "white", "middleEastern"))
