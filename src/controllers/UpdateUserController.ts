import { Request, Response } from "express"
import { UpdateUserService } from "../services/UpdateUserService"

export class UpdateUserController {
  async handle(request: Request, response: Response) {
    const { user_id } = request
    const { update } = request.body

    const service = new UpdateUserService()
    const result = await service.execute(user_id, update)

    return response.status(result.code).json(result.data)
  }
}
