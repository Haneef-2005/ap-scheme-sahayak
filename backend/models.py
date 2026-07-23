from pydantic import BaseModel
from typing import List, Optional


class EligibilityItem(BaseModel):
    key: str
    value: str


class EligibilityRules(BaseModel):
    min_age: Optional[int] = None
    max_age: Optional[int] = None
    genders: List[str] = []
    occupations: List[str] = []
    income_categories: List[str] = []
    social_categories: List[str] = []
    bpl_required: Optional[bool] = None
    districts: List[str] = []
    min_annual_income: Optional[int] = None
    max_annual_income: Optional[int] = None


class Scheme(BaseModel):
    name: str
    description: str
    category: str
    benefit: str

    benefits: List[str]
    eligibility: List[EligibilityItem]
    documents: List[str]

    eligibility_rules: EligibilityRules

    official_url: str
    last_verified: str

class UserEligibility(BaseModel):
    age: int
    gender: str
    occupation: str
    income_category: str | None = None
    social_category: str
    bpl_card: bool
    district: str
    annual_income: int
    
    
class UserRegister(BaseModel):
    name: str
    email: str
    password: str


class UserLogin(BaseModel):
    email: str
    password: str