import { prismaClient } from "../prisma"
import { removeEmptyFromObject } from "../utils/removeEmptyFromObject"

interface Update {
  name?: string
  email?: string
  nickname?: string
  phone?: string
  password?: string
  gender?: string
  birthData?: string
}

export class UpdateUserService {
  async execute(user_id: string, update: Update) {
    const data = removeEmptyFromObject(update)

    try {
      const user = await prismaClient.user.update({
        where: {
          id: user_id
        },
        data
      })

      return { data: { user }, code: 200 }
    } catch {
      return { data: { error: "Ops! Algo deu errado..." }, code: 500 }
    }
  }
}
