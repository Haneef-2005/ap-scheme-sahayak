import os
from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
from fastapi import FastAPI, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials



from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import (
    client,
    schemes_collection,
    users_collection,
    saved_schemes_collection,
)
from models import (
    Scheme,
    UserEligibility,
    UserRegister,
    UserLogin,
)

from passlib.context import CryptContext

from bson import ObjectId
from fastapi import HTTPException
from jose import JWTError, jwt
from datetime import datetime, timedelta, timezone


app = FastAPI(
    title="AP Scheme Sahayak API"
)

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60
security = HTTPBearer()


def create_access_token(data: dict):
    to_encode = data.copy()

    expire = datetime.now(timezone.utc) + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    to_encode.update({"exp": expire})

    return jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )
    
def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    token = credentials.credentials

    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        user_id = payload.get("sub")

        if user_id is None:
            raise HTTPException(
                status_code=401,
                detail="Invalid authentication token"
            )

        user = users_collection.find_one(
            {"_id": ObjectId(user_id)}
        )

        if not user:
            raise HTTPException(
                status_code=401,
                detail="User not found"
            )

        return user

    except JWTError:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token"
        )
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "AP Scheme Sahayak API is running"
    }


@app.get("/database-test")
def database_test():
    try:
        client.admin.command("ping")

        return {
            "message": "MongoDB connected successfully"
        }

    except Exception as e:
        return {
            "error": str(e)
        }


@app.post("/schemes")
def create_scheme(scheme: Scheme):

    scheme_data = scheme.model_dump()

    result = schemes_collection.insert_one(scheme_data)

    return {
        "message": "Scheme added successfully",
        "scheme_id": str(result.inserted_id)
    }


@app.get("/schemes")
def get_schemes():

    schemes = []

    for scheme in schemes_collection.find():

        scheme["_id"] = str(scheme["_id"])

        schemes.append(scheme)

    return schemes

@app.get("/schemes/{scheme_id}")
def get_scheme(scheme_id: str):
    try:
        scheme = schemes_collection.find_one(
            {"_id": ObjectId(scheme_id)}
        )

        if not scheme:
            raise HTTPException(
                status_code=404,
                detail="Scheme not found"
            )

        scheme["_id"] = str(scheme["_id"])

        return scheme

    except HTTPException:
        raise

    except Exception:
        raise HTTPException(
            status_code=400,
            detail="Invalid scheme ID"
        )

@app.post("/eligibility/check")
def check_eligibility(user: UserEligibility):

    matched_schemes = []

    schemes = schemes_collection.find()

    for scheme in schemes:

        rules = scheme.get("eligibility_rules", {})

        eligible = True
        match_score = 100

        # Age check

        min_age = rules.get("min_age")

        if min_age is not None and user.age < min_age:
            eligible = False


        max_age = rules.get("max_age")

        if max_age is not None and user.age > max_age:
            eligible = False
            
            
        # Gender check

        genders = rules.get("genders", [])

        if genders and user.gender not in genders:
            eligible = False
            
            


        # Occupation check

        occupations = rules.get("occupations", [])

        if occupations and user.occupation not in occupations:
            eligible = False


       

        
            
            
        # Annual income check

        min_annual_income = rules.get("min_annual_income")

        if (
            min_annual_income is not None
            and user.annual_income < min_annual_income
        ):
            eligible = False


        max_annual_income = rules.get("max_annual_income")

        if (
            max_annual_income is not None
            and user.annual_income > max_annual_income
        ):
            eligible = False



        # Social category check

        social_categories = rules.get(
            "social_categories",
            []
        )

        if (
            social_categories
            and user.social_category not in social_categories
        ):
            eligible = False


        # BPL check

        bpl_required = rules.get("bpl_required")

        if (
            bpl_required is True
            and user.bpl_card is False
        ):
            eligible = False


        # District check

        districts = rules.get("districts", [])

        if districts and user.district not in districts:
            eligible = False


        # Add eligible scheme

        if eligible:

            scheme["_id"] = str(scheme["_id"])

            scheme["match"] = match_score

            matched_schemes.append(scheme)


    return {
        "total_matches": len(matched_schemes),
        "matched_schemes": matched_schemes
    }
    
@app.get("/debug-database")
def debug_database():
    return {
        "database_name": schemes_collection.database.name,
        "collection_name": schemes_collection.name,
        "database_list": client.list_database_names()
    }
    
    
@app.put("/schemes/{scheme_id}")
def update_scheme(scheme_id: str, scheme: Scheme):
    try:
        scheme_data = scheme.model_dump()

        result = schemes_collection.update_one(
            {"_id": ObjectId(scheme_id)},
            {"$set": scheme_data}
        )

        if result.matched_count == 0:
            raise HTTPException(
                status_code=404,
                detail="Scheme not found"
            )

        return {
            "message": "Scheme updated successfully"
        }

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )


# Your existing DELETE endpoint stays below
@app.delete("/schemes/{scheme_id}")
def delete_scheme(scheme_id: str):
    try:
        result = schemes_collection.delete_one(
            {"_id": ObjectId(scheme_id)}
        )

        if result.deleted_count == 0:
            raise HTTPException(
                status_code=404,
                detail="Scheme not found"
            )

        return {
            "message": "Scheme deleted successfully"
        }

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )
        
@app.post("/register")
def register(user: UserRegister):

    existing_user = users_collection.find_one(
        {"email": user.email}
    )

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    hashed_password = pwd_context.hash(user.password)

    new_user = {
        "name": user.name,
        "email": user.email,
        "password": hashed_password
    }

    result = users_collection.insert_one(new_user)

    return {
        "message": "User registered successfully",
        "user_id": str(result.inserted_id)
    }
    
@app.post("/login")
def login(user: UserLogin):
    existing_user = users_collection.find_one(
        {"email": user.email}
    )

    if not existing_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    password_valid = pwd_context.verify(
        user.password,
        existing_user["password"]
    )

    if not password_valid:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )
        
    access_token = create_access_token(
    {
        "sub": str(existing_user["_id"]),
        "email": existing_user["email"]
    }
)
    return {
            "message": "Login successful",
            "access_token": access_token,
            "token_type": "bearer",
            "user": {
                "id": str(existing_user["_id"]),
                "name": existing_user["name"],
                "email": existing_user["email"]
            }
    }
@app.get("/me")
def get_me(current_user=Depends(get_current_user)):
    return {
        "id": str(current_user["_id"]),
        "name": current_user["name"],
        "email": current_user["email"]
    }
    
@app.post("/saved-schemes/{scheme_id}")
def save_scheme(
    scheme_id: str,
    current_user=Depends(get_current_user)
):
    # Check scheme exists
    scheme = schemes_collection.find_one(
        {"_id": ObjectId(scheme_id)}
    )

    if not scheme:
        raise HTTPException(
            status_code=404,
            detail="Scheme not found"
        )

    user_id = str(current_user["_id"])

    # Prevent duplicate bookmarks
    existing = saved_schemes_collection.find_one({
        "user_id": user_id,
        "scheme_id": scheme_id
    })

    if existing:
        return {
            "message": "Scheme already saved"
        }

    saved_schemes_collection.insert_one({
        "user_id": user_id,
        "scheme_id": scheme_id
    })

    return {
        "message": "Scheme saved successfully"
    }
    
@app.get("/saved-schemes")
def get_saved_schemes(
    current_user=Depends(get_current_user)
):
    user_id = str(current_user["_id"])

    saved_records = saved_schemes_collection.find({
        "user_id": user_id
    })

    result = []

    for record in saved_records:
        try:
            scheme = schemes_collection.find_one({
                "_id": ObjectId(record["scheme_id"])
            })

            if scheme:
                scheme["_id"] = str(scheme["_id"])
                result.append(scheme)

        except Exception:
            continue

    return result

@app.delete("/saved-schemes/{scheme_id}")
def unsave_scheme(
    scheme_id: str,
    current_user=Depends(get_current_user)
):
    user_id = str(current_user["_id"])

    result = saved_schemes_collection.delete_one({
        "user_id": user_id,
        "scheme_id": scheme_id
    })

    if result.deleted_count == 0:
        raise HTTPException(
            status_code=404,
            detail="Saved scheme not found"
        )

    return {
        "message": "Scheme removed from saved schemes"
    }


    
