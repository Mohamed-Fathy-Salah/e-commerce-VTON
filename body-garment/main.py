from fastapi import FastAPI, Cookie, Response, status
from .db import DB
from .cookie import get_current_user
from sqlmodel import Session
from models.customers import Customers
from models.garments import Garments
from typing import Optional
from .types import Poses, UserType
from natsWrapper import connect
import uvicorn

app = FastAPI()

@app.on_event("startup")
def on_startup():
    DB()
    connect()

@app.get('/api/bodygarment/lower/{garmentId}', status_code= status.HTTP_200_OK)
def body_lower_garment(garmentId: str, response: Response, pose: Poses = Poses.T, encoded_token: Optional[str] = Cookie(None)):
    # encoded_token = request.cookies.get('session')

    current_user = get_current_user(encoded_token)
    print(current_user)

    if(not current_user or current_user['type'] == UserType.ADMIN):
        response.status_code = status.HTTP_401_UNAUTHORIZED
        return "not authorized"

    with Session(DB().engine) as session:
        customer = session.query(Customers).get(current_user['id'])

        if(not customer):
            response.status_code = status.HTTP_404_NOT_FOUND
            return "customer not found"

        if(not customer['betas']):
            response.status_code = status.HTTP_400_BAD_REQUEST
            return "measurements not set"
        
        garment = session.query(Garments).get(garmentId)
        
        if(not garment):
            response.status_code = status.HTTP_404_NOT_FOUND
            return "garment not found"
        
        if(not garment['textureMap']):
            response.status_code = status.HTTP_400_BAD_REQUEST
            return "garment do not have texure map"

    #todo: run tailorNet with user beta, pose, garment, size
    #todo: return obj file

    return "hi"

if __name__ == "__main__":
    uvicorn.run("main:app", port=3000, log_level="info")
