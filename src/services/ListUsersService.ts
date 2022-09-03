import { prismaClient } from "../prisma"

export class ListUsersService {
  async execute() {
    try {
      const users = await prismaClient.user.findMany()

      return { data: { users }, code: 200 }
    } catch {
      return { data: { error: "Ops! Algo deu errado..." }, code: 500 }
    }
  }
}
