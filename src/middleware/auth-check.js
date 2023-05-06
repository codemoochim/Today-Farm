import jwt from "jsonwebtoken";

export const validateUser = async (req, res, next) => {
  const { accessToken } = req.cookies;
  if (!accessToken) return res.status(401).send("Unauthorized access");
  try {
    const decoded = await jwt.verify(accessToken, "secret");
    req.user = decoded.email;
    next();
  } catch (err) {
    res.status(403).send("Forbidden access");
  }
};
