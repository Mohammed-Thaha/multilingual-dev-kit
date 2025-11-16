import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { translateProfile } from './translate.js';
import { shareRouter } from './share.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/share', shareRouter);

// Simple AI enhancement endpoint
  // AI enhancement feature removed.

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'LingoCard API is running' });
});

// Translation route
app.post('/api/translate', translateProfile);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 LingoCard API server running on http://localhost:${PORT}`);
  console.log(`📡 Translation endpoint: http://localhost:${PORT}/api/translate`);
  console.log(`// AI enhancement endpoint removed.`);
});

export default app;
