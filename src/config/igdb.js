import axios from 'axios';

// degubg karne ko
console.log('IGDB Config - Client ID:', import.meta.env.VITE_TWITCH_CLIENT_ID);
console.log('IGDB Config - Token:', import.meta.env.VITE_TWITCH_ACCESS_TOKEN);

const API_URL = import.meta.env.PROD 
  ? '/api'  // Production: use relative path
  : 'http://localhost:3001/api'; // Development: use local server

const igdbApi = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'text/plain'
    }
});

// rate limit karne ko interceptor
igdbApi.interceptors.request.use((config) => {
    console.log('Making API request:', config.url);
    return new Promise(resolve => setTimeout(() => resolve(config), 250));
});

// error handling ko interceptor ka response
igdbApi.interceptors.response.use(
    response => response,
    error => {
        if (error.response) {
            console.error('API Error Response:', {
                status: error.response.status,
                data: error.response.data,
                headers: error.response.headers
            });
        } else {
            console.error('API Error:', error.message);
        }
        throw error;
    }
);

export const searchGames = async (query) => {
    try {
        const response = await igdbApi.post('/games', `
            search "${query}";
            fields name,cover.url,genres.name,platforms.name,rating,first_release_date,summary;
            limit 20;
            where version_parent = null;
        `);
        console.log('Search results:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error searching games:', error);
        throw error;
    }
};

export const getTopGames = async () => {
    try {
        const response = await igdbApi.post('/games', `
            fields name,cover.url,genres.name,platforms.name,rating,first_release_date,summary;
            where rating != null & version_parent = null;
            sort rating desc;
            limit 20;
        `);
        console.log('Top games:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching top games:', error);
        throw error;
    }
};

export const getGameDetails = async (gameId) => {
    try {
        const response = await igdbApi.post('/games', `
            fields name,
                cover.url,
                genres.name,
                platforms.name,
                rating,
                first_release_date,
                summary,
                screenshots.url,
                videos.*,
                similar_games.name,
                similar_games.cover.url;
            where id = ${gameId};
        `);
        
        // video data log karne ko
        if (response.data[0]?.videos) {
            console.log('Game videos:', response.data[0].videos);
        }
        
        console.log('Game details:', response.data[0]);
        return response.data[0];
    } catch (error) {
        console.error('Error fetching game details:', error);
        throw error;
    }
};

export default igdbApi; 