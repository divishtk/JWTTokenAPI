import mongoose from "mongoose";
import { DB_NAME } from "../constants/dbName.constants.js";

const mongoConnect = async () => {
  try {
    const resp = await mongoose.connect(
      `${process.env.MONGO_DB_URL}/${DB_NAME}`
    );
    console.log(`\n MongoDB Connected!! DB HOST: ${resp.connection.host}`);
    return resp;
  } catch (err) {
    console.log("Connection issue", err);
    process.exit(1);
    throw err;
  }
};

export default mongoConnect
