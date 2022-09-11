import "dotenv/config"

import cors from "cors"
import http from "http"
import express from "express"

import { routes } from "./routes"

const app = express()
const server = http.createServer(app)

const corsOptions = {
  origin: "https://aifacial.vercel.app",
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
  preflightContinue: true
}

app.use(cors(corsOptions))
app.options("*", cors(corsOptions))
app.use(express.json())
app.use(routes)

export { server }
