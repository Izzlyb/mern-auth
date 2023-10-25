import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";

dotenv.config();

console.log("starting the server...")

const app = express();

mongoose.connect(process.env.MONGODB_MERN_AUTH_OS_URI)
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


app.use("/api/user/", userRoutes );
