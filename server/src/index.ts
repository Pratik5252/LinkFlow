import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.js';
import urlRoutes from './routes/url.js';
import { redirectUrl } from './controllers/url/redirectUrl.js';

dotenv.config();
const app = express();

app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true,
    })
);

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/url', urlRoutes);

app.get('/:shorturl', redirectUrl);

app.listen(Number(process.env.PORT) || 3000, '0.0.0.0', () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
