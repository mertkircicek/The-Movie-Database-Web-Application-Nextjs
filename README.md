# 🎬 TMDB App (Next.js)

A modern web application replicating the core features of **The Movie Database (TMDB)**.  
It allows users to discover movies and TV shows, explore popular content, search, manage favorites, watchlists, and watched lists.

---

## ✨ Features

### 🏠 **Home Page**
- Displays popular movies and TV shows categorized by:
  - Streaming
  - On TV
  - For Rent
  - In Theaters

### 📝 **Dynamic Detail Pages**
- Dynamic routes for movies, TV shows, and people
- Poster, user score, and overview
- Cast and additional relevant information

### 🔍 **Search**
- Comprehensive search for movies, TV shows, and people
- Real-time search suggestions

### ❤️ **Favorites**
- Mark movies and TV shows as favorites and view them on a dedicated page

### 📋 **Watchlist**
- Add and manage movies and TV shows you want to watch

### ✅ **Watched List**
- Mark and manage movies and TV shows you have watched

### 🗂️ **Category Filtering**
- Filter movies and TV shows separately in Watchlist and Watched List pages

### 📑 **Media Listing Pages**
- Popular, now playing, upcoming, and top-rated categories
- Advanced filtering and sorting by year, genre, region, and watch providers

### 📱 **Responsive Design**
- Fully responsive layout for mobile, tablet, and desktop

### 🎨 **User-Friendly Interface**
- Clean, modern design with intuitive navigation

---

## 🛠️ Technologies Used

- **Next.js** – React framework with SSR & SSG support, routing, and API integration
- **React** – UI library for building interactive interfaces
- **Tailwind CSS** – Utility-first CSS framework
- **Axios** – HTTP client for API requests
- **React Icons** – Icon library
- **React Hot Toast** – Toast notifications
- **localStorage** – Persistent client-side storage
- **Docker** – Containerization for consistent environments

---

## 📁 Project Structure

tmdb-app/
├── public/                   
├── src/
│   ├── api/                   
│   ├── baseUI/                
│   ├── components/            
│   │   ├── Banner/           
│   │   ├── SearchBar/        
│   │   ├── Movies/            
│   │   └── MediaListPage/     
│   ├── context/               
│   ├── Layouts/               
│   ├── pages/               
│   └── styles/               
├── Dockerfile                 
├── docker-compose.yml         
├── next.config.js            
├── tailwind.config.js         
└── package.json               
    


🐳 Setup & Running

Option 1: Using Docker (Recommended)

1️⃣ Clone the Repository

git clone <your_project_repo_address>
cd tmdb-app

2️⃣ Configure Environment Variables

Get an API key from TMDB Developer Website and create .env.local:

NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here

3️⃣ Build and Run with Docker

docker-compose up --build

4️⃣ Access the App

Open: http://localhost:3000

🔧 Docker Management Commands

docker-compose up         # Start
docker-compose up -d      # Start in background
docker-compose down       # Stop
docker-compose restart    # Restart
docker-compose logs -f    # View logs
docker-compose build --no-cache && docker-compose up  # Clean rebuild

Option 2: Local Development

1️⃣ Clone the Repository

git clone <your_project_repo_address>
cd tmdb-app

2️⃣ Install Dependencies

npm install

3️⃣ Configure Environment Variables

NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here

4️⃣ Start Development Server

npm run dev

📍 Access at: http://localhost:3000

🚢 Deployment

Multi-stage Docker build for optimized production images

Configure production .env variables for API keys

Default port: 3000

Static assets and images optimized via Next.js

📋 Features Overview
✔ Browse popular movies and TV shows
✔ Search across all media types with real-time suggestions
✔ View detailed movie/TV/person pages
✔ Manage favorites, watchlists, and watched lists
✔ Filter and categorize content
✔ Fully responsive design
✔ SSR & SSG support with Next.js
✔ API integration with TMDB
✔ Client-side storage for preferences
✔ Docker containerization
✔ Optimized image loading
✔ Modern React patterns with hooks and context