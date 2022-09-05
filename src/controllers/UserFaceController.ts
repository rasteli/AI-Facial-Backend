import { Request, Response } from "express"
import { UserFaceService } from "../services/UserFaceService"

export class UserFaceController {
  async handle(request: Request, response: Response) {
    const { user_id } = request
    const { faces } = request.body

    const service = new UserFaceService()
    const result = await service.execute(user_id, faces)

    return response.status(result.code).json(result.data)
  }
}
