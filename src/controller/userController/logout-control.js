import { logoutService } from "../../services/userService/index.js";

const logoutControl = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    const processResult = await logoutService(refreshToken);
    const cookieOptions = {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 2880000,
    };
    res.status(processResult.statusCode).clearCookie("refreshToken", cookieOptions).send(processResult.message);

    return;
  } catch (err) {
    next(err);
  }
};

export default logoutControl;
