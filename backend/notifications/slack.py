import os
import requests
import logging

logger = logging.getLogger("cloudmon")

SLACK_WEBHOOK_URL = os.getenv("SLACK_WEBHOOK_URL")

def send_slack_alert(message: str):
    """
    Sends an alert message to a Slack channel via a Webhook URL.
    """
    if not SLACK_WEBHOOK_URL:
        logger.warning(f"Slack Webhook URL not configured. Dropped message: {message}")
        return False
        
    try:
        response = requests.post(
            SLACK_WEBHOOK_URL,
            json={"text": f"🚨 *CloudMon Alert* 🚨\n{message}"}
        )
        response.raise_for_status()
        logger.info("Successfully sent Slack alert.")
        return True
    except Exception as e:
        logger.error(f"Failed to send Slack alert: {e}")
        return False
