import { registerService } from "../../services/userService/index.js";

const registerControl = async (req, res, next) => {
  try {
    const { email, password, phone, name } = req.body;
    const processResult = await registerService(email, password, phone, name);
    const cookieOptions = {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 14, // 14일
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

export default registerControl;
