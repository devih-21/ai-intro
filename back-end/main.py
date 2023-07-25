from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware




app = FastAPI()
origins = [
  "http://localhost",
  "http://localhost:3001",
  "http://localhost:8000"
]

app.add_middleware(
  CORSMiddleware,
  allow_origins=origins,
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
  expose_headers=["*"]
)





@app.get("/")
def read_root():
  return {"Hello": "World"}


