import { logoutService } from "../../services/userService/index.js";

const logoutControl = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    const processResult = await logoutService(refreshToken);
    res
      .status(processResult.statusCode)
      .clearCookie("refreshToken", { httpOnly: true, sameSite: "none", secure: true })
      .send(processResult.message);

    return;
  } catch (err) {
    next(err);
  }
};

export default logoutControl;
