# Docker Integration Stub
# In production, this would use the 'docker' python package to hook into the local docker daemon
# socket (unix:///var/run/docker.sock) and extract container metrics.

def discover_docker_containers():
    """
    Returns a mocked list of Docker containers.
    """
    return [
        {"container_id": "c1a2b3c4", "name": "frontend_app", "status": "running", "image": "cloudmon-frontend:latest"},
        {"container_id": "f5e6d7c8", "name": "backend_api", "status": "running", "image": "cloudmon-backend:latest"},
        {"container_id": "9a8b7c6d", "name": "postgres_db", "status": "running", "image": "postgres:15-alpine"}
    ]
