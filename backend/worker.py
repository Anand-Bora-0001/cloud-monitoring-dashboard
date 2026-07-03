import os
from celery import Celery
from database import SessionLocal
import models
from notifications.slack import send_slack_alert
from core.logger import logger

REDIS_URL = os.getenv("CELERY_BROKER_URL", "redis://localhost:6379/0")

celery_app = Celery("monitoring_worker", broker=REDIS_URL, backend=REDIS_URL)

@celery_app.task
def process_metric(metric_id: int):
    db = SessionLocal()
    try:
        metric = db.query(models.Metric).filter(models.Metric.id == metric_id).first()
        if not metric:
            return "Metric not found"
            
        logger.info(f"Processing metric ID: {metric.id} for Server ID: {metric.server_id}")
        
        # Fetch active alert rules
        rules = db.query(models.AlertRule).filter(models.AlertRule.is_active == True).all()
        
        for rule in rules:
            metric_val = getattr(metric, rule.metric_name, None)
            if metric_val is not None and metric_val > rule.threshold:
                message = f"[{rule.name}] {rule.metric_name} is at {metric_val}%, exceeding threshold {rule.threshold}% on Server {metric.server_id}"
                
                # Check if an unresolved alert already exists
                existing = db.query(models.Alert).filter(models.Alert.server_id == metric.server_id, models.Alert.rule_id == rule.id, models.Alert.is_resolved == False).first()
                if not existing:
                    logger.warning(message)
                    alert = models.Alert(server_id=metric.server_id, rule_id=rule.id, message=message)
                    db.add(alert)
                    db.commit()
                    send_slack_alert(message)
                    
        return "Processed successfully"
    finally:
        db.close()
