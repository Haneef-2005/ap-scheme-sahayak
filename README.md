# AP Scheme Sahayak — ఆంధ్రప్రదేశ్ పథకాలు

> A full-stack web application that helps Andhra Pradesh citizens discover government schemes they are eligible for — in Telugu and English.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://ap-scheme-sahayak-react-27odhvrwe-haneef-2005s-projects.vercel.app)
[![Backend](https://img.shields.io/badge/Backend-Render-46E3B7?style=for-the-badge&logo=render)](https://ap-scheme-sahayak.onrender.com)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB%20Atlas-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/atlas)

---

## 🌟 What is AP Scheme Sahayak?

Millions of eligible AP citizens miss out on government schemes simply because they don't know they qualify. AP Scheme Sahayak solves this — users fill in their profile once and instantly see every AP government scheme they are entitled to.

---

## 🚀 Live Demo

- **Frontend:** https://ap-scheme-sahayak-react-27odhvrwe-haneef-2005s-projects.vercel.app
- **Backend API:** https://ap-scheme-sahayak.onrender.com
- **API Docs:** https://ap-scheme-sahayak.onrender.com/docs

---

## ✨ Features

- 🔍 **Eligibility Engine** — matches user profile against real AP government scheme rules
- 👤 **User Auth** — register and login with JWT authentication
- 📋 **8 Real Schemes** — PM-KISAN, Annadata Sukhibhava, Talliki Vandanam, YSR Cheyutha, Jagananna Vidya Deevena, Jagananna Thodu, PM Ujjwala Yojana, PM Jeevan Jyoti Bima
- 🔖 **Save Schemes** — bookmark schemes for later reference
- 📱 **Mobile First** — responsive design for low-end devices
- 🌐 **Bilingual** — Telugu and English support
- 🛡️ **Admin Panel** — add, edit, delete schemes and manage eligibility rules

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js + Vite + Tailwind CSS |
| Backend | FastAPI (Python) |
| Database | MongoDB Atlas |
| Authentication | JWT (JSON Web Tokens) |
| Deployment | Vercel (Frontend) + Render (Backend) |

---

## 🏗️ Architecture

```
React Frontend (Vercel)
        ↓
FastAPI Backend (Render)
https://ap-scheme-sahayak.onrender.com
        ↓
MongoDB Atlas (Cloud Database)
Database: ap_scheme_sahayak
Collections: schemes, users, saved_schemes
```

---

## ⚙️ How the Eligibility Engine Works

The user fills a 7-step questionnaire:
1. Age
2. Annual household income
3. Gender
4. Occupation
5. Social category (SC / ST / BC / General)
6. BPL card status
7. District

The backend compares these answers against each scheme's `eligibility_rules` object in MongoDB:

```python
if user.age >= scheme.min_age
and user.age <= scheme.max_age
and user.occupation in scheme.occupations  # if list is not empty
and user.annual_income <= scheme.max_annual_income  # if > 0
and user.social_category in scheme.social_categories  # if list is not empty
and user.bpl_card == True  # if bpl_required is True
→ Eligible ✅
```

---

## 📦 Schemes Covered

| Scheme | Category | Benefit |
|---|---|---|
| PM-KISAN | Agriculture | ₹6,000/year |
| Annadata Sukhibhava | Agriculture | ₹20,000/year |
| Jagananna Vidya Deevena | Education | 100% fee reimbursement |
| Talliki Vandanam | Education/Women | ₹15,000/year |
| YSR Cheyutha | Women | ₹75,000 over 4 years |
| PM Ujjwala Yojana | Women | Free LPG connection |
| Jagananna Thodu | Employment | ₹10,000 interest-free loan |
| PM Jeevan Jyoti Bima | Insurance | ₹2 lakh life cover |

---

## 🖥️ Local Setup

### Prerequisites
- Node.js 18+
- Python 3.10+
- MongoDB Atlas account
- Git

### 1. Clone the repository

```bash
git clone https://github.com/Haneef-2005/ap-scheme-sahayak.git
cd ap-scheme-sahayak
```

### 2. Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
pip install -r requirements.txt
```

Create a `.env` file in the `backend/` folder:

```env
MONGO_URI=your_mongodb_atlas_connection_string
SECRET_KEY=your_secret_key_here
```

Run the backend:

```bash
uvicorn main:app --reload
```

Seed the database with schemes:

```bash
python seed_schemes.py
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The app will be running at `http://localhost:5173`

---

## 📁 Folder Structure

```
ap-scheme-sahayak-react/
│
├── frontend/                  # React + Vite frontend
│   ├── src/
│   │   ├── App.jsx            # Main app with all pages and routing
│   │   ├── index.css          # Global styles with Tailwind
│   │   └── main.jsx           # React entry point
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── backend/                   # FastAPI backend
│   ├── main.py                # All API endpoints
│   ├── models.py              # Pydantic models
│   ├── database.py            # MongoDB connection
│   ├── seed_schemes.py        # Script to seed schemes into DB
│   ├── requirements.txt       # Python dependencies
│   └── .env                   # Environment variables (not committed)
│
└── README.md
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/schemes` | Get all schemes |
| GET | `/schemes/{id}` | Get scheme by ID |
| POST | `/schemes` | Add new scheme (admin) |
| PUT | `/schemes/{id}` | Update scheme (admin) |
| DELETE | `/schemes/{id}` | Delete scheme (admin) |
| POST | `/eligibility/check` | Check user eligibility |
| POST | `/register` | Register new user |
| POST | `/login` | Login and get JWT token |
| GET | `/me` | Get current user profile |
| POST | `/saved-schemes/{id}` | Save a scheme |
| GET | `/saved-schemes` | Get user's saved schemes |
| DELETE | `/saved-schemes/{id}` | Remove saved scheme |

---

## 🔮 Future Enhancements

- [ ] Natural language input — "I'm a farmer from Krishna district"
- [ ] Voice input in Telugu
- [ ] Push notifications for new schemes
- [ ] Offline support (PWA)
- [ ] District-wise scheme filtering
- [ ] Application status tracking

---

## 👨‍💻 Developer

**Haneef**
- 3rd Year B.Tech — AI & ML
- GitHub: [github.com/Haneef-2005](https://github.com/Haneef-2005)
- Email: skhaneef0718@gmail.com

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
