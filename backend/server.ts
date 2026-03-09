import express from "express"
import cors from "cors"
import { connectDB } from './utils/dbConn.js';
import auth from "./routes/auth.routes.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/auth", auth)

async function startServer() {
  try {
    await connectDB()             

    app.listen(3000, () => {       
      console.log("Server listening on port 3000")
    })
  } catch (err) {
    console.error("Failed to connect to DB", err)
    process.exit(1)
  }
}

startServer()

