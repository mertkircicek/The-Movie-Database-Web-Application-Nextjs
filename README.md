TMDB Clone (Next.js)
This project is a modern web application that mimics the core features of The Movie Database (TMDB) website. It's designed for users to discover information about movies and TV shows, explore popular content, search, create favorite lists, and manage watchlists.

FEATURES
Home Page: Displays popular movies and TV shows categorized by "Streaming", "On TV", "For Rent", and "In Theaters".

Dynamic Detail Pages: Features dynamic URL pages with detailed information for movies, TV shows, and people.

Poster, user score, and overview.

Actors and other relevant information.

Search Functionality: Provides a comprehensive search capability across movies, TV shows, and people.

Real-time search result suggestions.

Favorites Management: Allows users to mark their favorite movies and TV shows and view them on a dedicated page.

Watchlist: A dedicated page where users can add and manage movies and TV shows they want to watch.

Watched List: A dedicated page where users can mark and manage movies and TV shows they have already watched.

Category Filtering: Ability to filter movies and TV shows separately on both the Watchlist and Watched List pages.

Media Listing Pages: Comprehensive listing pages for movies and TV shows, including popular, now playing, upcoming, and top-rated categories.

Advanced filtering and sorting options by year, genre, and other criteria.

Filtering by region and watch providers.

Responsive Design: The application features a responsive user interface compatible with various device sizes (mobile, tablet, desktop).

User-Friendly Interface: Clean and intuitive design with easy navigation.

TECHNOLOGIES USED
Next.js: A React framework with server-side rendering (SSR) and static site generation (SSG) capabilities, used for routing and API integration.

React: A JavaScript library for building user interfaces.

Tailwind CSS: A utility-first CSS framework for rapid and responsive UI development.

Axios: An HTTP client used for making API requests.

React Icons: For easily using icons from various popular icon sets (like Font Awesome) as React components.

React Hot Toast: A lightweight and customizable toast notification library for displaying instant feedback (success, error messages) to the user.

localStorage: Used for persistent client-side storage of user data such as favorites, watchlists, and watched lists.

Setup and Running the Project
Follow these steps to get the project running on your local machine:

1. Clone the Repository
git clone <your_project_repo_address>
cd <your_project_folder_name>

2. Install Dependencies
Before starting the application, you need to install all the required Node.js packages. Run the following command in your project directory:

npm install

This command will install the following key packages:

next: The React framework itself.

react, react-dom: React's core libraries.

tailwindcss: For utility-first CSS styling.

postcss, autoprefixer: For processing CSS with Tailwind.

axios: For making HTTP requests to the TMDB API.

react-icons: For various icons used throughout the application (e.g., search, film, TV, user icons).

react-hot-toast: For displaying informative messages (toasts).

react-spinners: For displaying loading animations (e.g., MoonLoader).

react-fontawesome: Used in the Navbar for certain icons.

3. Configure Environment Variables
You need an API key from TMDB to fetch data.
Obtain an API key from the TMDB Developer Website.

Create a file named .env.local in the root directory of your project and add the following line:

NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key

Replace your_tmdb_api_key with the actual API key you obtained.

4. Start the Application
To start the development server, run:

npm run dev

The application will typically start running at http://localhost:3000. Visit this address in your browser to view the application.

