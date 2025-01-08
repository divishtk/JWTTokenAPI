import { apiErrors } from "../utils/apiErrors.js";
import { User } from "../models/users.models.js";
import { asyncHander } from "../utils/asyncHandler.js";
import uploadOncloudinary from "../utils/cloudinary.js";
import generateJwtToken from "../models/users.models.js";

const registerUser = asyncHander(async (req, resp) => {
  const { userID, email } = req.body;

  console.log(req.body);

  if ([userID, email].some((fields) => fields?.trim() === "")) {
    throw apiErrors(404, "All fields required");
  }

  const existedUser = await User.findOne({
    $or: [{ userID }, { email }],
  });

  if (existedUser) {
    throw new apiErrors(401, "User with email/username already exists");
  }

  const frontPicPath = req.files?.frontPic[0]?.path;
  if (!frontPicPath) throw new apiErrors(400, "Front pic file mandatory");

  const uploadFrontPic = await uploadOncloudinary(frontPicPath);
  if (!uploadFrontPic) throw new apiErrors(400, "Front Pic required");

  const thubnailPath = req.files?.thumbnail[0]?.path;
  const uploadThumbnail = await uploadOncloudinary(thubnailPath);

  const userData = {
    userID,
    email,
    frontPic: uploadFrontPic?.url,
    thumbnail: uploadThumbnail?.url || "",
  };

  console.log("data", userData);

  const generatedToken = generateJwtToken(userData.userID);
  console.log(generatedToken);
  if (!generatedToken) {
    throw new apiErrors(401, "Token not generated");
  }

  const userInstance = await User.create({
    ...userData,
  });

  //need to check if  values came in DB or not
  const userCheckinDB = await User.findById(userInstance._id);
  if (!userCheckinDB)
    throw new apiErrors(
      500,
      "Somwthing went wrong while registeration of user"
    );

  console.log("USER DB", userCheckinDB);

  //console.log("Front cloudinary", uploadFrontPic);
  //console.log("Thumbnail cloudinary", uploadThumbnail);

  return resp.status(201).json({
    data: userCheckinDB,
    token: generatedToken,
    message: "Successfully user created",
  });
});

const loginUser = asyncHander(async (req, resp, next) => {
  try {
    const { userID, email } = req.body;

    console.log("re", req.body);

    if (!userID && !email) {
      throw new apiErrors(400, "Username or email is required");
    }

    // const userCheck = await User.findOne({
    //   $or: [{ userID }, { email }],
    // });

    const uId = await User.findOne({ userID, email });
    if (!uId) throw new apiErrors(404, "User or email does not exists");

    //generate token
    const loginPayload = {
      uId,
      email: uId.email,
    };

    const token = generateJwtToken(loginPayload);

    return resp.status(201).json({
      token: token,
      message: "Login Sucessfully",
    });
  } catch (error) {
    console.log("er", error);
    resp.status(500).json({
      error: error.message,
    });
  }
});

const getAllUsers = asyncHander(async (req, resp) => {
  try {
    const allUsers = await User.find();
    return resp.status(200).json({
      allUsers,
    });
  } catch (error) {
    return resp.status(400).json({
      message: "Users not found",
    });
  }
});

const checkProfile = asyncHander(async (req, resp) => {
  try {
    const currentUser = req.decodedPaylaod;
    console.log(currentUser);

    const userId = currentUser.uId._id;
    console.log('user',userId)

    const user = await User.findById(userId);
    console.log('d',user);
    resp.status(200).json({
      data: user,
    });
  } catch (error) {
    return resp.status(401).json({
      message: "Users not found",
    });
  }
});

export { registerUser, loginUser, getAllUsers, checkProfile };
