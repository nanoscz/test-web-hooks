import * as crypto from "crypto";
import { NextFunction, Request, Response } from 'express';

interface Config {
  secret: string;
}

export class GithubSha256Middleware {
  constructor(private config: Config) {
    this.config = config;
  }
  
  private verify_signature(req: Request): boolean {
    try {
      const signature = crypto
        .createHmac("sha256", this.config.secret)
        .update(JSON.stringify(req.body))
        .digest("hex");
    
      const xHubSignature = req.header("x-hub-signature-256") ?? '';

      let trusted = Buffer.from(`sha256=${signature}`, 'ascii');
      let untrusted =  Buffer.from(xHubSignature, 'ascii');
      return crypto.timingSafeEqual(trusted, untrusted);
      
    } catch (error) {
      return false;
    }
  };

  verifySignature = ( req: Request, res: Response, next: NextFunction ) => {
    if (!this.verify_signature(req)) {
      res.status(401).send("Unauthorized");
      return;
    }
    next();
  }
}