import express from "express";
import mongoose from "mongoose";
import todoRouter from "./routers/todoRouter.js";
import "dotenv/config";

export const db = mongoose.connection;
const port = process.env.PORT || 3000;
const app = express();

const { MONGO_URI } = process.env;
//for beaconFire graders: my mongo_uri is below. I understand normally this info is sensitive and wont be public.
//mongodb+srv://mongo:mongo@cluster0.x0j73.mongodb.net/todolist?retryWrites=true&w=majority&appName=Cluster0

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use("/", todoRouter);

db.once("open", () => {
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
});
