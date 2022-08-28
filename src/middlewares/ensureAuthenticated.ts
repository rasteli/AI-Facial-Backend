import { verify } from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const access_token = request.headers.authorization

  if (!access_token) {
    return response.status(401).json({ data: { error: "token.required" } })
  }

  const [, token] = access_token.split(" ")

  try {
    const { sub } = verify(token, process.env.JWT_SECRET_KEY as string)
    request.user_id = sub as string

    return next()
  } catch (error) {
    return response.status(401).json({ data: { error: "token.invalid" } })
  }
}
