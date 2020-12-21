import { json } from 'express';

export const CONFIG = {
    ENV: JSON.stringify(process.env.ENV) === 'development' ? 'development' : 'production', //development | production
    ONLINE_SERVER_URL: 'http://localhost:8000',
};

// for any url do not suffix '/' (standard followd in this project) (nest / at use time if needed )
