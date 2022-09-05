import { Request, Response } from "express"
import { ListFacesService } from "../services/ListFacesService"

export class ListFacesController {
  async handle(request: Request, response: Response) {
    const service = new ListFacesService()
    const result = await service.execute()

    return response.status(result.code).json(result.data)
  }
}
