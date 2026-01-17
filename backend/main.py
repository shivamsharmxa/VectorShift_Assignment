from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any

app = FastAPI()

# Add CORS middleware to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PipelineData(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: PipelineData):
    nodes = pipeline.nodes
    edges = pipeline.edges
    
    num_nodes = len(nodes)
    num_edges = len(edges)
    
    # Check if graph is a DAG (Directed Acyclic Graph)
    is_dag = check_is_dag(nodes, edges)
    
    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': is_dag
    }

def check_is_dag(nodes: List[Dict], edges: List[Dict]) -> bool:
    """
    Determines if the graph is a Directed Acyclic Graph (DAG)
    using DFS with cycle detection.
    """
    # Build adjacency list
    graph = {}
    node_ids = {node['id'] for node in nodes}
    
    # Initialize graph with all nodes
    for node_id in node_ids:
        graph[node_id] = []
    
    # Add edges to graph
    for edge in edges:
        source = edge.get('source')
        target = edge.get('target')
        if source and target:
            graph[source].append(target)
    
    # DFS with cycle detection
    visited = set()
    rec_stack = set()
    
    def has_cycle(node):
        visited.add(node)
        rec_stack.add(node)
        
        for neighbor in graph.get(node, []):
            if neighbor not in visited:
                if has_cycle(neighbor):
                    return True
            elif neighbor in rec_stack:
                # Back edge found - cycle detected
                return True
        
        rec_stack.remove(node)
        return False
    
    # Check all nodes for cycles
    for node_id in node_ids:
        if node_id not in visited:
            if has_cycle(node_id):
                return False
    
    return True
