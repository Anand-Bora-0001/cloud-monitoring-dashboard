from fastapi import FastAPI
from api.routers import auth, metrics, cloud

app = FastAPI(
    title="Cloud Infrastructure Monitoring Dashboard API",
    description="Real-Time Cloud Infrastructure Health, Uptime Monitoring, and Observability Platform",
    version="1.0.0"
)

app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(metrics.router, prefix="/api/metrics", tags=["metrics"])
app.include_router(cloud.router, prefix="/api/cloud", tags=["cloud"])

@app.get("/")
def read_root():
    return {"status": "ok", "message": "Welcome to the Cloud Monitoring Dashboard API"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}
