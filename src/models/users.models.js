import mongoose from "mongoose";
import jwt from "jsonwebtoken";


const UserSchema = new mongoose.Schema({

    userID: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    frontPic: {
        type: String, //cloudinary url
    },
    thumbnail: {
        type: String, //cloudinary url
    },
})
const generateJwtToken = (userData) => {

    //console.log('dd',userData);

    return jwt.sign(
        userData,
        process.env.JWT_TOKEN_SECRET,
        {
            expiresIn : process.env.JWT_TOKEN_EXPIRY
        }
    )

}


export default generateJwtToken;


export const User = mongoose.model("User", UserSchema);