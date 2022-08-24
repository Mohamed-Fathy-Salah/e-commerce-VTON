from sqlmodel import Field, SQLModel
from ..types import Gender, SkinTone

class Customers(SQLModel, table=True):
    id: str = Field(default=None, primary_key=True)
    betas: list[float] | None = Field(nullable= True)
    gender: Gender
    skin: SkinTone | None = Field(nullable= True)
