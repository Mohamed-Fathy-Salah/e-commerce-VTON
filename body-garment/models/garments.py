from sqlmodel import Field, SQLModel
from ..types import GarmentClass

class Garments(SQLModel, table=True):
    id: str = Field(default=None, primary_key=True)
    garmentClass: GarmentClass
    textureMap: str # todo: use file
