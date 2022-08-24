from os import environ
import base64
import json
import jwt

def get_current_user(encoded_token: str | None):
    secret = environ.get('JWT_KEY')

    if(not encoded_token or not secret):
        return None

    token = json.loads(base64.b64decode(encoded_token))['jwt']
    payload = jwt.decode(token, secret, algorithms=['HS256'])

    return payload
