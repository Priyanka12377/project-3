# Team Task Manager - Full Stack Interview Project

## Live Demo
[Add Railway URL here after deployment]

## Features
- ✅ Authentication (Signup/Login - Admin/Member RBAC)
- ✅ Project & Team Management
- ✅ Task CRUD + Status (pending/in-progress/completed) + Overdue
- ✅ Dashboard with stats
- ✅ REST APIs + MongoDB
- ✅ Validations & Relationships
- ✅ Responsive UI (Tailwind + React)

## Tech Stack
```
Backend: Node.js/Express + MongoDB + JWT
Frontend: React + Vite + Tailwind CSS + Axios
Deployment: Railway + MongoDB Atlas
```

## Local Setup
```bash
# Backend
cd backend
npm install
npm run dev  # localhost:3001

# Frontend  
cd frontend
npm install
npm run dev  # localhost:3000
```

## API Endpoints
```
POST /api/auth/signup {name, email, password, role}
POST /api/auth/login {email, password}
GET /api/projects
POST /api/projects
POST /api/tasks
PUT /api/tasks/:id
```

## Railway Deployment
1. Root Directory: `./backend`
2. Vars: `MONGODB_URI`, `JWT_SECRET`
3. `Procfile`: `web: npm start`

## Demo Video Script
1. Signup Admin → Login
2. Dashboard overview  
3. Create project → Add team members
4. Create/assign tasks → Update status
5. Overdue tasks highlight

**Fully Functional - Ready for Interview Submission!** 🎉
