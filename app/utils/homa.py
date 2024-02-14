import httpx
import os
from Crypto.Cipher import PKCS1_OAEP
from Crypto.PublicKey import RSA
from base64 import b64encode


def homa_encrypt(msg) -> str:
    public_key = """-----BEGIN PUBLIC KEY-----
    %s
    -----END PUBLIC KEY-----
    """ % os.getenv("HOMA_PUBLIC_KEY")
    public_key = RSA.import_key(public_key)
    cipher = PKCS1_OAEP.new(public_key)
    encrypted = cipher.encrypt(msg.encode())
    b64_encrypted = b64encode(encrypted).decode('utf-8')
    return b64_encrypted


def get_homa_token() -> str:
    url = "https://homa.snapgenshin.com/Passport/Login"
    data = {
        "UserName": homa_encrypt(os.getenv("HOMA_USERNAME")),
        "Password": homa_encrypt(os.getenv("HOMA_PASSWORD"))
    }
    response = httpx.post(url, json=data)
    if response.status_code != 200:
        raise Exception("Failed to get Homa token")
    token = response.json()["data"]
    return "Bearer %s" % token


def assign_homa_user_membership_time(user_email: str, day: int) -> dict:
    url = os.getenv("HOMA_ASSIGN_ENDPOINT").format(
        userName=user_email,
        days=str(day)
    )
    headers = {
        "Authorization": get_homa_token()
    }
    response = httpx.get(url, headers=headers)
    if response.status_code != 200:
        raise Exception("Failed to assign Homa user membership time")
    return {
        "status": 200,
        "message": response.json()["message"]
    }
