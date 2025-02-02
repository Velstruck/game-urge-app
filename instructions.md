Title: Game Discovery Web App using IGDB API, React, Tailwind CSS, Appwrite & React Router

Description:
I want to build a game discovery web application using JavaScript, React, Tailwind CSS, Appwrite, and React Router. The app will have a visually appealing home page displaying either top-rated, most downloaded, or trending games. Users can search for games, view details on a dedicated page, and navigate seamlessly across the app.

Tech Stack: (DONOT USE TYPESCRIPT use javascript)
Frontend:

React.js: Component-based UI development
Tailwind CSS: Utility-first CSS framework for modern styling
React Router: Client-side routing for seamless navigation
Backend & Database:

Appwrite: Handles user authentication (optional) and database management
External API:

IGDB API (Internet Game Database): Fetches game-related data (titles, cover images, genres, descriptions, ratings)
Twitch API (for IGDB authentication)
Development & Deployment:

GitHub: Version control and collaboration
Hosting Platforms: Netlify, Vercel, or Appwrite Functions
Features & Workflow:
1. Home Page (Landing Page)
Display a grid or carousel of trending/top games fetched from the IGDB API.
Include a search bar with a button for users to find specific games.
Use Tailwind CSS for a modern and engaging UI with hover effects.
Clicking on a game redirects users to the Game Details Page.
2. Search Functionality
The user types in a search query and clicks the Search button.
Fetch matching games from the IGDB API and display results dynamically.
Show results in a grid layout with game tiles.
Each result should be a clickable card leading to a game’s details page.
3. Game Details Page
When a user selects a game, fetch and display:
Cover image, title, release date, genres, platforms, description, ratings
Styled with Tailwind CSS for a clean, modern look.
Provide a Back to Search/Home button for easy navigation.
4. Smooth Navigation & Routing
React Router for seamless navigation between pages.
A Navbar with links to Home, Search, and Favorites (if authentication is enabled).
5. API Handling & Optimization
Efficient API requests with error handling and loading states.
Caching (localStorage or Appwrite DB) for improved performance and reduced API calls.
Development Plan:
Project Setup

Initialize React project
Install dependencies: React Router, Tailwind CSS, Appwrite SDK, Axios
Configure Tailwind CSS and Appwrite authentication (if needed)
Build the Home Page

Fetch top games from IGDB API
Implement the search bar
Style the layout using Tailwind CSS
Implement Search Functionality

Connect search API and display results dynamically (Note that rate limit is 4 requests/mintute, so optimize that and only hit api when user clicks search button)
Optimize results using a responsive grid layout
Game Details Page

Create a dynamic route for game details
Fetch game-specific data and display information
User Authentication & Favorites (Optional)

Final Testing & Deployment

Ensure responsiveness across devices