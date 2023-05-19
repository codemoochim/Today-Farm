import { logoutService } from "../../services/userService/index.js";

const logoutControl = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    const processResult = await logoutService(refreshToken);
    const maxAge = 1000 * 60 * 60 * 24 * 14; // 14일
    const cookieOptions = {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge,
    };
    res.status(processResult.statusCode).clearCookie("refreshToken", cookieOptions).send(processResult.message);

    return;
  } catch (err) {
    next(err);
  }
};

export default logoutControl;
