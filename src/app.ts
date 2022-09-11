import "dotenv/config"

import cors from "cors"
import http from "http"
import express from "express"

import { routes } from "./routes"

const app = express()
const server = http.createServer(app)

app.use(
  cors({
    allowedHeaders: ["authorization", "Content-Type"], // you can change the headers
    exposedHeaders: ["authorization"], // you can change the headers
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    origin: process.env.CORS_ORIGIN
  })
)
app.use(express.json())
app.use(routes)

export { server }
