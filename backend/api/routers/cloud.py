from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import models
import schemas
from api import deps
from cloud.aws import discover_ec2_instances

router = APIRouter()

@router.post("/discover/aws", response_model=dict)
def trigger_aws_discovery(region: str = "us-east-1", db: Session = Depends(deps.get_db), current_user: models.User = Depends(deps.get_current_active_user)):
    """
    Discovers EC2 instances in the specified region and synchronizes them
    into the local database.
    """
    instances = discover_ec2_instances(region)
    
    if isinstance(instances, dict) and "error" in instances:
        raise HTTPException(status_code=400, detail=instances["error"])
        
    added_count = 0
    for inst in instances:
        # Check if server already exists by hostname (or instance_id in reality)
        existing = db.query(models.Server).filter(models.Server.hostname == inst["hostname"]).first()
        if not existing:
            new_server = models.Server(
                hostname=inst["hostname"],
                ip_address=inst["ip_address"],
                os_type=inst["os_type"],
                status=inst["status"]
            )
            db.add(new_server)
            added_count += 1
            
    if added_count > 0:
        db.commit()
        
    return {
        "message": f"Successfully discovered and synchronized {len(instances)} instances.",
        "added_to_database": added_count,
        "instances": instances
    }

@router.get("/cost/aws")
def get_aws_costs(current_user: models.User = Depends(deps.get_current_active_user)):
    from cloud.aws import get_cost_summary
    return get_cost_summary()

@router.post("/discover/azure")
def trigger_azure_discovery(db: Session = Depends(deps.get_db), current_user: models.User = Depends(deps.get_current_active_user)):
    from cloud.azure_agent import discover_azure_vms
    return discover_azure_vms()

@router.post("/discover/gcp")
def trigger_gcp_discovery(db: Session = Depends(deps.get_db), current_user: models.User = Depends(deps.get_current_active_user)):
    from cloud.gcp_agent import discover_gcp_instances
    return discover_gcp_instances()
