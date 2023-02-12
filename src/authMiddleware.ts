import { Request, Response, NextFunction } from "express";
import OktaJwtVerifier from '@okta/jwt-verifier';
import dotenv from 'dotenv'
dotenv.config();


// Authoriztion configuration
const oktaDomain = process.env.OKTA_DOMAIN;
const oktaJwtVerifier = new OktaJwtVerifier({
    issuer: `https://${oktaDomain}/oauth2/default`
});
const audience = 'api://default';

// export interface RequestWithJwt extends Request {
//     jwt: OktaJwtVerifier.Jwt
// }

export const authenticationRequired = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader= req.headers.authorization || '';
    const match = authHeader.match(/Bearer (.+)/);
    if (!match) {
      return res.status(401).send("Unauthorized");
    }
  
    try {
      const accessToken = match[1];
      if (!accessToken) {
          return res.status(401).send('Not authorized');
        }
      req.jwt = await oktaJwtVerifier.verifyAccessToken(accessToken, audience);
      next();
    } catch (err: any) {
      return res.status(401).send(err.message);
    }
};