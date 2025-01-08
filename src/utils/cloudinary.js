import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadOncloudinary = async (localpath) => {
  try {
    if (!localpath) return null;

    const res = await cloudinary.uploader.upload(localpath, {
      resource_type: "auto",
    });

    fs.unlinkSync(localpath); //removed the locally saved temp files as upload op failed
   // console.log("path", localpath);
  //  console.log("File uploaded on cloduinary", res);
    return res;
  } catch (err) {
    fs.unlinkSync("Local file path", localpath); //removed the locally saved temp files as upload op failed
    console.log(err);
  }
};

export default uploadOncloudinary;