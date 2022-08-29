from sqlmodel import Enum, Field, SQLModel

class Garments(SQLModel, table=True):
    id: str = Field(default=None, primary_key=True)
    garmentClass: str = Field(Enum("shirt", "skirt", "t-shirt", "pant", "short-pant"))
    textureMap: str
    version: int
