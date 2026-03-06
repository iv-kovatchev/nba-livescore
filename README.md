# 🏀 NBA Livescore

A full-stack NBA companion app for the 2025–26 season — live scores, standings, teams, players, and arenas. Built with React, TypeScript, Node.js, and MongoDB.

---

## ✨ Features

- **Live Scores** — Real-time game scores with polling via SportRadar API
- **Standings** — Eastern & Western Conference tables, updated daily
- **Teams** — All 30 NBA franchises with rosters and season info
- **Players** — Player profiles combining static bio data with live season stats
- **Arenas** — Visual arena pages with location, capacity, and photos
- **Dark / Light Theme** — Full theme support via CSS variables

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, TypeScript, SCSS, React Query, React Router |
| Backend | Node.js, Express, TypeScript |
| Database | MongoDB Atlas (Mongoose) |
| Live Data | SportRadar NBA API |
| Hosting | Azure App Service |
| CI/CD | GitHub Actions → Azure (auto-deploy on merge to `develop`) |

---

## 🗂 Project Structure

```
nba-livescore/
├── client/                  # React + TypeScript frontend
│   └── src/
│       ├── features/        # Feature-based modules
│       │   ├── scores/
│       │   ├── standings/
│       │   ├── teams/
│       │   ├── players/
│       │   └── arenas/
│       ├── shared/          # Shared components, hooks, utils
│       └── pages/           # Route-level components
│
├── server/                  # Node.js + Express backend
│   └── src/
│       ├── models/          # Mongoose schemas
│       ├── routes/          # API endpoints
│       ├── controllers/     # Route handlers
│       ├── middleware/       # Express middleware
│       ├── config/          # DB connection
│       └── seed/            # Database seed scripts
│           └── players/     # Per-team player data
│
└── .github/
    └── workflows/           # CI/CD pipeline
```

---

## 🗄 Data Strategy

The app uses a **hybrid data approach**:

| Data | Source | Why |
|---|---|---|
| Teams, Players, Arenas | MongoDB Atlas | Static / rarely changes |
| Live Scores | SportRadar API | Real-time, polled every 30s |
| Standings | SportRadar API | Updates after every game |
| Player Season Stats | SportRadar API | Updated daily |

---

## 🎨 Design

The UI uses a custom design system with two themes:

**Dark Theme** — Deep navy-black backgrounds with gold and red accents  
**Light Theme** — Clean off-white surfaces with the same accent palette

```scss
// Core palette
--accent:            #c9a84c   // Championship gold
--accent-secondary:  #e63946   // Live / alert red

// Dark
--bg-primary:        #0a0a0f
--bg-secondary:      #13131a
--bg-elevated:       #1c1c27

// Light
--bg-primary:        #f4f5f7
--bg-secondary:      #ffffff
--bg-elevated:       #eaedf2
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas account
- SportRadar NBA API key (trial)

### Backend

```bash
cd server
npm install
cp .env.example .env   # fill in your credentials
npm run seed           # populate the database
npm run dev            # starts on port 3000
```

### Frontend

```bash
cd client
npm install
npm run dev            # starts on port 5173
```

### Environment Variables

```env
PORT=3000
CLIENT_URL=http://localhost:5173
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/nba-livescore
SPORTRADAR_API_KEY=your_api_key_here
```

---

## 🔁 CI/CD Pipeline

Merging any `feature/*` branch into `develop` automatically triggers a GitHub Actions workflow that builds and deploys the app to Azure App Service.

```
feature/xyz  →  PR  →  develop  →  GitHub Actions  →  Azure
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/teams` | All 30 teams |
| GET | `/api/teams/:id` | Team by ID (with arena) |
| GET | `/api/players` | All players |
| GET | `/api/players/:id` | Player by ID |
| GET | `/api/players/team/:teamId` | Players by team |
| GET | `/api/arenas` | All arenas |
| GET | `/api/arenas/:id` | Arena by ID |

---

## 📁 Branching Strategy

```
develop          ← stable, auto-deploys to Azure
└── feature/*    ← one branch per feature, PR into develop
```

---

## 👤 Author

Built as a university project by **Ivan Kovatchev**  
Season: **2025–26 NBA**