import { prismaClient } from "../prisma"
import { compareHash } from "../utils/bcryption"
import { signToken } from "../utils/signJSONtoken"

export class LoginUserService {
  async execute(login: string, name: string, password: string) {
    // If patter exists, it means login is an email
    // This way user can login with either their email or nickname, for instance
    const patternExists = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      login
    )

    try {
      const user = await prismaClient.user.findFirst({
        where: patternExists ? { email: login } : { nickname: login },
        include: {
          face: true
        }
      })

      if (
        user &&
        user.name === name &&
        (await compareHash(password, user.password))
      ) {
        const token = signToken(user)
        return { data: { token, user }, code: 200 }
      }

      return { data: { error: "Informação de usuário inválida." }, code: 404 }
    } catch {
      return { data: { error: "Ops! Algo deu errado..." }, code: 500 }
    }
  }
}
