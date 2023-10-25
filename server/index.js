import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";

dotenv.config();

console.log("starting the server...")

const app = express();

app.use(express.json())

mongoose.connect( process.env.MONGODB_DATABASE_TH_URI )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch( (error) => {
    console.log(error);
  });

const PORT = 5000;

app.listen(PORT, () => { 
  console.log(`Server listening on ${PORT}`);
});

app.get("/", (req, res) => {
  res.json({
    message: "Working on Web Development",
  });
});


app.use("/api/user/", userRoute );

app.use("/api/auth/", authRoute );

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 409;
  const message = err.message || "Conflict with Request";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode
  })  
})


