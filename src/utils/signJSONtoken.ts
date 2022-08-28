import { User } from "@prisma/client"
import { sign } from "jsonwebtoken"

export function signToken(user: User) {
  return sign({ user }, process.env.JWT_SECRET_KEY as string, {
    subject: user.id,
    expiresIn: "1d"
  })
}
