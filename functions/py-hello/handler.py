from fastapi import FastAPI
from mangum import Mangum

import logging

log = logging.getLogger(__name__)

log.setLevel(logging.INFO)

log.info("FastAPI cold start")
app = FastAPI()


@app.get("/py/hello")
async def hello():
    return {"message": "Hello from Python!"}


handler = Mangum(app, lifespan="off")
