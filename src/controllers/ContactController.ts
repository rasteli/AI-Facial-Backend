import { Request, Response } from "express"
import { ContactService } from "../services/ContactService"

export class ContactController {
  async handle(request: Request, response: Response) {
    const { email, subject, description } = request.body

    const service = new ContactService()
    const result = await service.execute(email, subject, description)

    return response.status(result.code).json(result.data)
  }
}
