def discover_gcp_instances():
    """
    Mock GCP Compute Engine Discovery.
    In production, this would use google-cloud-compute and Application Default Credentials.
    """
    return [
        {"hostname": "gcp-worker-1", "ip_address": "34.12.45.67", "os_type": "Linux", "status": "RUNNING"},
        {"hostname": "gcp-worker-2", "ip_address": "34.12.45.68", "os_type": "Linux", "status": "RUNNING"}
    ]
