import { Request, Response } from "express"
import { GetUserService } from "../services/GetUserService"

export class GetUserController {
  async handle(request: Request, response: Response) {
    const { user_id } = request

    const service = new GetUserService()
    const result = await service.execute(user_id)

    return response.status(result.code).json(result.data)
  }
}
