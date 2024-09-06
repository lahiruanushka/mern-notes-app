import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/user";
import bcrypt from "bcrypt";

interface SignupBody {
  username?: string;
  email?: string;
  password?: string;
}

// Get authenticated user
export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
  const authenticatedUserId = req.session.userId;

  try {
    if (!authenticatedUserId) {
      throw createHttpError(401, "User not authorized");
    }

    const user = await UserModel.findById(authenticatedUserId)
      .select("email username")
      .exec();
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// User signup
export const signUP: RequestHandler<unknown, unknown, SignupBody, unknown> = async (req, res, next) => {
  const { username, email, password: passwordRaw } = req.body;

  try {
    if (!username || !email || !passwordRaw) {
      throw createHttpError(400, "Parameters missing");
    }

    const existingUsername = await UserModel.findOne({ username }).exec();
    if (existingUsername) {
      throw createHttpError(409, "Username already taken. Please choose a different one");
    }

    const existingEmail = await UserModel.findOne({ email }).exec();
    if (existingEmail) {
      throw createHttpError(409, "Email address already exists.");
    }

    const passwordHashed = await bcrypt.hash(passwordRaw, 10);

    const newUser = await UserModel.create({
      username,
      email,
      password: passwordHashed,
    });

    req.session.userId = newUser._id;
    console.log('User signed up:', req.session.userId); // Debug log
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

// User login
export const login: RequestHandler<unknown, unknown, { username?: string; password?: string }, unknown> = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      throw createHttpError(400, "Parameters missing");
    }

    const user = await UserModel.findOne({ username })
      .select("+password +email")
      .exec();
    if (!user) {
      throw createHttpError(401, "Invalid credentials");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw createHttpError(401, "Invalid Credentials");
    }

    req.session.userId = user._id;
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// User logout
export const logout: RequestHandler = (req, res, next) => {
  req.session.destroy((error) => {
    if (error) {
      next(error);
    } else {
      res.sendStatus(200);
    }
  });
};
