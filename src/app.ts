import "dotenv/config"

import cors from "cors"
import http from "http"
import express from "express"

import { routes } from "./routes"

const app = express()
const server = http.createServer(app)

app.use(cors())
app.use(express.json())
app.use(routes)

export { server }
