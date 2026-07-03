import boto3
from botocore.exceptions import NoCredentialsError, ClientError

def discover_ec2_instances(region: str = "us-east-1"):
    """
    Connects to AWS using boto3 and retrieves a list of EC2 instances.
    Requires AWS credentials to be configured in the environment 
    (AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY).
    """
    try:
        ec2 = boto3.client('ec2', region_name=region)
        response = ec2.describe_instances()
        
        instances = []
        for reservation in response.get('Reservations', []):
            for instance in reservation.get('Instances', []):
                # Extract the 'Name' tag if it exists
                name = "Unknown"
                for tag in instance.get('Tags', []):
                    if tag['Key'] == 'Name':
                        name = tag['Value']
                        break
                        
                instances.append({
                    "hostname": name,
                    "instance_id": instance.get('InstanceId'),
                    "ip_address": instance.get('PublicIpAddress') or instance.get('PrivateIpAddress'),
                    "os_type": instance.get('PlatformDetails', 'Linux/UNIX'),
                    "status": instance.get('State', {}).get('Name', 'unknown')
                })
        return instances
    except NoCredentialsError:
        return {"error": "AWS credentials not found. Please configure them in your environment."}
    except ClientError as e:
        return {"error": str(e)}

def get_cost_summary():
    """
    Fetches the daily unblended cost for the AWS account using Cost Explorer.
    """
    try:
        ce = boto3.client('ce', region_name='us-east-1')
        from datetime import datetime, timedelta
        
        end = datetime.utcnow().date()
        start = end - timedelta(days=7)
        
        response = ce.get_cost_and_usage(
            TimePeriod={'Start': start.strftime('%Y-%m-%d'), 'End': end.strftime('%Y-%m-%d')},
            Granularity='DAILY',
            Metrics=['UnblendedCost']
        )
        
        costs = []
        for result in response.get('ResultsByTime', []):
            costs.append({
                "date": result['TimePeriod']['Start'],
                "amount": float(result['Total']['UnblendedCost']['Amount']),
                "unit": result['Total']['UnblendedCost']['Unit']
            })
        return costs
    except NoCredentialsError:
        return {"error": "AWS credentials not found."}
    except ClientError as e:
        return {"error": str(e)}
