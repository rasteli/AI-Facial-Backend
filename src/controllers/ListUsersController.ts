import { Request, Response } from "express"
import { ListUsersService } from "../services/ListUsersService"

export class ListUsersController {
  async handle(request: Request, response: Response) {
    const service = new ListUsersService()
    const result = await service.execute()

    return response.status(result.code).json(result.data)
  }
}
