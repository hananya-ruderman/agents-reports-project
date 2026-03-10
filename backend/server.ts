import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from './utils/dbConn.js';
import auth from "./routes/auth.routes.js";
import admin from "./routes/admin.routes.js"
import { createSuperAdmin } from "./dataAccess/users.dal.js";

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT || 5002;

app.use(cors());
app.use(express.json());

app.use("/auth", auth);
app.use("/admin", admin)

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