import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import auth from "./routes/auth.routes.js";
import admin from "./routes/admin.routes.js"
import reports from "./routes/reports.routes.js"
import { connectDB } from './utils/dbConn.js';
import { createSuperAdmin } from "./dataAccess/users.dal.js";
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import fileUploade from 'express-fileupload'
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT || 5002;

const allowedUrls = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5174"]

const corsOptions = {origin(origin: any, callback: any){
  if (!origin){
    return callback(null, true)
  }
  if (allowedUrls.includes(origin)){
    return callback(null, true)
  }
  return callback(new Error("Access for this url is not allowed"))
}, credentials: true}

app.use(cookieParser()) 
app.use(cors(corsOptions));
app.use(morgan('tiny'))
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(fileUploade({createParentPath: true}))
app.use("/uploads", express.static(path.join(__dirname, "uploads")));



app.use("/auth", auth);
app.use("/admin", admin)
app.use("/reports", reports)

async function startServer() {
  try {
    await connectDB();
    console.log("Connected to DB");
    createSuperAdmin().catch(err => console.error(err));


    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (err) {
    console.error("Failed to connect to DB", err);
    process.exit(1);
  }
}

await startServer();