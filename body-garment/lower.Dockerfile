#FROM mofasa101/tailor
#FROM ubuntu
FROM python:3.9.13-slim-buster
#RUN apt update && apt install python3 python3-pip -y

#ADD https://nextcloud.mpi-klsb.mpg.de/index.php/s/W7a57iXRG9Yms6P/download?path=%2F&files=short-pant_female.zip&downloadStartSecret=vuvugams4p /app/data/short-pant_female.zip
#ADD https://nextcloud.mpi-klsb.mpg.de/index.php/s/LTWJPcRt7gsgoss/download?files=short-pant_female_weights.zip /app/weights/short-pant_female_weights.zip

#RUN cd /app/data && unzip short-pant_female.zip && rm short-pant_female.zip
#RUN cd /app/weights && unzip short-pant_female_weights.zip && rm short-pant_female_weights.zip

COPY requirements.txt .

RUN pip3 install -r requirements.txt

#COPY . ./TailorNet

COPY . .

CMD ["python3", "main.py"]
