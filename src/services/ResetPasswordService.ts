import { prismaClient } from "../prisma"
import { compareHash, hashPassowrd } from "../utils/bcryption"

export class ResetPasswordService {
  async execute(user_id: string, password: string, resetToken: string) {
    try {
      let user = await prismaClient.user.findFirst({
        where: {
          id: user_id
        }
      })

      if (user && (await compareHash(resetToken, user.token as string))) {
        user = await prismaClient.user.update({
          where: {
            id: user_id
          },
          data: {
            token: null,
            password: await hashPassowrd(password)
          },
          include: {
            face: true
          }
        })

        return { data: { user }, code: 200 }
      }

      return { data: { error: "Informação de usuário inválida." }, code: 401 }
    } catch {
      return { data: { error: "Ops! Algo deu errado..." }, code: 500 }
    }
  }
}
