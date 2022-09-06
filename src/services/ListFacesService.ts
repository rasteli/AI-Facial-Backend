import { prismaClient } from "../prisma"

export class ListFacesService {
  async execute() {
    try {
      const faces = await prismaClient.face.findMany({
        orderBy: {
          user: {
            name: "asc"
          }
        },
        include: {
          user: true
        }
      })

      return { data: { faces }, code: 200 }
    } catch {
      return { data: { error: "Ops! Algo deu errado..." }, code: 500 }
    }
  }
}
