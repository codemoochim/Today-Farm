import { loginService } from "../../services/userService/index.js";

const loginControl = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const processResult = await loginService(email, password);
    const cookieOptions = {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 2880000,
    };
    res
      .status(processResult.statusCode)
      .cookie("refreshToken", processResult.refreshToken, cookieOptions)
      .json({ auth: processResult.accessToken, message: processResult.message });

    return;
  } catch (err) {
    next(err);
  }
};

export default loginControl;
