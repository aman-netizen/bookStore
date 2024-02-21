import express from "express";
import cors from "cors";
import userRoute from './routes/userRoute.js'
import bookRoute from './routes/bookRoute.js'
import connect from "./config/db.js";
import { config } from "dotenv";
import path from "path"
const app = express();
config({
  path: "./.env",
});

// connecting to database (Mongodb)
connect();

const PORT = process.env.PORT||8080;

app.use(cors());

//handling json data
app.use(express.json());

// handling routes
app.use("/api/user", userRoute); 
app.use("/api/book", bookRoute);

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

// listing on ports
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT} `);
});
