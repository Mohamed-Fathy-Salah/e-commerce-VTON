from sqlmodel import Enum, Field, SQLModel

class Customers(SQLModel, table=True):
    id: str = Field(default=None, primary_key=True)
    betas: list[float] | None = Field(nullable= True)
    gender: str = Field(Enum("male", "female", "neutral"))
    skin: str = Field(Enum("black", "white", "middleEastern"))
