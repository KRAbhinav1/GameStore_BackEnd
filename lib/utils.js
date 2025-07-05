import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true, // required for cross-site cookies
    sameSite: "none", // allows cookie to be included in cross-site requests
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  return token;
};
