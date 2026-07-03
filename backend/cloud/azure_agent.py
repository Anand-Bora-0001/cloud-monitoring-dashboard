def discover_azure_vms():
    """
    Mock Azure VM Discovery.
    In production, this would use azure-mgmt-compute and DefaultAzureCredential.
    """
    return [
        {"hostname": "az-web-prod-1", "ip_address": "13.88.22.11", "os_type": "Linux", "status": "VM running"},
        {"hostname": "az-db-prod-1", "ip_address": "13.88.22.12", "os_type": "Windows", "status": "VM running"}
    ]
