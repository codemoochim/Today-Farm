import { userDeleteService } from "../../services/userService/index.js";

const userDeleteControl = async (req, res, next) => {
  try {
    const email = req.user;
    const { refreshToken } = req.cookies;
    const { password } = req.body;
    const processResult = await userDeleteService(email, password, refreshToken);

    return res
      .status(processResult.statusCode)
      .clearCookie("refreshToken", { httpOnly: true })
      .send(processResult.message);
  } catch (err) {
    next(err);
  }
};

export default userDeleteControl;
