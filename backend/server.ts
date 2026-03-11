import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import auth from "./routes/auth.routes.js";
import admin from "./routes/admin.routes.js"
import reports from "./routes/reports.routes.js"
import { connectDB } from './utils/dbConn.js';
import { createSuperAdmin } from "./dataAccess/users.dal.js";
import morgan from 'morgan'
import fileUploade from 'express-fileupload'

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT || 5002;

app.use(cors());
app.use(morgan('tiny'))
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(fileUploade({createParentPath: true}))


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