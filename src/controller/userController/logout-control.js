import { logoutService } from "../../services/userService/index.js";

const logoutControl = async (req, res, next) => {
  try {
    const processResult = await logoutService(req, res);
    return res
      .status(processResult.statusCode)
      .clearCookie("accessToken", { httpOnly: true })
      .clearCookie("refreshToken", { httpOnly: true })
      .send(processResult.message);
  } catch (err) {
    next(err);
  }
};

export default logoutControl;
