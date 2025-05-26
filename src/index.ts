import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.routes'
import reviewRoutes from './routes/review.routes';
import bookRoutes from './routes/book.routes';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());


app.use('/api', bookRoutes);
app.use('/api', reviewRoutes);
app.use('/api/auth', authRoutes);

app.listen(process.env.PORT || 5000, ()=>{
    console.log(`Server running on port: ${process.env.PORT}`);
});

