import os

import uvicorn

from app.server import app

if __name__ == "__main__":
    os.chdir("./")
    uvicorn.run(app, host="0.0.0.0", port=80, proxy_headers=True, forwarded_allow_ips="*")
