// backend/src/app.ts
import express from 'express';
import connectDB from './config/db';
import userRoutes from './routes/userRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Middleware for JSON parsing

connectDB();

// Routes
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Hello from QuickReserve Backend!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
