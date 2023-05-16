import { loginService } from "../../services/userService/index.js";

const loginControl = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const processResult = await loginService(email, password);
    res
      .status(processResult.statusCode)
      .cookie("refreshToken", processResult.refreshToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 2880000,
      })
      .json({ auth: processResult.accessToken, message: processResult.message });

    return;
  } catch (err) {
    next(err);
  }
};

export default loginControl;
