import express from "express";
import dotenv from "dotenv";
import mongoConnect from "./db/mongo.db.js";
import { app } from "./app.js";

dotenv.config({
  path: "./.env",
});

// const app = express();

// app.get("/", (req, resp) => {
//   resp.send("Helllo");
// });

mongoConnect()
  .then(() => {
    app.listen(process.env.PORT || 6969, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Mongo Connection failed", err);
  });



  //create schema->middleware->