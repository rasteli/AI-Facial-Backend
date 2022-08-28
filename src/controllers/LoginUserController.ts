import { Request, Response } from "express"
import { LoginUserService } from "../services/LoginUserService"

export class LoginUserController {
  async handle(request: Request, response: Response) {
    const { login, password } = request.body

    const service = new LoginUserService()
    const result = await service.execute(login, password)

    return response.status(result.code).json(result.data)
  }
}
