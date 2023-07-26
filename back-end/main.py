from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel



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



class Graph(BaseModel):
    graph: dict


def dls(graph, current, goal, depth):
    if depth == 0 and current == goal:
        return [current]
    elif depth > 0:
        for neighbor in graph[current]:
            result = dls(graph, neighbor, goal, depth - 1)
            if result is not None:
                return [current] + result
    return None


@app.get("/")
def read_root():
  return {"Hello": "World"}


@app.post("/ids")
async def ids(graph: Graph, start: str, goal: str):
    depth = 0
    while True:
        result = dls(graph.graph, start, goal, depth)
        if result is not None:
            return {"path": result}
        depth += 1





