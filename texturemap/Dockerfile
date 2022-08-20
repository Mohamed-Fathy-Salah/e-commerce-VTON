FROM ubuntu

RUN apt update && apt install python3 python3-pip -y
RUN pip3 install opencv-python numpy "uvicorn[standard]" asyncio-nats-streaming enum34
WORKDIR /app

COPY . .

CMD ["python3", "main.py"]
