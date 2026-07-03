import os
from celery import Celery
from database import SessionLocal
import models
from core.logger import logger
from datetime import datetime, timedelta

REDIS_URL = os.getenv("CELERY_BROKER_URL", "redis://localhost:6379/0")
celery_ai_app = Celery("monitoring_ai_worker", broker=REDIS_URL, backend=REDIS_URL)

@celery_ai_app.task
def forecast_capacity(server_id: int):
    """
    Mock AI Capacity Forecasting.
    In production, this would fetch the last 30 days of metrics for `server_id`
    from the database, pass it through a scikit-learn linear regression model
    or AWS SageMaker endpoint, and predict the exact date when Disk or CPU 
    usage will hit 100%.
    """
    db = SessionLocal()
    try:
        server = db.query(models.Server).filter(models.Server.id == server_id).first()
        if not server:
            return "Server not found"
            
        logger.info(f"Running capacity forecasting for server {server.hostname}...")
        
        # Simulate ML prediction: Server will hit 100% disk in 45 days.
        exhaustion_date = datetime.utcnow() + timedelta(days=45)
        
        prediction = {
            "server": server.hostname,
            "metric": "disk_usage",
            "predicted_exhaustion_date": exhaustion_date.strftime("%Y-%m-%d"),
            "confidence": "87%"
        }
        
        logger.info(f"Forecast Result: {prediction}")
        # Here we would save this to a Forecast table or send an alert.
        
        return prediction
    finally:
        db.close()
