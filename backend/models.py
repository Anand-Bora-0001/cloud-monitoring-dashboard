from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime
from sqlalchemy.sql import func
from database import Base

class Role(Base):
    __tablename__ = "roles"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True, nullable=False)
    description = Column(String)

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String)
    is_active = Column(Boolean, default=True)
    is_superuser = Column(Boolean, default=False)
    role_id = Column(Integer, ForeignKey("roles.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class Server(Base):
    __tablename__ = "servers"
    id = Column(Integer, primary_key=True, index=True)
    hostname = Column(String, unique=True, index=True, nullable=False)
    ip_address = Column(String)
    os_type = Column(String)
    status = Column(String, default="active")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
class Metric(Base):
    __tablename__ = "metrics"
    id = Column(Integer, primary_key=True, index=True)
    server_id = Column(Integer, ForeignKey("servers.id"), index=True)
    timestamp = Column(DateTime(timezone=True), server_default=func.now(), index=True)
    cpu_usage_percent = Column(Integer)
    memory_usage_percent = Column(Integer)
    disk_usage_percent = Column(Integer)

class AlertRule(Base):
    __tablename__ = "alert_rules"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True, nullable=False)
    metric_name = Column(String, nullable=False) # e.g. 'cpu_usage_percent'
    threshold = Column(Integer, nullable=False)
    is_active = Column(Boolean, default=True)

class Alert(Base):
    __tablename__ = "alerts"
    id = Column(Integer, primary_key=True, index=True)
    server_id = Column(Integer, ForeignKey("servers.id"), index=True)
    rule_id = Column(Integer, ForeignKey("alert_rules.id"))
    message = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    is_resolved = Column(Boolean, default=False)

class CloudResource(Base):
    __tablename__ = "cloud_resources"
    id = Column(Integer, primary_key=True, index=True)
    provider = Column(String, nullable=False) # e.g. AWS, Azure, GCP
    resource_type = Column(String, nullable=False) # e.g. EC2, ECS, EKS, Lambda, Docker, Kubernetes
    resource_id = Column(String, unique=True, index=True, nullable=False) # e.g. i-1234567890abcdef0
    name = Column(String)
    status = Column(String)
    parent_id = Column(Integer, ForeignKey("cloud_resources.id"), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class ServiceDependency(Base):
    __tablename__ = "service_dependencies"
    id = Column(Integer, primary_key=True, index=True)
    parent_service_id = Column(Integer, ForeignKey("cloud_resources.id"), nullable=False)
    child_service_id = Column(Integer, ForeignKey("cloud_resources.id"), nullable=False)
    impact_level = Column(String, default="high") # e.g. high, medium, low

class SyntheticTest(Base):
    __tablename__ = "synthetic_tests"
    id = Column(Integer, primary_key=True, index=True)
    endpoint = Column(String, nullable=False)
    test_type = Column(String, nullable=False) # e.g. api, login, checkout
    is_up = Column(Boolean, default=True)
    latency_ms = Column(Integer)
    last_checked = Column(DateTime(timezone=True), server_default=func.now())

class SSLCheck(Base):
    __tablename__ = "ssl_checks"
    id = Column(Integer, primary_key=True, index=True)
    domain = Column(String, nullable=False)
    days_to_expiry = Column(Integer, nullable=False)
    is_valid = Column(Boolean, default=True)
    last_checked = Column(DateTime(timezone=True), server_default=func.now())
