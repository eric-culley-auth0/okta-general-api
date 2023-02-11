// Dependencies
import express, {Request, Response, NextFunction} from 'express';
import dotenv from 'dotenv';

// Setup Server
const app = express();
dotenv.config();
const port = process.env.PORT || 4000;

/**********
 * Routes
 * ********/

// Home health check
app.get('/', (req, res) => {
  res.status(200).json({app: "Okta General API", health: "OK"})
})

app.listen(port, () => {
    console.log('API Magic happening on port ' + port)
});