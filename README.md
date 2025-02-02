# Game Search App 🎮

[Live Here](https://your-deployed-url-here.vercel.app)

A modern, interactive game search application that lets users discover and explore video games using the IGDB API. Features a beautiful UI with gaming-themed animations and real-time search capabilities.

![Game Search App Screenshot](screenshot-url-here) 

## ✨ Features

- **Advanced Game Search**: Search through a vast database of video games with real-time results
- **Game Details**: View comprehensive information about each game including:
  - Cover images and screenshots
  - Release dates and ratings
  - Platform availability
  - Game summaries
  - Video trailers
  - Similar game recommendations
- **Interactive UI Elements**:
  - Particle background effects
  - Smooth page transitions
  - Animated game cards with hover effects
  - Responsive design for all devices
- **Top Games Section**: Discover highly-rated games
- **Automatic Token Management**: Seamless handling of API authentication

## 🛠️ Tech Stack

- **Frontend**:
  - React.js
  - Vite
  - Framer Motion (for animations)
  - Tailwind CSS (for styling)
  - Axios (for API requests)

- **Backend**:
  - Express.js
  - Node.js
  - IGDB API integration

- **Deployment**:
  - Vercel (Frontend & API)

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- IGDB/Twitch API credentials

### Environment Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Velstruck/game-urge-app.git
   cd game-search-app
   ```

2. Create a `.env` file in the root directory:
   ```env
   VITE_TWITCH_CLIENT_ID=your_client_id
   VITE_TWITCH_CLIENT_SECRET=your_client_secret
   VITE_TWITCH_ACCESS_TOKEN=your_access_token
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally

For development (runs both frontend and backend):
```bash
npm run dev:all
```

For frontend only:
```bash
npm run dev
```

For backend only:
```bash
npm run server
```

The application will be available at:
- Frontend: `http://localhost:5173`
- API: `http://localhost:3001`



## 📝 API Routes

- `POST /api/games`: Search games or fetch game details
  - Accepts IGDB API query syntax
  - Handles token refresh automatically
  - Returns game data in JSON format


## 🙏 Acknowledgments

- IGDB API for providing the game data
- Twitch Developer Portal for API access
- All the amazing open-source libraries used in this project
