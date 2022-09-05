import { prismaClient } from "../prisma"

export class ListFacesService {
  async execute() {
    try {
      const faces = await prismaClient.face.findMany()

      return { data: { faces }, code: 200 }
    } catch {
      return { data: { error: "Ops! Algo deu errado..." }, code: 500 }
    }
  }
}
