# Team Task Manager - Full Stack Interview Project

## Live Demo
`[Railway URL after deployment]`

## GitHub Repo
`[repo link]`

## Features
✅ Authentication (Signup/Login) with role-based access (Admin/Member)  
✅ Project & Team Management  
✅ Task Creation, Assignment, Status Tracking (pending/in-progress/completed)  
✅ Dashboard with stats, recent tasks, overdue alerts  
✅ REST APIs with validation, relationships  
✅ Responsive UI (Tailwind CSS)  

## Tech Stack
- **Backend**: Node.js, Express, MongoDB, JWT, Mongoose  
- **Frontend**: React, Vite, React Router, Axios, React Hook Form, Tailwind  
- **Deployment**: Railway + MongoDB  

## Local Setup
### 1. MongoDB (Required for local)
- Download: https://www.mongodb.com/try/download/community  
- Install & start service (`mongod`)  

### 2. Backend
```bash
cd backend
npm install
npm run dev  # port 3001
```

### 3. Frontend
```bash
cd frontend
npm install
npm run dev  # port 3000
```

### Test
- localhost:3000/login or /signup  
- Admin signup → create projects/tasks  
- Dashboard shows stats/overdue  

## Railway Deployment (Production)
1. GitHub repo push  
2. railway.app → New Project → GitHub repo  
3. Add MongoDB service  
4. Set env vars: `JWT_SECRET=yoursecret`  
5. Deploy! Live URL ready  

## API Endpoints
- `POST /api/auth/signup` - Register  
- `POST /api/auth/login` - Login  
- `GET /api/projects` - List projects  
- `POST /api/projects` - Create project  
- `GET /api/tasks` - My tasks  
- `PUT /api/tasks/:id` - Update status  

Perfect for interview demo!
