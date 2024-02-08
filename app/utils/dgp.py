import httpx


def fetch_token_from_homa(username: str, encoded_password: str) -> str:
	url = "https://homa.com/api/token"
	data = {"username": username, "password": encoded_password}
	response = httpx.post(url, data=data)
	return response.json()["access_token"]
