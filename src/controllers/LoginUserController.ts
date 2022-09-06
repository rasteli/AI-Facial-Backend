import { Request, Response } from "express"
import { LoginUserService } from "../services/LoginUserService"

export class LoginUserController {
  async handle(request: Request, response: Response) {
    const { login, name, password } = request.body

    const service = new LoginUserService()
    const result = await service.execute(login, name, password)

    return response.status(result.code).json(result.data)
  }
}
