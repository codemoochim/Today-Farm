import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

import { Unauthorized } from "../errors/index.js";
import { issuingToken, checkRefreshAndIssueAccess } from "../utils/auth/index.js";

export const issuingAccessToken = async (req, res, next) => {
  const { refreshToken } = req.cookies;
  try {
    const { newAccessToken, email } = await checkRefreshAndIssueAccess(refreshToken);

    res.locals.token = newAccessToken;
    req.user = email;

    next();
  } catch (err) {
    next(err);
  }
};
