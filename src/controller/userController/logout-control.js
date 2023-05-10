import { logoutService } from "../../services/userService/index.js";

const logoutControl = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    const processResult = await logoutService(refreshToken);

    return res
      .status(processResult.statusCode)
      .clearCookie("refreshToken", { httpOnly: true })
      .send(processResult.message);
  } catch (err) {
    next(err);
  }
};

export default logoutControl;
