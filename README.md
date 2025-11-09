# Recipe Sharing Platform

A **full-stack Recipe Sharing Platform** built using the **MERN stack (MongoDB, Express.js, React.js, Node.js)**.  
This project allows users to create, view, and explore recipes with detailed ingredients and steps.  

---

## Features

- Add new recipes with image upload  
- Browse all shared recipes  
- Search recipes by name  
- View full recipe details (ingredients & steps)  
- Beautiful UI using Tailwind CSS  
- Toast notifications for feedback  
 

---

## Tech Stack

### Frontend
- React.js  (Using Vite)
- React Router  
- Axios  
- Tailwind CSS

### Backend
- Node.js  
- Express.js  
- MongoDB with Mongoose  
- dotenv for environment configuration  
- CORS enabled for frontend-backend communication  

---

## Installation & Setup

Follow these steps to set up and run the project locally 👇

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Nikitarathod2001/recipe-sharing-platform.git
cd recipe-sharing-platform
```

### 2️⃣ Setup Backend
```bash
cd backend
npm install
```

#### Create a .env file inside the backend folder and add the following variables:
```bash
PORT=5800
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_cloud_api_key"
CLOUDINARY_SECRET_KEY="your_cloud_secret_key"
```

#### Start the backend server:
```bash
npm start server
```


### 3️⃣ Setup Frontend
```bash
cd frontend
npm install
npm run dev
```

#### Create a .env file inside the frontend folder and add the following variable:
```bash
VITE_BACKEND_URL = http://localhost:5800
```

### 4️⃣ Access the Application
```bash
Frontend → http://localhost:5173

Backend → http://localhost:5800

Ensure both servers are running concurrently.
```