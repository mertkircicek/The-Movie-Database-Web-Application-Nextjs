TMDB App (Next.js)

This project is a modern web application that mimics the core features of The Movie Database (TMDB) website. It's designed for users to discover information about movies and TV shows, explore popular content, search, create favorite lists, and manage watchlists.

🎬 FEATURES

-> Home Page
- Displays popular movies and TV shows categorized by "Streaming", "On TV", "For Rent", and "In Theaters"

📝 Dynamic Detail Pages
- Features dynamic URL pages with detailed information for movies, TV shows, and people
- Poster, user score, and overview
- Actors and other relevant information

🔍 Search Functionality
- Provides a comprehensive search capability across movies, TV shows, and people
- Real-time search result suggestions

❤️ Favorites Management
- Allows users to mark their favorite movies and TV shows and view them on a dedicated page

📋 Watchlist
- A dedicated page where users can add and manage movies and TV shows they want to watch

✅ Watched List
- A dedicated page where users can mark and manage movies and TV shows they have already watched

🗂️ Category Filtering
- Ability to filter movies and TV shows separately on both the Watchlist and Watched List pages

📑 Media Listing Pages
- Comprehensive listing pages for movies and TV shows, including popular, now playing, upcoming, and top-rated categories
- Advanced filtering and sorting options by year, genre, and other criteria
- Filtering by region and watch providers

📱 Responsive Design
- The application features a responsive user interface compatible with various device sizes (mobile, tablet, desktop)

🎨 User-Friendly Interface
- Clean and intuitive design with easy navigation

🚀 TECHNOLOGIES USED

- Next.js: A React framework with server-side rendering (SSR) and static site generation (SSG) capabilities, used for routing and API integration
- React: A JavaScript library for building user interfaces
- Tailwind CSS: A utility-first CSS framework for rapid and responsive UI development
- Axios: An HTTP client used for making API requests
- React Icons: For easily using icons from various popular icon sets (like Font Awesome) as React components
- React Hot Toast: A lightweight and customizable toast notification library for displaying instant feedback (success, error messages) to the user
- localStorage: Used for persistent client-side storage of user data such as favorites, watchlists, and watched lists
- Docker: Containerization for consistent development and deployment environments

📁 PROJECT STRUCTURE

tmdb-app/
├── public/                    
├── src/
│   ├── api/                  
│   ├── baseUI/               
│   ├── components/
|   |   |__ Banner/
|   |   |__ MediaListPage/          
│   │   ├── Movies/            
│   │   └── SearchBar/ 
|   |       
│   ├── context/               
│   ├── Layouts/               
│   ├── pages/                 
│   └── styles/                
├── Dockerfile                
├── docker-compose.yml         
├── next.config.js            
├── tailwind.config.js        
└── package.json             


🛠️ SETUP AND RUNNING THE PROJECT

- Docker Desktop installed on your machine
- Git for cloning the repository

🐳 Option 1: Running with Docker (Recommended)

1. Clone the Repository

git clone <your_project_repo_address>
cd tmdb-app


2. Configure Environment Variables
You need an API key from TMDB to fetch data. 

-> Obtain an API key from the [TMDB Developer Website](https://www.themoviedb.org/settings/api)
-> Create a file named `.env.local` in the root directory and add:

NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here

Replace `your_tmdb_api_key_here` with your actual API key.

3. Build and Run with Docker

docker-compose up --build

docker-compose up -d --build

4. Access the Application
The application will be available at: **http://localhost:3000**

🔧 Docker Management Commands

```bash
# Start the application (after initial build)
docker-compose up

# Start in background
docker-compose up -d

# Stop the application
docker-compose down

# Restart the application
docker-compose restart

# View logs (when running in background)
docker-compose logs -f

# Rebuild after code changes
docker-compose up --build

# Clean rebuild (if issues occur)
docker-compose build --no-cache
docker-compose up
```

💻 Option 2: Local Development Setup

1. Clone the Repository

git clone <your_project_repo_address>
cd tmdb-app

2. Install Dependencies

npm install


This will install the following key packages:
- next: The React framework itself
- react, react-dom: React's core libraries
- tailwindcss: For utility-first CSS styling
- postcss, autoprefixer: For processing CSS with Tailwind
- axios: For making HTTP requests to the TMDB API
- react-icons: For various icons used throughout the application
- react-hot-toast: For displaying informative messages (toasts)
- react-spinners: For displaying loading animations
- react-fontawesome: Used in the Navbar for certain icons

3. Configure Environment Variables
Create `.env.local` file as described in the Docker setup above.

4. Start Development Server

npm run dev


The application will start at: **http://localhost:3000**

🚢 DEPLOYMENT

The project is containerized with Docker, making deployment straightforward:

-> Production Build: The Dockerfile uses multi-stage build for optimized production images
-> Environment Variables: Configure production API keys in your deployment environment
-> Port Configuration: Application runs on port 3000 by default
-> Static Assets: Images and static files are properly served through Next.js image optimization

📋 FEATURES OVERVIEW

- ✅ Browse popular movies and TV shows
- ✅ Search across all media types
- ✅ View detailed information pages
- ✅ Add to favorites, watchlist, and watched lists
- ✅ Filter and categorize content
- ✅ Responsive design for all devices
- ✅ Server-side rendering with Next.js
- ✅ API integration with TMDB
- ✅ Client-side storage for user preferences
- ✅ Docker containerization
- ✅ Optimized image loading
- ✅ Modern React patterns with hooks and context


