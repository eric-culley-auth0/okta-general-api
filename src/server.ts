// Dependencies
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { authenticationRequired } from './authMiddleware';

// Setup Server
const app = express();
dotenv.config();
app.use(express.urlencoded({extended: true})); 
app.use(express.json()); 
app.use(cors());
const port = process.env.PORT || 4000;

/**********
 * Routes
 * ********/

// Home health check
app.get('/', (req: Request, res: Response) => {
    res.status(200).json({app: "Okta General API", health: "OK"})
})

// Protected Route
app.get('/protected', authenticationRequired, (req, res) => {
    const secretData = {
        source: 'Okta General API',
        protected: true,
        issuedAt: Date.now(),
        data: 'Sea otters hold hands when they sleep because it keeps them from floating away from each other in the night.'
    }
    res.status(200).json(secretData)
})

// Listening
app.listen(port, () => {
    console.log('API Magic happening on port ' + port)
});