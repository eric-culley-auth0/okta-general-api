// Dependencies
import express, {Request, Response, NextFunction} from 'express';
import dotenv from 'dotenv';

// Setup Server
const app = express();
dotenv.config();
const port = process.env.PORT || 4000;

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
    console.log('API Magic happening on port ' + port)
});