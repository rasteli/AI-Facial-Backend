import { prismaClient } from "../prisma"
import { hashPassowrd } from "../utils/bcryption"
import { signToken } from "../utils/signJSONtoken"

export class CreateUserService {
  async execute(
    name: string,
    email: string,
    phone: string,
    gender: string,
    password: string,
    nickname: string,
    birth_date: Date
  ) {
    let user = await prismaClient.user.findFirst({
      where: {
        email
      }
    })

    if (!user) {
      try {
        user = await prismaClient.user.create({
          data: {
            name,
            email,
            phone,
            gender,
            nickname,
            birth_date,
            password: await hashPassowrd(password)
          }
        })

        const token = signToken(user)
        return { data: { token, user }, code: 200 }
      } catch {
        return { data: { error: "Ops! Algo deu errado..." }, code: 500 }
      }
    }

    return {
      data: { error: "Email já está sendo usado por outra conta." },
      code: 403
    }
  }
}
