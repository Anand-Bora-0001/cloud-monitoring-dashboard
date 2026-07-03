from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

import models
import schemas
from api import deps
from worker import process_metric

router = APIRouter()

@router.post("/", response_model=schemas.MetricResponse, status_code=status.HTTP_201_CREATED)
def ingest_metric(metric_in: schemas.MetricCreate, db: Session = Depends(deps.get_db), current_user: models.User = Depends(deps.get_current_active_user)):
    # Verify server exists
    server = db.query(models.Server).filter(models.Server.id == metric_in.server_id).first()
    if not server:
        raise HTTPException(status_code=404, detail="Server not found")
        
    db_metric = models.Metric(**metric_in.model_dump())
    db.add(db_metric)
    db.commit()
    db.refresh(db_metric)
    
    # Send metric ID to celery worker for async processing (e.g. alert checks)
    process_metric.delay(db_metric.id)
    
    return db_metric

@router.get("/server/{server_id}", response_model=List[schemas.MetricResponse])
def get_server_metrics(server_id: int, limit: int = 100, db: Session = Depends(deps.get_db), current_user: models.User = Depends(deps.get_current_active_user)):
    metrics = db.query(models.Metric).filter(models.Metric.server_id == server_id).order_by(models.Metric.timestamp.desc()).limit(limit).all()
    return metrics
