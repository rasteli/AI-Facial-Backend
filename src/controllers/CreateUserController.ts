import { Request, Response } from "express"
import { CreateUserService } from "../services/CreateUserService"

export class CreateUserController {
  async handle(request: Request, response: Response) {
    const { name, nickname, email, password, phone, gender, birthDate } =
      request.body

    const service = new CreateUserService()
    const result = await service.execute(
      name,
      email,
      phone,
      gender,
      password,
      nickname,
      birthDate
    )

    return response.status(result.code).json(result.data)
  }
}
