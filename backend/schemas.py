from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None
    is_active: bool = True

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    role_id: Optional[int] = None
    created_at: datetime
    
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

class ServerBase(BaseModel):
    hostname: str
    ip_address: Optional[str] = None
    os_type: Optional[str] = None
    status: Optional[str] = "active"

class ServerCreate(ServerBase):
    pass

class ServerResponse(ServerBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

class MetricBase(BaseModel):
    server_id: int
    cpu_usage_percent: int
    memory_usage_percent: int
    disk_usage_percent: int

class MetricCreate(MetricBase):
    pass

class MetricResponse(MetricBase):
    id: int
    timestamp: datetime
    class Config:
        from_attributes = True

class AlertRuleBase(BaseModel):
    name: str
    metric_name: str
    threshold: int
    is_active: bool = True

class AlertRuleCreate(AlertRuleBase):
    pass

class AlertRuleResponse(AlertRuleBase):
    id: int

    class Config:
        from_attributes = True

class AlertBase(BaseModel):
    server_id: int
    rule_id: int
    message: str
    is_resolved: bool = False

class AlertCreate(AlertBase):
    pass

class AlertResponse(AlertBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
