import "dotenv/config"

import cors from "cors"
import http from "http"
import express from "express"

import { routes } from "./routes"

const app = express()
const server = http.createServer(app)

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    preflightContinue: true
  })
)
app.options("*", cors())
app.use(express.json())
app.use(routes)

export { server }
