FROM mofasa101/tailor

ADD https://nextcloud.mpi-klsb.mpg.de/index.php/s/W7a57iXRG9Yms6P/download?path=%2F&files=short-pant_female.zip&downloadStartSecret=vuvugams4p /app/data/short-pant_female.zip
ADD https://nextcloud.mpi-klsb.mpg.de/index.php/s/LTWJPcRt7gsgoss/download?files=short-pant_female_weights.zip /app/weights/short-pant_female_weights.zip

RUN cd /app/data && unzip short-pant_female.zip && rm short-pant_female.zip
RUN cd /app/weights && unzip short-pant_female_weights.zip && rm short-pant_female_weights.zip

COPY . ./TailorNet

RUN pip install pyjwt fastapi uvicorn asyncio-nats-streaming

CMD ["uvicorn main:app --reload"]
