import { Router } from "express"

/* User */
import { GetUserController } from "./controllers/GetUserController"
import { ListUsersController } from "./controllers/ListUsersController"
import { LoginUserController } from "./controllers/LoginUserController"
import { CreateUserController } from "./controllers/CreateUserController"

/* Middleware */
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated"

const routes = Router()

/* User */
routes.get("/users", new ListUsersController().handle)
routes.post("/login", new LoginUserController().handle)
routes.post("/signup", new CreateUserController().handle)
routes.get("/user", ensureAuthenticated, new GetUserController().handle)

export { routes }
