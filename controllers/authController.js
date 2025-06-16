import { generateToken } from "../lib/utils.js";
import users from "../models/userModel.js";
import bcrypt from "bcryptjs";

//register / signUp controller logic//
export const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    if (!name || !email || !password || !role) {
      return res.status(400).send({ message: "All fields are required" });
    }

    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return res
        .status(406)
        .send({ message: "Account already exists.. Please login" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new users({
      name,
      email,
      password: hashedPassword,
      role,
    });

    generateToken(newUser._id, res);
    newUser.save();

    res.status(201).send({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

//login controller logic//
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await users.findOne({ email });
    if (!existingUser) {
      return res.status(400).send({ message: "Account not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (isPasswordCorrect) {
      generateToken(existingUser._id, res);
      res.status(200).send({
        _id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role,
      });
    } else {
      res.status(401).send({ message: "Incorrect email or password" });
    }
  } catch (error) {
    res.status(500).send({ message: "Interval Server Error" });
  }
};

// logout
export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
    });
    res.status(200).send({ message: "Logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

// check authorisation
export const checkAuth = async (req, res) => {
  try {
    res.status(200).send(req.user);
  } catch (error) {
    res.status(500).send({ message: "Interval Server Error" });
    console.log(error);
  }
};
