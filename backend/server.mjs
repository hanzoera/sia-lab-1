import express from 'express';
import session from 'express-session';
import cors from 'cors';
import dotenv from 'dotenv';
// Routes
import userAuthRoutes from './routes/userAuthRoutes.mjs';
import inventoryRoutes from './routes/inventoryRoutes.mjs';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(session({
    secret : process.env.SECRET_KEY,
    saveUninitialized : 'false',
    resave : 'false',
    cookie : {
        maxAge : 60000 * 60
    }
}));

// Mount all routes under a prefix
//
// app.use('/', userAuthRoutes);
// User authentication routes
app.use('/api/auth', userAuthRoutes);
// Inventory routes
app.use('/api/inventory', inventoryRoutes);

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server is currently running on port ${port}.`);
});