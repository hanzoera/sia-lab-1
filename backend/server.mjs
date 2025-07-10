import express from 'express';
// import session from 'express-session';
import cors from 'cors';
import dotenv from 'dotenv';
// Routes
import userAuthRoutes from './routes/userAuthRoutes.mjs';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
// app.use(session({
//     secret : 
// }));

// Mount all routes in userAuthRoutes under the 'api/auth' prefix
app.use('/api/auth', userAuthRoutes);

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server is currently running on port ${port}.`);
});