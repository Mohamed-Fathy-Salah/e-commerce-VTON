FROM ubuntu

RUN apt update && apt install python3 python3-pip -y
RUN pip install opencv-python numpy "uvicorn[standard]"
WORKDIR /app

COPY . .

CMD ["python3", "main.py"]
