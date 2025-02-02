import axios from 'axios';
import fs from 'fs';
import path from 'path';

class TokenManager {
    constructor() {
        this.tokenFile = './.token-cache.json';
        this.clientId = process.env.VITE_TWITCH_CLIENT_ID;
        this.clientSecret = process.env.VITE_TWITCH_CLIENT_SECRET;
        this.token = null;
        this.expiresAt = null;
    }

    async loadToken() {
        try {
            if (fs.existsSync(this.tokenFile)) {
                const data = JSON.parse(fs.readFileSync(this.tokenFile, 'utf8'));
                if (data.expiresAt > Date.now()) {
                    this.token = data.token;
                    this.expiresAt = data.expiresAt;
                    return this.token;
                }
            }
        } catch (error) {
            console.error('Error loading cached token:', error);
        }
        return await this.refreshToken();
    }

    async refreshToken() {
        try {
            const response = await axios.post(
                'https://id.twitch.tv/oauth2/token',
                null,
                {
                    params: {
                        client_id: this.clientId,
                        client_secret: this.clientSecret,
                        grant_type: 'client_credentials'
                    }
                }
            );

            this.token = response.data.access_token;
            // Store expiration time (subtract 1 hour for safety margin)
            this.expiresAt = Date.now() + (response.data.expires_in - 3600) * 1000;

            // Save to file
            fs.writeFileSync(
                this.tokenFile,
                JSON.stringify({
                    token: this.token,
                    expiresAt: this.expiresAt
                })
            );

            return this.token;
        } catch (error) {
            console.error('Error refreshing token:', error);
            throw error;
        }
    }

    async getValidToken() {
        if (!this.token || !this.expiresAt || this.expiresAt <= Date.now()) {
            return await this.loadToken();
        }
        return this.token;
    }
}

export default new TokenManager(); 