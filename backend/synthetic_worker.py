import os
import requests
import socket
import ssl
from datetime import datetime
from celery import Celery
from database import SessionLocal
import models
from core.logger import logger

REDIS_URL = os.getenv("CELERY_BROKER_URL", "redis://localhost:6379/0")
synthetic_app = Celery("synthetic_worker", broker=REDIS_URL, backend=REDIS_URL)

@synthetic_app.task
def run_synthetic_ping(endpoint: str, test_type: str):
    """
    Simulates a synthetic transaction or ping.
    """
    logger.info(f"Running synthetic {test_type} test against {endpoint}...")
    start_time = datetime.utcnow()
    try:
        response = requests.get(endpoint, timeout=10)
        latency = int((datetime.utcnow() - start_time).total_seconds() * 1000)
        is_up = response.status_code < 400
        
        # Persist result to DB
        db = SessionLocal()
        test_result = models.SyntheticTest(
            endpoint=endpoint,
            test_type=test_type,
            is_up=is_up,
            latency_ms=latency
        )
        db.add(test_result)
        db.commit()
        db.close()
        
        logger.info(f"Synthetic test {endpoint} returned {response.status_code} in {latency}ms.")
        return {"endpoint": endpoint, "is_up": is_up, "latency_ms": latency}
    except Exception as e:
        logger.error(f"Synthetic test {endpoint} failed: {e}")
        return {"endpoint": endpoint, "is_up": False, "latency_ms": -1}

@synthetic_app.task
def check_ssl_expiry(domain: str):
    """
    Checks the SSL certificate expiry for a given domain.
    """
    logger.info(f"Checking SSL certificate for {domain}...")
    try:
        context = ssl.create_default_context()
        with socket.create_connection((domain, 443)) as sock:
            with context.wrap_socket(sock, server_hostname=domain) as ssock:
                cert = ssock.getpeercert()
                expiry_date = datetime.strptime(cert['notAfter'], r'%b %d %H:%M:%S %Y %Z')
                days_left = (expiry_date - datetime.utcnow()).days
                
                db = SessionLocal()
                ssl_check = models.SSLCheck(
                    domain=domain,
                    days_to_expiry=days_left,
                    is_valid=days_left > 0
                )
                db.add(ssl_check)
                db.commit()
                db.close()
                
                logger.info(f"SSL for {domain} expires in {days_left} days.")
                return {"domain": domain, "days_to_expiry": days_left}
    except Exception as e:
        logger.error(f"SSL check for {domain} failed: {e}")
        return {"domain": domain, "error": str(e)}
