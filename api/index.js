import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

const app = express();

// Enable CORS for all routes in production
app.use(cors());
app.use(express.text());
app.use(express.json());

// Create IGDB API instance
const createIgdbApi = (token) => axios.create({
    baseURL: 'https://api.igdb.com/v4',
    headers: {
        'Client-ID': process.env.VITE_TWITCH_CLIENT_ID,
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'text/plain'
    }
});

let igdbApi = createIgdbApi(process.env.VITE_TWITCH_ACCESS_TOKEN);

app.post('/api/games', async (req, res) => {
    try {
        const response = await igdbApi.post('/games', req.body);
        res.json(response.data);
    } catch (error) {
        if (error.response?.status === 401) {
            try {
                const tokenResponse = await axios.post(
                    'https://id.twitch.tv/oauth2/token',
                    null,
                    {
                        params: {
                            client_id: process.env.VITE_TWITCH_CLIENT_ID,
                            client_secret: process.env.VITE_TWITCH_CLIENT_SECRET,
                            grant_type: 'client_credentials'
                        }
                    }
                );
                const newToken = tokenResponse.data.access_token;
                igdbApi = createIgdbApi(newToken);
                const retryResponse = await igdbApi.post('/games', req.body);
                return res.json(retryResponse.data);
            } catch (retryError) {
                console.error('Error after token refresh:', retryError);
                return res.status(500).json({ error: 'Failed to refresh token' });
            }
        }
        res.status(error.response?.status || 500).json({
            error: error.response?.data || error.message
        });
    }
});

export default app; 