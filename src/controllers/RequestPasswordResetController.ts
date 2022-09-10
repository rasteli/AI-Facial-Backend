import { Request, Response } from "express"
import { RequestPasswordResetService } from "../services/RequestPasswordResetService"

export class RequestPasswordResetController {
  async handle(request: Request, response: Response) {
    const { email } = request.body

    const service = new RequestPasswordResetService()
    const result = await service.execute(email)

    return response.status(result.code).json(result.data)
  }
}
