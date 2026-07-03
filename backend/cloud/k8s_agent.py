# Kubernetes Integration Stub
# In production, this would use the 'kubernetes' python package to communicate with the K8s API server
# to extract pod health, node status, and cluster metrics.

def discover_kubernetes_pods(namespace="default"):
    """
    Returns a mocked list of Kubernetes pods.
    """
    return [
        {"pod_name": "backend-api-7b94d9b7f5-xt8k2", "namespace": namespace, "status": "Running", "restarts": 0},
        {"pod_name": "frontend-web-54b8d7c6d4-y9k4m", "namespace": namespace, "status": "Running", "restarts": 1},
    ]
