import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.js';
import urlRoutes from './routes/url.js';
import { redirectUrl } from './controllers/url/redirectUrl.js';

dotenv.config();
const PORT = Number(process.env.PORT);
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

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.listen(PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
