import jwt from "jsonwebtoken";

import User from "../models/User.js";

const optionalAuth = async (
  req,
  res,
  next
) => {
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith(
        "Bearer"
      )
    ) {
      const token =
        req.headers.authorization.split(
          " "
        )[1];

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      req.user =
        await User.findById(
          decoded.id
        ).select("-password");
    }

    next();
  } catch (error) {
    next();
  }
};

export default optionalAuth;