const HOMA_TOKEN = "homa_token"

function getToken() {
  return getCookie(HOMA_TOKEN)
}

function BearerWrap(token) {
  return `Bearer ${token}`
}

function getTokenExp(token) {
  const tokenPayload = token.split('.')[1];
  const payload = JSON.parse(atob(tokenPayload));
  return payload.exp * 1000;
}

function setTokenWithExpiry(token) {
  const expiry = Date.now() + 3 * 60 * 60 * 1000;

  setCookie(HOMA_TOKEN, token, expiry)
}