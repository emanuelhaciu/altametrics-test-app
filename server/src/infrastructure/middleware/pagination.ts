import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class PaginationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Extract pagination parameters from query
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    
    // Validate and sanitize values
    req.query.page = Math.max(1, page).toString();
    req.query.limit = Math.min(100, Math.max(1, limit)).toString();
    
    // Add pagination info to request object for controllers to use
    req['pagination'] = {
      page,
      limit,
      skip: (page - 1) * limit
    };
    
    next();
  }
}