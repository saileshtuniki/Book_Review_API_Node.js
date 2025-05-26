

import { RequestHandler  } from 'express';
import jwt from 'jsonwebtoken';

// interface AuthRequest extends Request {
//   user?: {id: number};
// }


export const authMiddleware: RequestHandler = (req, res, next) => {
  
  const header = req.headers.authorization;

  if (!header?.startsWith('Bearer')) {
    res.status(401).json({ message: 'Unauthorized: No token provided' });
    return;
  }

  const token = header.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {id: number};
    // attach to req in a type-safe way (see step 3)
    // (req as AuthRequest).user = {id: decoded.userId};
    (req as any).user = decoded;
    console.log('Decoded JWT payload ▶', decoded);

    // req.user = decoded;
    next();
  } catch {
     res.status(401).json({ message: 'Unauthorized: Invalid token' });
     return;
    
  }
};
export default authMiddleware;
