import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.text());
app.use(express.json());

// Log environment variables (excluding sensitive data)
console.log('Server starting with Client ID:', process.env.VITE_TWITCH_CLIENT_ID ? 'Present' : 'Missing');
console.log('Server starting with Access Token:', process.env.VITE_TWITCH_ACCESS_TOKEN ? 'Present' : 'Missing');

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

// Test the IGDB connection and refresh token if needed
const testApiConnection = async () => {
    try {
        const response = await igdbApi.post('/games', 'fields name; limit 1;');
        console.log('IGDB API connection test successful');
        return true;
    } catch (error) {
        if (error.response?.status === 401) {
            console.log('Token expired, refreshing...');
            const newToken = await refreshToken();
            if (newToken) {
                igdbApi = createIgdbApi(newToken);
                return await testApiConnection();
            }
        }
        console.error('IGDB API connection test failed:', error.response?.data || error.message);
        return false;
    }
};

// Token refresh function
const refreshToken = async () => {
    try {
        const response = await axios.post(
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
        const newToken = response.data.access_token;
        // Save the new token to .env file
        const envContent = `VITE_TWITCH_CLIENT_ID=${process.env.VITE_TWITCH_CLIENT_ID}
VITE_TWITCH_ACCESS_TOKEN=${newToken}`;
        await fs.promises.writeFile('.env', envContent);
        process.env.VITE_TWITCH_ACCESS_TOKEN = newToken;
        return newToken;
    } catch (error) {
        console.error('Error refreshing token:', error);
        return null;
    }
};

app.post('/api/games', async (req, res) => {
    try {
        console.log('Received request body:', req.body);
        const response = await igdbApi.post('/games', req.body);
        console.log('IGDB API response status:', response.status);
        res.json(response.data);
    } catch (error) {
        if (error.response?.status === 401) {
            try {
                const newToken = await refreshToken();
                if (newToken) {
                    igdbApi = createIgdbApi(newToken);
                    const retryResponse = await igdbApi.post('/games', req.body);
                    return res.json(retryResponse.data);
                }
            } catch (retryError) {
                console.error('Error after token refresh:', retryError);
            }
        }
        console.error('Proxy Error:', {
            status: error.response?.status,
            data: error.response?.data,
            message: error.message
        });
        res.status(error.response?.status || 500).json({
            error: error.response?.data || error.message,
            timestamp: new Date().toISOString()
        });
    }
});

app.listen(port, async () => {
    console.log(`Proxy server running at http://localhost:${port}`);
    const apiTest = await testApiConnection();
    if (!apiTest) {
        console.error('Warning: Initial API connection test failed');
    }
}); 