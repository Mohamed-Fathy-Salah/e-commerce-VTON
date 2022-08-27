from fastapi import FastAPI, Response, status, Request, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from cookie import get_current_user
from db import init_db, get_session
from models.customers import Customers
from models.garments import Garments
from natsWrapper import connect
import uvicorn
import logging

log = logging.getLogger()
log.addHandler(logging.StreamHandler())

app = FastAPI()

@app.on_event("startup")
async def on_startup():
    await init_db()
    connect()

@app.get('/api/bodygarment/lower', status_code= status.HTTP_200_OK)
async def customers(request: Request, response: Response, session: AsyncSession = Depends(get_session)):
    customers = await session.execute(select(Customers))
    return customers.all()

@app.get('/api/bodygarment/lower/{garmentId}', status_code= status.HTTP_200_OK)
async def body_lower_garment(garmentId: str, request: Request, response: Response, pose:str = 'T', session: AsyncSession = Depends(get_session)):
    encoded_token = request.cookies.get('session')
    current_user = get_current_user(encoded_token)

    if(not current_user or current_user['type'] == "admin"):
        response.status_code = status.HTTP_401_UNAUTHORIZED
        return "not authorized"

    customer = await session.execute(select(Customers).where(Customers.id == current_user['id']))
    customer = customer.one()
    log.warning(f"customer ===================== {customer}")

    if(not customer):
        response.status_code = status.HTTP_404_NOT_FOUND
        return "customer not found"

    if(not customer['betas']):
        response.status_code = status.HTTP_400_BAD_REQUEST
        return "measurements not set"
    
    garment = await session.execute(select(Garments).where(Garments.id == garmentId))
    garment = garment.one()
    
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
    uvicorn.run("main:app", host= '0.0.0.0' , port=3000, log_level="info")
