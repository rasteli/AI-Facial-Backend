import { prismaClient } from "../prisma"

export class UserFaceService {
  async execute(user_id: string, faces: string) {
    try {
      const user = await prismaClient.user.update({
        where: {
          id: user_id
        },
        data: {
          face: {
            create: {
              face: faces
            }
          }
        },
        include: {
          face: true
        }
      })

      return { data: { user }, code: 201 }
    } catch {
      return { data: { error: "Ops! Algo deu errado..." }, code: 500 }
    }
  }
}
