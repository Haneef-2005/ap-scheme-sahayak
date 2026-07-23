import { useEffect, useMemo, useState } from "react";
import {
  Search, ChevronRight, ArrowLeft, Bookmark, ExternalLink, Home,
  ClipboardList, User, Info, Landmark, Check, Plus,
} from "lucide-react";

const categories = [
  ["🌾", "Agriculture"], ["🎓", "Education"], ["🏥", "Health"],
  ["🏠", "Housing"], ["👩", "Women"], ["💼", "Employment"],
];

const schemes = [

];

const popular = [
 
];

const questions = [
  { title: "What is your age?", type: "input" },
  {
  title: "What is your annual family income?",
  type: "income",
},
  {
  title: "What is your gender?",
  type: "options",
  options: [
    ["👨", "Male"],
    ["👩", "Female"],
    ["👤", "Other"],
  ],
},
  { title: "What is your occupation?", options: [["🌾", "Farmer"], ["🎓", "Student"], ["💼", "Self-employed / Business"], ["🧑‍🏭", "Daily wage worker"], ["🏛️", "Government employee"], ["🏠", "Homemaker"]] },
  
  { title: "Which social category do you belong to?", options: [["🏷️", "SC (Scheduled Caste)"], ["🏷️", "ST (Scheduled Tribe)"], ["🏷️", "OBC (Other Backward Class)"], ["🏷️", "General / Unreserved"]] },
  { title: "Do you have a BPL (Below Poverty Line) ration card?", options: [["✅", "Yes, I have a BPL card"], ["❌", "No, I don't have one"], ["❓", "I'm not sure"]] },

 {
  title: "Which district do you live in?",
  type: "options",
  options: [
    ["📍", "Alluri Sitharama Raju"],
    ["📍", "Anakapalli"],
    ["📍", "Anantapur"],
    ["📍", "Annamayya"],
    ["📍", "Bapatla"],
    ["📍", "Chittoor"],
    ["📍", "Dr. B.R. Ambedkar Konaseema"],
    ["📍", "East Godavari"],
    ["📍", "Eluru"],
    ["📍", "Guntur"],
    ["📍", "Kakinada"],
    ["📍", "Krishna"],
    ["📍", "Kurnool"],
    ["📍", "Nandyal"],
    ["📍", "NTR"],
    ["📍", "Palnadu"],
    ["📍", "Parvathipuram Manyam"],
    ["📍", "Prakasam"],
    ["📍", "Sri Potti Sriramulu Nellore"],
    ["📍", "Sri Sathya Sai"],
    ["📍", "Srikakulam"],
    ["📍", "Tirupati"],
    ["📍", "Visakhapatnam"],
    ["📍", "Vizianagaram"],
    ["📍", "West Godavari"],
    ["📍", "YSR Kadapa"],
  ],
},
];

const tagStyles = {
  Agriculture: "bg-green-100 text-green-700", Education: "bg-blue-100 text-blue-700",
  Health: "bg-pink-100 text-pink-800", Housing: "bg-amber-100 text-amber-800",
  Women: "bg-purple-100 text-purple-800", Employment: "bg-slate-100 text-slate-700",
};

function Tag({ children }) {
  return <span className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-semibold ${tagStyles[children] || "bg-slate-100 text-slate-700"}`}>{children}</span>;
}

function SchemeCard({ scheme, onOpen, showMatch = false }) {

  const categoryIcons = {
    Education: "🎓",
    Agriculture: "🌾",
    Women: "👩",
    "Education & Labour Welfare": "👷",
    "Skill Development & Self Employment": "💼",
    "Energy & Household": "🏠",
  };

  const icon = categoryIcons[scheme.category] || "📋";

  return (
    <button
      onClick={onOpen}
      className="group mb-4 w-full overflow-hidden rounded-2xl border border-ap-border bg-white p-5 text-left shadow-sm transition duration-200 hover:-translate-y-1 hover:border-ap-blue/30 hover:shadow-lg"
    >

      {/* Top */}
      <div className="flex items-start justify-between gap-4">

        <div className="flex items-start gap-3">

          {/* Category Icon */}
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-ap-slate text-2xl transition group-hover:bg-ap-blue/10">
            {icon}
          </div>

          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2">

              <span className="rounded-full bg-ap-blue/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-ap-blue">
                {scheme.category}
              </span>

              {showMatch && (
                <span className="flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-[10px] font-semibold text-green-700">
                  <Check size={11} />
                  Likely Eligible
                </span>
              )}

            </div>

            {/* Scheme name */}
            <h3 className="text-[15px] font-bold leading-5 text-slate-900">
              {scheme.name}
            </h3>

          </div>
        </div>

      </div>


      {/* Description */}
      <p className="mt-4 line-clamp-2 text-xs leading-5 text-ap-muted">
        {scheme.description}
      </p>


      {/* Benefit */}
      <div className="mt-4 rounded-xl border border-green-100 bg-green-50/60 px-3.5 py-3">

        <div className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-green-700">
          Benefit
        </div>

        <div className="text-sm font-bold text-green-700">
          {scheme.benefit}
        </div>

      </div>


      {/* Match percentage */}
      {showMatch && scheme.match && (
        <div className="mt-4">

          <div className="mb-1.5 flex items-center justify-between text-[10px]">
            <span className="font-medium text-ap-muted">
              Profile Match
            </span>

            <span className="font-bold text-ap-blue">
              {scheme.match}%
            </span>
          </div>

          <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">

            <div
              className="h-full rounded-full bg-ap-blue transition-all"
              style={{
                width: `${scheme.match}%`,
              }}
            />

          </div>

        </div>
      )}


      {/* Bottom */}
      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">

        <div className="flex items-center gap-1.5 text-[11px] text-ap-muted">
          <span>✓</span>
          <span>Official scheme information</span>
        </div>

        <div className="flex items-center gap-1 text-xs font-semibold text-ap-blue">
          View Details

          <ChevronRight
            size={16}
            className="transition-transform group-hover:translate-x-1"
          />
        </div>

      </div>

    </button>
  );
}

function App() {
  const [page, setPage] = useState("home");
  const [loggedIn, setLoggedIn] = useState(() => {
  return !!localStorage.getItem("access_token");
});
  const [question, setQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [toast, setToast] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [schemes, setSchemes] = useState([]);
const [loadingSchemes, setLoadingSchemes] = useState(true);
const [schemeError, setSchemeError] = useState("");
const [savedSchemes, setSavedSchemes] = useState([]);
const [selectedScheme, setSelectedScheme] = useState(null);
const [savedIds, setSavedIds] = useState([]);
const [user, setUser] = useState(() => {
  const savedUser = localStorage.getItem("user");
  return savedUser ? JSON.parse(savedUser) : null;
});
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);


useEffect(() => {
  const verifyUser = async () => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      setLoggedIn(false);
      setUser(null);
      return;
    }

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Invalid or expired token");
      }

      const data = await response.json();

      setUser(data);
      setLoggedIn(true);

      localStorage.setItem(
        "user",
        JSON.stringify(data)
      );

    } catch (error) {
      console.error("Authentication failed:", error);

      localStorage.removeItem("access_token");
      localStorage.removeItem("user");

      setUser(null);
      setLoggedIn(false);
    }
  };

  verifyUser();
}, []);

useEffect(() => {
  const verifyUser = async () => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      setLoggedIn(false);
      setUser(null);
      return;
    }

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Invalid token");
      }

      const data = await response.json();

      setUser(data);
      setLoggedIn(true);

      localStorage.setItem(
        "user",
        JSON.stringify(data)
      );
    } catch (error) {
      console.error("Authentication failed:", error);

      localStorage.removeItem("access_token");
      localStorage.removeItem("user");

      setUser(null);
      setLoggedIn(false);
    }
  };

  verifyUser();
}, []);

useEffect(() => {
  const fetchSchemes = async () => {
    try {
      setLoadingSchemes(true);
      setSchemeError("");

      const response = await fetch(
        "http://127.0.0.1:8000/schemes"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch schemes");
      }

      const data = await response.json();

      setSchemes(data);
    } catch (error) {
      console.error(error);

      setSchemeError(
        "Unable to load schemes from the server."
      );
    } finally {
      setLoadingSchemes(false);
    }
  };

  fetchSchemes();
}, []);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(""), 2000);
    return () => clearTimeout(id);
  }, [toast]);

 const goTo = (next) => setPage(next);

const openScheme = async (scheme) => {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/schemes/${scheme._id}`
    );

    if (!response.ok) {
      throw new Error("Failed to load scheme details");
    }

    const data = await response.json();

    setSelectedScheme(data);
    setPage("detail");
  } catch (error) {
    console.error("Error loading scheme:", error);
    setToast("Unable to load scheme details");
  }
};

const saveScheme = async (schemeId) => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    setToast("Please log in to save schemes");
    setPage("login");
    return;
  }

  try {
    const response = await fetch(
      `http://127.0.0.1:8000/saved-schemes/${schemeId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || "Unable to save scheme");
    }

    setToast(data.message);

    setToast(data.message);

setSavedIds((current) => [
  ...new Set([...current, schemeId])
]);
  } catch (error) {
    console.error("Save scheme error:", error);
    setToast(error.message);
  }
};

const loadSavedSchemes = async () => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    setPage("login");
    return;
  }

  try {
    const response = await fetch(
      "http://127.0.0.1:8000/saved-schemes",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.detail || "Unable to load saved schemes"
      );
    }

   setSavedSchemes(data);
setSavedIds(data.map((scheme) => scheme._id));
setPage("saved");
  } catch (error) {
    console.error(error);
    setToast(error.message);
  }
};

const removeSavedScheme = async (schemeId) => {
  const token = localStorage.getItem("access_token");

  try {
    const response = await fetch(
      `http://127.0.0.1:8000/saved-schemes/${schemeId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.detail || "Unable to remove scheme"
      );
    }

    setSavedSchemes((current) =>
      current.filter((scheme) => scheme._id !== schemeId)
    );

    setToast("Scheme removed");
  } catch (error) {
    console.error(error);
    setToast(error.message);
  }
};

const checkEligibility = async () => {
  try {
    setLoadingSchemes(true);
    setSchemeError("");

   const userData = {
  age: Number(answers[0]),
  annual_income: Number(answers[1]),
  gender: answers[2],
  occupation: answers[3],

  social_category:
    answers[4] === "SC (Scheduled Caste)" ? "SC" :
    answers[4] === "ST (Scheduled Tribe)" ? "ST" :
    answers[4] === "OBC (Other Backward Class)" ? "BC" :
    answers[4] === "General / Unreserved" ? "General" :
    answers[4],

  bpl_card:
    answers[5] === "Yes, I have a BPL card",

  district: answers[6],
};

    const response = await fetch(
      "http://127.0.0.1:8000/eligibility/check",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );

    if (!response.ok) {
      throw new Error("Eligibility check failed");
    }

    const data = await response.json();

    setSchemes(data.matched_schemes);

    setLoggedIn(true);
    setPage("schemes");
  } catch (error) {
    console.error(error);

    setSchemeError(
      "Unable to check eligibility. Please try again."
    );
  } finally {
    setLoadingSchemes(false);
  }
};

const login = async (email, password) => {
  try {
    const response = await fetch(
      "http://127.0.0.1:8000/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.detail || "Login failed"
      );
    }
    localStorage.setItem("access_token", data.access_token);
localStorage.setItem("user", JSON.stringify(data.user));

    setLoggedIn(true);

    setToast("Login successful");

    setPage("schemes");
    setUser(data.user);

  } catch (error) {
    console.error(error);

    setToast(error.message);
  }
};

const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("user");

  setLoggedIn(false);
  setToast("Logged out successfully");
  setPage("home");
};

const registerUser = async (name, email, password) => {
  try {
    const response = await fetch(
      "http://127.0.0.1:8000/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || "Registration failed");
    }

    setToast("Account created successfully. Please log in.");
    setPage("login");
  } catch (error) {
    console.error(error);
    setToast(error.message);
  }
};
  

  const visibleSchemes = useMemo(() => {
  return schemes.filter((scheme) => {
    const matchesCategory =
      filter === "All" || scheme.category === filter;

    const searchText = search.toLowerCase();

    const matchesSearch =
      scheme.name.toLowerCase().includes(searchText) ||
      scheme.description.toLowerCase().includes(searchText);

    return matchesCategory && matchesSearch;
  });
}, [schemes, search, filter]);

const popularSchemes = schemes.slice(0, 3);

  const hiddenBottom = ["login", "register", "questions"];
  const showBottom = loggedIn && !hiddenBottom.includes(page);

  return (
    <div className="min-h-screen bg-ap-slate pb-0 text-ap-text">
      {toast && <div className="fixed left-1/2 top-[70px] z-[999] -translate-x-1/2 rounded-full bg-ap-blue px-5 py-2.5 text-[13px] font-medium text-white shadow-xl">{toast}</div>}

      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#123f63]/95 px-4 backdrop-blur-md sm:px-6">
  <div className="mx-auto flex h-[68px] max-w-[1200px] items-center justify-between">

    {/* Logo */}
    <button
      onClick={() => goTo("home")}
      className="group flex items-center gap-3 text-left"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-ap-saffron text-xl shadow-sm transition group-hover:scale-105">
        🏛️
      </span>

      <span>
        <span className="block text-[15px] font-bold tracking-tight text-white sm:text-base">
          AP Scheme Sahayak
        </span>

        <span className="telugu block text-[10px] text-white/55 sm:text-[11px]">
          ఆంధ్రప్రదేశ్ పథకాలు
        </span>
      </span>
    </button>


    {/* Right side */}
    <div className="flex items-center gap-2 sm:gap-3">

    


      {/* Logged in */}
      {loggedIn ? (
        <button
          onClick={() => goTo("profile")}
          className="flex h-10 items-center gap-2 rounded-xl px-1.5 transition hover:bg-white/10 sm:px-2"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ap-saffron text-xs font-bold text-ap-blue shadow-sm">
            H
          </span>

          <div className="hidden text-left sm:block">
            <span className="block text-[10px] text-white/50">
              Welcome
            </span>

            <span className="block text-xs font-semibold text-white">
              Haneef
            </span>
          </div>
        </button>
      ) : (

        /* Not logged in */
        <button
          onClick={() => goTo("login")}
          className="rounded-xl bg-ap-saffron px-4 py-2.5 text-xs font-bold text-ap-blue shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:px-5"
        >
          Login
        </button>
      )}

    </div>

  </div>
</header>


      <main className={showBottom ? "pb-[70px]" : ""}>
        {page === "home" && (
          <HomePage
            goTo={goTo}
            openScheme={openScheme}
          />
        )}
        {page === "login" && (
  <AuthPage
    type="login"
    goTo={goTo}
    onSubmit={login}
  />
)}
        {page === "register" && (
  <AuthPage
    type="register"
    goTo={goTo}
    onSubmit={registerUser}
  />
)}
        {page === "questions" && <Questions question={question} setQuestion={setQuestion} answers={answers} setAnswers={setAnswers} goTo={goTo} finish={checkEligibility} />}
        {page === "schemes" && (
          <Schemes
            search={search}
            setSearch={setSearch}
            filter={filter}
            setFilter={setFilter}
            schemes={visibleSchemes}
            goTo={goTo}
            openScheme={openScheme}
          />
        )}
       {page === "detail" && (
  <Detail
    goTo={goTo}
    toast={setToast}
    scheme={selectedScheme}
    saveScheme={saveScheme}
    savedIds={savedIds}
  />
)}
        {page === "profile" && <Profile logout={logout} toast={setToast} />}
        {page === "admin" && <Admin toast={setToast} />}
        {page === "about" && <About />}
        {page === "saved" && (
  <SavedSchemes
    schemes={savedSchemes}
    goTo={goTo}
    openScheme={openScheme}
    removeSavedScheme={removeSavedScheme}
  />
)}
      </main>

   <BottomNav
  page={page}
  goTo={goTo}
  loadSavedSchemes={loadSavedSchemes}
/>
    </div>
  );
}

function HomePage({ goTo, openScheme }) {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0b2f4f] via-[#174f7a] to-[#236b9e] px-6 pb-20 pt-14 text-white">

        {/* Background decoration */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/5" />
        <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-ap-saffron/10" />

        <div className="relative z-10 mx-auto max-w-[850px] text-center">

          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-medium backdrop-blur">
            🇮🇳 Government Scheme Discovery
          </div>

          {/* Telugu */}
          <p className="telugu mb-3 text-lg font-medium text-ap-saffron">
            మీకు సరైన ప్రభుత్వ పథకాలను కనుగొనండి
          </p>

          {/* Main heading */}
          <h1 className="mx-auto max-w-[700px] text-4xl font-bold leading-tight md:text-5xl">
            Find Government Schemes
            <span className="block text-ap-saffron">
              Made for You
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-5 max-w-[560px] text-sm leading-7 text-white/75 md:text-base">
            Answer a few simple questions and discover government
            schemes that may match your profile.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">

            <button
              onClick={() => goTo("questions")}
              className="w-full rounded-xl bg-ap-saffron px-7 py-3.5 text-sm font-bold text-[#123b5d] shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl sm:w-auto"
            >
              Check My Eligibility →
            </button>

            <button
              onClick={() => goTo("schemes")}
              className="w-full rounded-xl border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15 sm:w-auto"
            >
              Browse Schemes
            </button>

          </div>

          {/* Trust indicators */}
          <div className="mx-auto mt-10 flex max-w-[560px] flex-wrap justify-center gap-x-8 gap-y-3 text-xs text-white/65">

            <span className="flex items-center gap-1.5">
              ✓ Personalized Matching
            </span>

            <span className="flex items-center gap-1.5">
              ✓ Official Application Links
            </span>

            <span className="flex items-center gap-1.5">
              ✓ Free to Use
            </span>

          </div>
        </div>
      </section>


      {/* HOW IT WORKS */}
      <section className="bg-ap-slate px-6 py-10">

        <div className="mx-auto max-w-[850px]">

          <div className="mb-7 text-center">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-ap-blue">
              Simple Process
            </p>

            <h2 className="text-2xl font-bold">
              Find schemes in 3 steps
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">

            {[
              [
                "01",
                "Tell us about yourself",
                "Answer a few questions about your age, occupation and income."
              ],
              [
                "02",
                "Get matched",
                "Our eligibility system checks schemes against your profile."
              ],
              [
                "03",
                "Apply officially",
                "Review the requirements and continue to the official government portal."
              ]
            ].map(([number, title, text]) => (
              <div
                key={number}
                className="rounded-2xl border border-ap-border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-ap-blue/10 text-sm font-bold text-ap-blue">
                  {number}
                </div>

                <h3 className="mb-2 font-semibold">
                  {title}
                </h3>

                <p className="text-sm leading-6 text-ap-muted">
                  {text}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>


      {/* CATEGORIES */}
      <section className="mx-auto max-w-[850px] px-6 py-10">

        <div className="mb-6 flex items-end justify-between">

          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-ap-blue">
              Explore
            </p>

            <h2 className="text-xl font-bold">
              Browse by Category
            </h2>
          </div>

          <button
            onClick={() => goTo("schemes")}
            className="text-xs font-semibold text-ap-blue"
          >
            View all →
          </button>

        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">

          {categories.map(([icon, name]) => (
            <button
              key={name}
              onClick={() => goTo("schemes")}
              className="group rounded-2xl border border-ap-border bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:border-ap-blue/40 hover:shadow-md"
            >
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-ap-slate text-2xl transition group-hover:bg-ap-blue/10">
                {icon}
              </div>

              <div className="text-sm font-semibold">
                {name}
              </div>

              <div className="mt-1 text-[11px] text-ap-muted">
                Explore schemes →
              </div>
            </button>
          ))}

        </div>
      </section>


      {/* POPULAR SCHEMES */}
      <section className="bg-ap-slate px-6 py-10">

        <div className="mx-auto max-w-[850px]">

          <div className="mb-6 flex items-end justify-between">

            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-ap-blue">
                Recommended
              </p>

              <h2 className="text-xl font-bold">
                Popular Schemes
              </h2>
            </div>

            <button
              onClick={() => goTo("schemes")}
              className="text-xs font-semibold text-ap-blue"
            >
              See all →
            </button>

          </div>

          <div className="space-y-3">
            {popular.map((scheme) => (
              <SchemeCard
                key={scheme.name}
                scheme={scheme}
                onOpen={() => openScheme(scheme)}
              />
            ))}
          </div>

        </div>
      </section>


      {/* FINAL CTA */}
      <section className="px-6 py-12">

        <div className="mx-auto max-w-[850px] overflow-hidden rounded-3xl bg-ap-blue px-6 py-10 text-center text-white shadow-lg">

          <div className="mb-3 text-3xl">
            🎯
          </div>

          <h2 className="text-2xl font-bold">
            Not sure which scheme is for you?
          </h2>

          <p className="mx-auto mt-3 max-w-[450px] text-sm leading-6 text-white/70">
            Complete the eligibility check and we'll narrow down the
            schemes that may match your profile.
          </p>

          <button
            onClick={() => goTo("questions")}
            className="mt-6 rounded-xl bg-ap-saffron px-7 py-3 text-sm font-bold text-ap-blue transition hover:-translate-y-0.5"
          >
            Find My Schemes →
          </button>

        </div>
      </section>
    </>
  );
}
function AuthPage({ type, goTo, onSubmit }) {
  const register = type === "register";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e?.preventDefault();

    if (register) {
      onSubmit(name, email, password);
    } else {
      onSubmit(email, password);
    }
  };

  return (
    <section className="min-h-[calc(100vh-68px)] bg-ap-slate px-5 py-10">

      <div className="mx-auto max-w-[900px]">

        {/* Back */}
        <button
          onClick={() => goTo("home")}
          className="mb-6 flex items-center gap-1.5 text-xs font-medium text-ap-muted transition hover:text-ap-blue"
        >
          <ArrowLeft size={15} />
          Back to Home
        </button>


        <div className="grid overflow-hidden rounded-3xl border border-ap-border bg-white shadow-lg md:grid-cols-2">

          {/* LEFT SIDE */}
          <div className="relative hidden overflow-hidden bg-gradient-to-br from-[#123f63] to-[#236b9e] p-10 text-white md:block">

            {/* Decorative circles */}
            <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-white/5" />
            <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-ap-saffron/10" />

            <div className="relative z-10 flex h-full flex-col justify-between">

              <div>

                <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-ap-saffron text-2xl">
                  🏛️
                </div>

                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-ap-saffron">
                  AP Scheme Sahayak
                </p>

                <h2 className="text-3xl font-bold leading-tight">
                  Government schemes,
                  <span className="block text-ap-saffron">
                    made easier.
                  </span>
                </h2>

                <p className="mt-4 max-w-[320px] text-sm leading-6 text-white/65">
                  Discover schemes relevant to your profile, understand
                  their benefits and continue to official government
                  portals.
                </p>

              </div>


              <div className="mt-12 space-y-3">

                {[
                  "Personalized scheme matching",
                  "Save schemes for later",
                  "Official application links",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 text-xs text-white/75"
                  >
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-[10px] text-ap-saffron">
                      ✓
                    </span>

                    {item}
                  </div>
                ))}

              </div>

            </div>

          </div>


          {/* RIGHT SIDE */}
          <div className="p-6 sm:p-9 md:p-10">

            {/* Mobile icon */}
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-ap-blue/10 text-2xl md:hidden">
              {register ? "✍️" : "🏛️"}
            </div>


            <div className="mb-7">

              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.12em] text-ap-blue">
                {register ? "Get Started" : "Welcome Back"}
              </p>

              <h1 className="text-2xl font-bold text-slate-900">
                {register
                  ? "Create your account"
                  : "Log in to your account"}
              </h1>

              <p className="mt-2 text-sm leading-6 text-ap-muted">
                {register
                  ? "Create an account to save schemes and access personalized results."
                  : "Continue exploring schemes matched to your profile."}
              </p>

            </div>


            {/* Form */}
            <form onSubmit={handleSubmit}>

              {/* Name */}
              {register && (
                <label className="mb-5 block">

                  <span className="mb-2 block text-xs font-semibold text-slate-700">
                    Full Name
                  </span>

                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    required
                    className="w-full rounded-xl border-[1.5px] border-ap-border bg-ap-slate px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-ap-blue focus:bg-white focus:shadow-sm"
                  />

                </label>
              )}


              {/* Email */}
              <label className="mb-5 block">

                <span className="mb-2 block text-xs font-semibold text-slate-700">
                  Email Address
                </span>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full rounded-xl border-[1.5px] border-ap-border bg-ap-slate px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-ap-blue focus:bg-white focus:shadow-sm"
                />

              </label>


              {/* Password */}
              <label className="mb-6 block">

                <span className="mb-2 block text-xs font-semibold text-slate-700">
                  Password
                </span>

                <div className="relative">

                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={
                      register
                        ? "Create a password"
                        : "Enter your password"
                    }
                    required
                    className="w-full rounded-xl border-[1.5px] border-ap-border bg-ap-slate py-3.5 pl-4 pr-16 text-sm outline-none transition placeholder:text-slate-400 focus:border-ap-blue focus:bg-white focus:shadow-sm"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[11px] font-semibold text-ap-blue"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>

                </div>

              </label>


              {/* Submit */}
              <button
                type="submit"
                className="w-full rounded-xl bg-ap-blue px-5 py-3.5 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                {register
                  ? "Create Account →"
                  : "Log In →"}
              </button>

            </form>


            {/* Switch */}
            <div className="mt-6 border-t border-slate-100 pt-5 text-center">

              <p className="text-xs text-ap-muted">
                {register
                  ? "Already have an account?"
                  : "New to AP Scheme Sahayak?"}

                <button
                  onClick={() =>
                    goTo(register ? "login" : "register")
                  }
                  className="ml-1.5 font-bold text-ap-blue hover:underline"
                >
                  {register
                    ? "Log in"
                    : "Create an account"}
                </button>
              </p>

            </div>


            {/* Security */}
            <div className="mt-5 flex items-center justify-center gap-1.5 text-[10px] text-ap-muted">
              🔒 Your account information is securely handled.
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

function Field({ label, ...props }) { return <label className="mb-4 block"><span className="mb-1.5 block text-[13px] font-medium">{label}</span><input {...props} className="w-full rounded-lg border border-ap-border bg-ap-slate px-3 py-2.5 text-sm outline-none focus:border-ap-blue focus:bg-white" /></label>; }

function Questions({
  question,
  setQuestion,
  answers,
  setAnswers,
  goTo,
  finish,
}) {
  const q = questions[question];

  const select = (value) =>
    setAnswers((a) => ({
      ...a,
      [question]: value,
    }));

  const progress = ((question + 1) / questions.length) * 100;

  const questionIcons = ["🎂", "💰", "👤", "💼", "🏷️", "📄", "📍"];
  const currentIcon = questionIcons[question] || "📋";

  const hasAnswer =
    answers[question] !== undefined &&
    answers[question] !== "";

  const nextQuestion = () => {
    if (!hasAnswer) return;

    if (question === questions.length - 1) {
      finish();
    } else {
      setQuestion(question + 1);
    }
  };

  return (
    <section className="min-h-[calc(100vh-60px)] bg-ap-slate px-5 py-8">

      <div className="mx-auto max-w-[620px]">

        {/* Back to home */}
        <button
          onClick={() => goTo("home")}
          className="mb-6 flex items-center gap-1.5 text-xs font-medium text-ap-muted transition hover:text-ap-blue"
        >
          <ArrowLeft size={15} />
          Back to Home
        </button>


        {/* Heading */}
        <div className="mb-7 text-center">

          <div className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-ap-blue">
            Eligibility Check
          </div>

          <h1 className="text-2xl font-bold text-slate-900">
            Find schemes for you
          </h1>

          <p className="mt-2 text-sm text-ap-muted">
            Answer a few simple questions to get personalized results.
          </p>

        </div>


        {/* Progress */}
        <div className="mb-5">

          <div className="mb-2 flex items-center justify-between">

            <span className="text-xs font-semibold text-ap-blue">
              Step {question + 1} of {questions.length}
            </span>

            <span className="text-xs font-medium text-ap-muted">
              {Math.round(progress)}% complete
            </span>

          </div>

          <div className="h-2 overflow-hidden rounded-full bg-white">

            <div
              className="h-full rounded-full bg-ap-blue transition-all duration-300"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

        </div>


        {/* Main question card */}
        <div className="rounded-3xl border border-ap-border bg-white p-6 shadow-sm sm:p-8">

          {/* Icon */}
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-ap-blue/10 text-3xl">
            {currentIcon}
          </div>


          {/* Question */}
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ap-muted">
            Question {question + 1}
          </p>

          <h2 className="mb-6 text-xl font-bold leading-7 text-slate-900">
            {q.title}
          </h2>


          {/* Number input */}
          {(q.type === "input" || q.type === "income") ? (

            <div className="mb-7">

              <div className="relative">

                {q.type === "income" && (
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-semibold text-ap-muted">
                    ₹
                  </span>
                )}

                <input
                  type="number"
                  min={q.type === "income" ? "0" : "1"}
                  max={q.type === "income" ? undefined : "100"}
                  value={answers[question] || ""}
                  onChange={(e) => select(e.target.value)}
                  placeholder={
                    q.type === "income"
                      ? "Enter annual family income"
                      : "Enter your age"
                  }
                  className={`w-full rounded-xl border-[1.5px] border-ap-border bg-ap-slate py-4 pr-4 text-base font-medium outline-none transition focus:border-ap-blue focus:bg-white ${
                    q.type === "income"
                      ? "pl-10"
                      : "pl-4"
                  }`}
                />

              </div>

              <p className="mt-2 text-[11px] text-ap-muted">
                {q.type === "income"
                  ? "Enter your approximate annual family income."
                  : "Enter your age in completed years."}
              </p>

            </div>

          ) : (

            /* Options */
            <div className="mb-7 grid gap-3">

              {q.options.map(([icon, text]) => {

                const selected =
                  answers[question] === text;

                return (
                  <button
                    key={text}
                    onClick={() => select(text)}
                    className={`group flex items-center justify-between rounded-xl border-[1.5px] p-4 text-left transition ${
                      selected
                        ? "border-ap-blue bg-ap-blue/5 shadow-sm"
                        : "border-ap-border bg-white hover:border-ap-blue/40 hover:bg-ap-slate"
                    }`}
                  >

                    <div className="flex items-center gap-3">

                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-xl text-xl ${
                          selected
                            ? "bg-ap-blue/10"
                            : "bg-ap-slate"
                        }`}
                      >
                        {icon}
                      </div>

                      <span
                        className={`text-sm ${
                          selected
                            ? "font-semibold text-ap-blue"
                            : "font-medium text-slate-700"
                        }`}
                      >
                        {text}
                      </span>

                    </div>


                    {/* Selection indicator */}
                    <div
                      className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                        selected
                          ? "border-ap-blue bg-ap-blue text-white"
                          : "border-ap-border"
                      }`}
                    >
                      {selected && (
                        <Check size={12} />
                      )}
                    </div>

                  </button>
                );
              })}

            </div>
          )}


          {/* Navigation */}
          <div className="flex gap-3">

            {question > 0 && (
              <button
                onClick={() =>
                  setQuestion(question - 1)
                }
                className="rounded-xl border border-ap-border bg-white px-5 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-ap-slate"
              >
                ← Back
              </button>
            )}

            <button
              onClick={nextQuestion}
              disabled={!hasAnswer}
              className={`flex-1 rounded-xl px-5 py-3.5 text-sm font-bold transition ${
                hasAnswer
                  ? "bg-ap-blue text-white shadow-sm hover:-translate-y-0.5 hover:shadow-md"
                  : "cursor-not-allowed bg-slate-200 text-slate-400"
              }`}
            >
              {question === questions.length - 1
                ? "See My Schemes →"
                : "Continue →"}
            </button>

          </div>

        </div>


        {/* Privacy note */}
        <div className="mt-5 flex items-center justify-center gap-2 text-center text-[11px] text-ap-muted">
          <span>🔒</span>
          <span>
            Your answers are used only to find relevant schemes.
          </span>
        </div>

      </div>

    </section>
  );
}
function Schemes({
  search,
  setSearch,
  filter,
  setFilter,
  schemes,
  goTo,
  openScheme,
}) {
  const filters = [
    "All",
    "Agriculture",
    "Education",
    "Women",
    "Skill Development & Self Employment",
    "Energy & Household",
  ];

  return (
    <section className="min-h-screen bg-ap-slate px-5 py-8">
      <div className="mx-auto max-w-[850px]">

        {/* Header */}
        <div className="mb-7">
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.15em] text-ap-blue">
            Personalized Results
          </p>

          <h1 className="text-2xl font-bold text-slate-900">
            Your Scheme Matches
          </h1>

          <p className="mt-2 max-w-[520px] text-sm leading-6 text-ap-muted">
            Explore government schemes that may be relevant based on
            your profile and eligibility information.
          </p>
        </div>


        {/* Results summary */}
        <div className="relative mb-6 overflow-hidden rounded-3xl bg-gradient-to-r from-[#123f63] to-[#236b9e] p-6 text-white shadow-md">

          <div className="absolute -right-10 -top-14 h-40 w-40 rounded-full bg-white/5" />

          <div className="relative flex items-center gap-5">

            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-2xl">
              🎯
            </div>

            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-ap-saffron">
                  {schemes.length}
                </span>

                <span className="text-sm font-semibold">
                  {schemes.length === 1 ? "scheme" : "schemes"} found
                </span>
              </div>

              <p className="mt-1 text-xs leading-5 text-white/65">
                Based on your current eligibility profile
              </p>
            </div>

          </div>
        </div>


        {/* Search */}
        <div className="relative mb-4">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-ap-muted"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by scheme name or benefit..."
            className="w-full rounded-xl border-[1.5px] border-ap-border bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-ap-blue focus:shadow-sm"
          />

        </div>


        {/* Filters */}
        <div className="no-scrollbar mb-7 flex gap-2 overflow-x-auto pb-2">

          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`whitespace-nowrap rounded-full border px-4 py-2 text-xs font-semibold transition ${
                filter === f
                  ? "border-ap-blue bg-ap-blue text-white shadow-sm"
                  : "border-ap-border bg-white text-ap-muted hover:border-ap-blue/40"
              }`}
            >
              {f}
            </button>
          ))}

        </div>


        {/* Results heading */}
        {schemes.length > 0 && (
          <div className="mb-4 flex items-center justify-between">

            <h2 className="text-sm font-bold text-slate-900">
              Recommended for you
            </h2>

            <span className="text-xs text-ap-muted">
              {schemes.length} results
            </span>

          </div>
        )}


        {/* Scheme list */}
        {schemes.length === 0 ? (

          <div className="rounded-3xl border border-ap-border bg-white px-6 py-12 text-center shadow-sm">

            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-ap-slate text-3xl">
              🔍
            </div>

            <h2 className="text-lg font-bold text-slate-900">
              No matching schemes found
            </h2>

            <p className="mx-auto mt-2 max-w-[420px] text-sm leading-6 text-ap-muted">
              We couldn't find schemes matching your current details.
              Try updating your answers or changing the search and filters.
            </p>

            <button
              onClick={() => goTo("questions")}
              className="mt-6 rounded-xl bg-ap-blue px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5"
            >
              Check Eligibility Again
            </button>

          </div>

        ) : (

          <div>
            {schemes.map((s) => (
              <SchemeCard
                key={s._id || s.name}
                scheme={s}
                onOpen={() => openScheme(s)}
                showMatch={true}
              />
            ))}
          </div>

        )}


        {/* Recheck */}
        {schemes.length > 0 && (
          <div className="mt-7 text-center">

            <p className="mb-3 text-xs text-ap-muted">
              Your circumstances changed?
            </p>

            <button
              onClick={() => goTo("questions")}
              className="rounded-xl border border-ap-blue bg-white px-6 py-3 text-sm font-semibold text-ap-blue transition hover:bg-ap-blue hover:text-white"
            >
              ↻ Check Eligibility Again
            </button>

          </div>
        )}


        {/* Disclaimer */}
        <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-4">

          <div className="flex items-start gap-3">

            <span>ℹ️</span>

            <p className="text-[11px] leading-5 text-amber-800">
              These results are based on the information you provided.
              Final eligibility is determined by the respective government
              department. Verify the requirements on the official portal
              before applying.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}

function Detail({
  goTo,
  toast,
  scheme,
  saveScheme,
  savedIds
}) {
  if (!scheme) return null;

  const isSaved = savedIds?.includes(scheme._id);

  const handleApply = () => {
    if (!scheme.official_url) {
      toast("Official application link is not available");
      return;
    }

    window.open(
      scheme.official_url,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
<section className="min-h-screen bg-ap-slate px-5 pt-7 pb-28">
      <div className="mx-auto max-w-[850px]">

        {/* Back */}
        <button
          onClick={() => goTo("schemes")}
          className="mb-5 flex items-center gap-1.5 text-xs font-medium text-ap-muted transition hover:text-ap-blue"
        >
          <ArrowLeft size={15} />
          Back to results
        </button>


        {/* Hero */}
        <div className="relative mb-5 overflow-hidden rounded-3xl bg-gradient-to-br from-[#123f63] to-[#236b9e] p-6 text-white shadow-md sm:p-8">

          <div className="absolute -right-12 -top-16 h-44 w-44 rounded-full bg-white/5" />

          <div className="relative">

            <div className="mb-4 flex flex-wrap items-center gap-2">

              <span className="rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                {scheme.category}
              </span>

              <span className="rounded-full bg-green-400/15 px-3 py-1.5 text-[10px] font-semibold text-green-200">
                ✓ Likely Eligible
              </span>

            </div>

            <h1 className="max-w-[650px] text-2xl font-bold leading-8 sm:text-3xl">
              {scheme.name}
            </h1>

            <p className="mt-3 max-w-[650px] text-sm leading-6 text-white/70">
              {scheme.description}
            </p>


            {/* Main benefit */}
            {scheme.benefit && (
              <div className="mt-6 inline-block rounded-2xl border border-white/10 bg-white/10 px-5 py-3 backdrop-blur">

                <div className="text-[10px] font-semibold uppercase tracking-wider text-white/60">
                  Main Benefit
                </div>

                <div className="mt-1 text-base font-bold text-ap-saffron">
                  {scheme.benefit}
                </div>

              </div>
            )}

          </div>

        </div>


        {/* Actions */}
        <div className="mb-6 grid grid-cols-2 gap-3">

          <button
            onClick={() => {
              if (!isSaved) {
                saveScheme(scheme._id);
              }
            }}
            disabled={isSaved}
            className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3.5 text-sm font-bold transition ${
              isSaved
                ? "cursor-not-allowed border-green-200 bg-green-50 text-green-700"
                : "border-ap-blue bg-white text-ap-blue hover:bg-ap-blue/5"
            }`}
          >
            <Bookmark size={17} />

            {isSaved
              ? "✓ Saved"
              : "Save Scheme"}
          </button>


          <button
            onClick={handleApply}
            className="flex items-center justify-center gap-2 rounded-xl bg-ap-blue px-4 py-3.5 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            Official Website
            <ExternalLink size={16} />
          </button>

        </div>


        <div className="grid gap-5 md:grid-cols-2">

          {/* Benefits */}
          <div className="rounded-2xl border border-ap-border bg-white p-5 shadow-sm">

            <div className="mb-5 flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-xl">
                🎁
              </div>

              <div>
                <h2 className="font-bold text-slate-900">
                  Benefits
                </h2>

                <p className="text-[11px] text-ap-muted">
                  What this scheme provides
                </p>
              </div>

            </div>


            <div className="space-y-3">

              {scheme.benefits?.length > 0 ? (
                scheme.benefits.map((benefit, index) => (

                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-xl bg-green-50/50 p-3"
                  >

                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100 text-[10px] text-green-700">
                      ✓
                    </div>

                    <span className="text-sm leading-5 text-slate-700">
                      {benefit}
                    </span>

                  </div>

                ))
              ) : (
                <p className="text-sm text-ap-muted">
                  Benefit information is not available.
                </p>
              )}

            </div>

          </div>


          {/* Eligibility */}
          <div className="rounded-2xl border border-ap-border bg-white p-5 shadow-sm">

            <div className="mb-5 flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ap-blue/10 text-xl">
                ✓
              </div>

              <div>
                <h2 className="font-bold text-slate-900">
                  Eligibility
                </h2>

                <p className="text-[11px] text-ap-muted">
                  Important requirements
                </p>
              </div>

            </div>


            <div>

              {scheme.eligibility?.length > 0 ? (
                scheme.eligibility.map((item, index) => (

                  <div
                    key={index}
                    className="border-b border-slate-100 py-3 last:border-0"
                  >

                    <div className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-ap-muted">
                      {item.key}
                    </div>

                    <div className="text-sm font-medium leading-5 text-slate-800">
                      {item.value}
                    </div>

                  </div>

                ))
              ) : (
                <p className="text-sm text-ap-muted">
                  Eligibility information is not available.
                </p>
              )}

            </div>

          </div>

        </div>


        {/* Documents */}
        <div className="mt-5 rounded-2xl border border-ap-border bg-white p-5 shadow-sm">

          <div className="mb-5 flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-xl">
              📄
            </div>

            <div>
              <h2 className="font-bold text-slate-900">
                Documents Required
              </h2>

              <p className="text-[11px] text-ap-muted">
                Keep these documents ready
              </p>
            </div>

          </div>


          {scheme.documents?.length > 0 ? (

            <div className="grid gap-2 sm:grid-cols-2">

              {scheme.documents.map((document, index) => (

                <div
                  key={index}
                  className="flex items-center gap-2.5 rounded-xl bg-ap-slate p-3"
                >

                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-xs text-green-600">
                    ✓
                  </div>

                  <span className="text-sm text-slate-700">
                    {document}
                  </span>

                </div>

              ))}

            </div>

          ) : (

            <p className="text-sm text-ap-muted">
              Document information is not available.
            </p>

          )}

        </div>


        {/* Verification */}
        <div className="mt-5 rounded-2xl border border-ap-border bg-white p-5">

          <div className="flex items-start gap-3">

            <div className="text-xl">
              🛡️
            </div>

            <div>

              <h3 className="text-sm font-bold text-slate-900">
                Scheme Information
              </h3>

              <p className="mt-1 text-xs leading-5 text-ap-muted">
                Last verified:{" "}
                <span className="font-medium text-slate-700">
                  {scheme.last_verified || "Not specified"}
                </span>
              </p>

            </div>

          </div>

        </div>


        {/* Disclaimer */}
        <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4">

          <p className="text-[11px] leading-5 text-amber-800">
            ℹ️ A match does not guarantee final eligibility.
            Government departments may require additional conditions
            or verification. Always confirm the latest requirements
            on the official portal before applying.
          </p>

        </div>


        {/* Bottom CTA */}
        <div className="mt-7">

          <button
            onClick={handleApply}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-ap-blue px-6 py-4 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            Continue to Official Website
            <ExternalLink size={17} />
          </button>

        </div>

      </div>

    </section>
  );
}

function SavedSchemes({
  schemes,
  goTo,
  openScheme,
  removeSavedScheme,
}) {
  return (
    <section className="mx-auto max-w-[900px] px-6 py-8">
      <button
        onClick={() => goTo("schemes")}
        className="mb-6 text-sm text-ap-blue"
      >
        ← Back to Schemes
      </button>

      <h1 className="mb-2 text-2xl font-bold">
        Saved Schemes
      </h1>

      <p className="mb-6 text-sm text-ap-muted">
        Schemes you've bookmarked for later.
      </p>

      {schemes.length === 0 ? (
        <div className="rounded-xl border border-ap-border bg-white p-8 text-center">
          <div className="mb-3 text-4xl">♡</div>

          <h2 className="mb-2 font-semibold">
            No saved schemes
          </h2>

          <p className="text-sm text-ap-muted">
            Save a scheme and it will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {schemes.map((scheme) => (
            <div
              key={scheme._id}
              className="rounded-xl border border-ap-border bg-white p-5"
            >
              <h2 className="font-semibold">
                {scheme.name}
              </h2>

              <p className="mt-2 text-sm text-ap-muted">
                {scheme.description}
              </p>

              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => openScheme(scheme)}
                  className="rounded-lg bg-ap-blue px-4 py-2 text-sm font-medium text-white"
                >
                  View Details
                </button>

                <button
                  onClick={() =>
                    removeSavedScheme(scheme._id)
                  }
                  className="rounded-lg border border-ap-border px-4 py-2 text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function DetailSection({ title, children }) { return <section className="mb-2.5 rounded-[10px] border border-ap-border bg-white p-5"><h2 className="mb-2.5 text-[13px] font-semibold uppercase tracking-[0.05em] text-ap-muted">{title}</h2>{children}</section>; }

function Profile({ logout, toast }) {
  return <section className="mx-auto max-w-[680px] px-6 py-6">
    <div className="mb-5 flex items-center gap-4 rounded-[14px] bg-ap-blue p-6"><div className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-ap-saffron text-[22px] font-bold text-ap-blue">H</div><div><h1 className="text-lg font-semibold text-white">Haneef Ahmed</h1><p className="text-[13px] text-white/65">Krishna District · Member since 2025</p></div></div>
    <ProfileSection title="Personal Details" rows={[["Age", "22 years"], ["Gender", "Male"], ["District", "Krishna"], ["Category", "OBC"], ["Occupation", "Student"]]} />
    <ProfileSection title="Economic Details" rows={[["Annual income", "Below ₹3 Lakh"], ["BPL card", "Yes"], ["Land owned", "None"]]} />
    <ProfileSection title="Education" rows={[["Level", "Graduate (pursuing)"], ["Institution", "Government College"]]} />
    <button onClick={() => toast("✓ Profile updated")} className="mt-2 w-full rounded-lg bg-ap-saffron p-3 text-[15px] font-semibold text-ap-blue">Update Profile</button>
    <button onClick={logout} className="mt-2.5 w-full rounded-lg border border-red-300 bg-white p-3 text-[15px] font-semibold text-red-600">Log out</button>
  </section>;
}
function ProfileSection({ title, rows }) { return <section className="mb-4 rounded-[10px] border border-ap-border bg-white p-5"><h2 className="mb-4 text-[13px] font-semibold uppercase tracking-[0.05em] text-ap-muted">{title}</h2>{rows.map(([k, v]) => <div key={k} className="flex items-center justify-between border-b border-ap-border py-2 text-[13px] last:border-0"><span className="text-ap-muted">{k}</span><span className="font-medium">{v}</span></div>)}</section>; }

function Admin({ toast }) {
  const rows = [["YSR Rythu Bharosa", "Agriculture", true], ["Amma Vodi", "Education", true], ["YSR Aarogyasri", "Health", true], ["Jagananna Thodu", "Women", false]];
  return <section className="mx-auto max-w-[680px] px-6 py-6"><div className="mb-6 flex items-center justify-between"><h1 className="text-xl font-bold">Admin Panel</h1><button onClick={() => toast("+ New scheme form opening...")} className="flex items-center gap-1 rounded-lg bg-ap-blue px-4 py-2.5 text-[13px] font-semibold text-white"><Plus size={15} /> Add Scheme</button></div>
    <div className="mb-6 grid grid-cols-2 gap-2.5">{[["120", "Total schemes"], ["2,847", "Registered users"], ["98", "Active schemes"], ["22", "Expiring soon"]].map(([n, l]) => <div key={l} className="rounded-[10px] border border-ap-border bg-white p-4"><div className="text-2xl font-bold text-ap-blue">{n}</div><div className="mt-0.5 text-xs text-ap-muted">{l}</div></div>)}</div>
    <h2 className="mb-2.5 text-sm font-semibold">All Schemes</h2>{rows.map(([name, cat, active]) => <div key={name} className="mb-2 flex items-center justify-between rounded-[10px] border border-ap-border bg-white p-4"><div><div className="mb-1 text-sm font-medium">{name}</div><div className="flex gap-1"><Tag>{cat}</Tag><span className={`rounded-full px-2 py-1 text-[10px] font-semibold ${active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>{active ? "Active" : "Inactive"}</span></div></div><div className="flex gap-1.5"><button onClick={() => toast("Opening edit form...")} className="rounded-md border border-ap-border bg-ap-slate px-3 py-1.5 text-xs">Edit</button><button onClick={() => toast("Confirm delete?")} className="rounded-md border border-red-300 bg-red-100 px-3 py-1.5 text-xs text-red-600">Delete</button></div></div>)}</section>;
}

function About() {
  return <section className="mx-auto max-w-[680px] px-6 py-6"><div className="mb-6 rounded-[14px] bg-ap-blue px-6 py-8 text-center"><h1 className="telugu mb-1.5 text-2xl text-white">AP Scheme Sahayak</h1><p className="text-sm text-white/70">Bridging citizens with their entitlements</p></div>
    {[["Why this app exists", "Millions of eligible AP citizens miss out on government schemes simply because they don't know they qualify. AP Scheme Sahayak makes it simple — fill your profile once, and see every scheme you're entitled to, in Telugu or English."], ["How the eligibility engine works", "Your profile (age, income, occupation, category, district) is matched against real eligibility rules for each scheme. Matches are ranked by confidence and relevance. All processing happens on our secure servers — your data is never sold."], ["Built for AP citizens", "Supports Telugu and English. Works on 2G connections. Scheme data is verified against official AP government portals and updated monthly."], ["Tech Stack", "React + Tailwind CSS (frontend) · FastAPI + Python (backend) · MongoDB Atlas (database) · Deployed on Vercel & Render"]].map(([t, x]) => <div key={t} className="mb-2.5 rounded-[10px] border border-ap-border bg-white p-5"><h2 className="mb-1.5 text-sm font-semibold">{t}</h2><p className="text-[13px] leading-6 text-ap-muted">{x}</p></div>)}
  </section>;
}

function BottomNav({ page, goTo }) {
  const items = [
    ["home", Home, "Home"],
    ["schemes", ClipboardList, "Schemes"],
    ["saved", Bookmark, "Saved"],
    ["profile", User, "Profile"],
    ["about", Info, "About"],
  ];

  return (
    <nav className="border-t border-ap-border bg-white shadow-[0_-4px_15px_rgba(0,0,0,0.05)]">

      <div className="mx-auto flex h-[68px] max-w-[1000px]">

        {items.map(([id, Icon, label]) => {
          const active = page === id;

          return (
            <button
              key={id}
              onClick={() => goTo(id)}
              className={`relative flex flex-1 flex-col items-center justify-center gap-1 transition ${
                active
                  ? "text-ap-blue"
                  : "text-ap-muted hover:text-ap-blue"
              }`}
            >

              {/* Active indicator */}
              {active && (
                <div className="absolute top-0 h-[3px] w-8 rounded-b-full bg-ap-blue" />
              )}

              <div
                className={`flex h-8 w-8 items-center justify-center rounded-xl transition ${
                  active
                    ? "bg-ap-blue/10"
                    : ""
                }`}
              >
                <Icon size={19} />
              </div>

              <span
                className={`text-[10px] ${
                  active
                    ? "font-bold"
                    : "font-medium"
                }`}
              >
                {label}
              </span>

            </button>
          );
        })}

      </div>

    </nav>
  );
}

export default App;
