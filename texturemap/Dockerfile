FROM python:3.9.13-slim-buster

#RUN apt update && apt install python3 python3-pip -y

COPY requirements.txt .
RUN pip3 install -r requirements.txt
WORKDIR /app

COPY . .

CMD ["python3", "main.py"]
