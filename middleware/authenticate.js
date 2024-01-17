import jwt from "jsonwebtoken";
import HttpError from "../helpers/HttpError.js";
import User from "../models/User.js";
import "dotenv/config";
const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers; 
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    return next(HttpError(401));
  }

  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);
    if (!user || !user.token) {
    return next(HttpError(401));
    }
    req.user = user;
    next();
  } catch (err) {
    return next(HttpError(401, err.message));
  }
};

export default authenticate;
