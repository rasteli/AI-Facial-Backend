import { prismaClient } from "../prisma"

export class GetUserService {
  async execute(user_id: string) {
    try {
      const user = await prismaClient.user.findFirst({
        where: {
          id: user_id
        }
      })

      if (user) {
        return { data: { user }, code: 200 }
      }

      return { data: { error: "Usuário não pôde ser encontrado." }, code: 404 }
    } catch {
      return { data: { error: "Ops! Algo deu errado..." }, code: 500 }
    }
  }
}
