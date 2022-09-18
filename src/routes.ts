import { Router } from "express"

/* User */
import { GetUserController } from "./controllers/GetUserController"
import { ListUsersController } from "./controllers/ListUsersController"
import { LoginUserController } from "./controllers/LoginUserController"
import { CreateUserController } from "./controllers/CreateUserController"
import { UpdateUserController } from "./controllers/UpdateUserController"

/* Middleware */
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated"

/* Face */
import { UserFaceController } from "./controllers/UserFaceController"
import { ListFacesController } from "./controllers/ListFacesController"

/* Reset Password */
import { ResetPasswordController } from "./controllers/ResetPasswordController"
import { RequestPasswordResetController } from "./controllers/RequestPasswordResetController"

/* Contact */
import { ContactController } from "./controllers/ContactController"

const routes = Router()

/* User */
routes.get("/users", new ListUsersController().handle)
routes.post("/login", new LoginUserController().handle)
routes.post("/signup", new CreateUserController().handle)
routes.get("/users/:id", ensureAuthenticated, new GetUserController().handle)
routes.put("/users/:id", ensureAuthenticated, new UpdateUserController().handle)

/* Face */
routes.get("/faces", new ListFacesController().handle)
routes.put(
  "/users/:id/faces",
  ensureAuthenticated,
  new UserFaceController().handle
)

/* Reset Password */
routes.put("/users/:id/password", new ResetPasswordController().handle)
routes.post("/request-reset", new RequestPasswordResetController().handle)

/* Contact */
routes.post("/contact", new ContactController().handle)

export { routes }
