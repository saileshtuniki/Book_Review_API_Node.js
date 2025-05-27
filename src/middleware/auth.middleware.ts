import { RequestHandler  } from 'express';
import jwt from 'jsonwebtoken';


export const authMiddleware: RequestHandler = (req, res, next) => {
  
  const header = req.headers.authorization;

  if (!header?.startsWith('Bearer')) {
    res.status(401).json({ message: 'Unauthorized: No token provided' });
    return;
  }

  const token = header.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {id: number};
    (req as any).user = decoded;
    next();
  } catch {
     res.status(401).json({ message: 'Unauthorized: Invalid token' });
     return;
    
  }
};
export default authMiddleware;
