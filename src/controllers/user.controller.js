import { asynchandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/apierror.js";
import { User } from "../models/user.models.js";
import { uploadoncloudinary } from "../utils/cloudnary.js";
import { Apires } from "../utils/Apires.js";

const registerUser = asynchandler(async (req, res) => {
  // get user details from frontend ya postman
  // validation
  // cheak user already user rwegister to nh iha
  // uplad them cludnary
  // create user in db
  //   remove password token field
  // cheak user creation success or not
  //  send response to frontend

  const { fullname, email, password, username } = req.body;
  console.log(
    "fullname",
    fullname,
    "email",
    email,
    "password",
    password,
    "username",
    username
  );

  if (
    [fullname, email, password, username].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }
  const exitedUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (exitedUser) {
    throw new ApiError(409, "user already registered");
  }

  console.log(req.files)

  const avatarloclapath = req.files?.avatar[0]?.path;
  const coverimgloclapath = req.files?.coverImage[0]?.path;

  if (!avatarloclapath) {
    throw new ApiError(400, "avatar is required");
  }
  if (!coverimgloclapath) {
    throw new ApiError(400, "cover is required");
  }
  const avatar = await uploadoncloudinary(avatarloclapath);
  const cover = await uploadoncloudinary(coverimgloclapath);

  if (!avatar) {
    throw new ApiError(400, "Avatar is required");
  }

  const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: cover.url, 
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "user creation failed");
  }

  return res
    .status(201)
    .json(new Apires(200, createdUser, "User registed successfully"));
});

export { registerUser };
