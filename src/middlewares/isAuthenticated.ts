import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

export default (req: Request, res: Response, next: NextFunction) => {

  const authorization: string = req.headers.authorization!

  if (!authorization) {
    return res.status(403).json({ // Forbidden
      success: false,
      message: 'No token was provided'
    })
  }

  try {
    jwt.verify(authorization.split('Bearer ')[1], 'secret')
    next()
  } catch (err: any) {
    return res.status(401).json({ // Unauthorized
      success: false,
      message: err.message
    })
  }
}
