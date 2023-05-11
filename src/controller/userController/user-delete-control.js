import { userDeleteService } from "../../services/userService/index.js";

const userDeleteControl = async (req, res, next) => {
  try {
    const email = req.user;
    const { refreshToken } = req.cookies;
    const { password } = req.body;
    const processResult = await userDeleteService(email, password, refreshToken);
    res
      .status(processResult.statusCode)
      .clearCookie("refreshToken", { httpOnly: true, sameSite: "none", secure: true })
      .send(processResult.message);

    return;
  } catch (err) {
    next(err);
  }
};

export default userDeleteControl;
