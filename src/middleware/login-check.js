import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const isLoggedIn = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    next();
    return;
  }
  try {
    const [authType, accessToken] = authHeader?.split(" ");

    if (authType === ("Bearer" || "bearer") || accessToken) {
      jwt.verify(accessToken, process.env.JWT_SECRET, (err, decoded) => {
        if (decoded) {
          res.status(401).send("Already logged In");
        } else {
          next();
        }
      });
    }
  } catch (err) {
    next();
  }
};
