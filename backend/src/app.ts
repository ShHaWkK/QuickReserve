import express from 'express';
import connectDB from './config/db';

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to Database
connectDB();

app.get('/', (req, res) => {
    res.send('Hello from QuickReserve Backend!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
