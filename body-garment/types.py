from enum import Enum

class UserType(Enum):
    ADMIN = 'admin'
    CUSTOMER = 'customer'

class SkinTone(Enum):
    BLACK = 'black'
    WHITE = 'white'
    MIDDLE_EASTERN = 'middleEastern'

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
    CUSTOMER_DATA_CREATED = "customer:data:created"
    CUSTOMER_DATA_UPDATED = "customer:data:updated"
    GARMENT_UPDATED = "Garment:updated"
    GARMENT_CREATED = "Garment:created"
    GARMENT_DELETED = "Garment:deleted"

class Poses(Enum):
    A = 'A'
    T = 'T'
    I = 'I'
    Y = 'Y'
    @classmethod
    def has_value(cls, value):
        return value in cls._value2member_map_
