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
    birthDate: string
  ) {
    const userEmail = await prismaClient.user.findFirst({
      where: {
        email
      }
    })
    const userPhone = await prismaClient.user.findFirst({
      where: {
        phone
      }
    })
    const userNickname = await prismaClient.user.findFirst({
      where: {
        nickname
      }
    })

    if (!userEmail && !userPhone && !userNickname) {
      try {
        const user = await prismaClient.user.create({
          data: {
            name,
            email,
            phone,
            gender,
            nickname,
            birthDate,
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
      data: { error: "Informações já estão sendo usadas por outra conta." },
      code: 403
    }
  }
}
