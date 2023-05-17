import { userDeleteService } from "../../services/userService/index.js";

const userDeleteControl = async (req, res, next) => {
  try {
    const email = req.user;
    const { refreshToken } = req.cookies;
    const { password } = req.body;
    const processResult = await userDeleteService(email, password, refreshToken);
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

export default userDeleteControl;
