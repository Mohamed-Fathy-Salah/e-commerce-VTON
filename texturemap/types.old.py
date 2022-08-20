from enum import Enum

class UserType(Enum):
    ADMIN = 'admin'
    CUSTOMER = 'customer'

class Gender(Enum):
    MALE = 'male'
    FEMALE = 'female'
    NEUTRAL = 'neutral'

class GarmentClass(Enum):
    SHIRT = 'shirt'
    SKIRT = 'skirt'
    T_SHIRT = 't-shirt'
    PANT = 'pant'
    SHORT_PANT = 'short-pant'

class Subjects(Enum):
    GARMENT_CREATED = "garment:created"
    TEXTUREMAP_CREATED = "texturemap:created"
