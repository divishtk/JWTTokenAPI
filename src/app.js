import express from "express";
import userRouter from "./routes/user.route.js";

const app = express();
app.use(express.static("./public/tmp/images"));
app.use(express.urlencoded({ extended: true })); // Parses form data
app.use(
    express.json()
  );

  app.use("/api/v1/users", userRouter);

  export { app };

// app.use((req, res, next) => {
//   console.log("Incoming request:", req.method, req.path, req.headers);
//   next();
// });



