import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import authRoutes from './routes/auth';
import lobbyRoutes from './routes/lobby';
import referralRoutes from './routes/referrals';
import tonRoutes from './routes/ton';
import profileRoutes from './routes/profile';

// Load environment variables from .env file
dotenv.config();

// Create a new Express application instance
const app = express();

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Configure CORS based on allowed origins specified in the .env file
const origins = process.env.CORS_ORIGIN?.split(',').map((o) => o.trim()) || [];
app.use(
  cors({
    origin: origins,
  }),
);

// Mount route handlers under /api namespace
app.use('/api/auth', authRoutes);
app.use('/api/lobby', lobbyRoutes);
app.use('/api/referrals', referralRoutes);
app.use('/api/ton', tonRoutes);
app.use('/api/profile', profileRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

export { app };
