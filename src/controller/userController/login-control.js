import { login } from "../../services/userService/index.js";

const loginControl = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const processResult = await login(email, password);
    res
      .status(processResult.statusCode)
      .cookie("refreshToken", processResult.refreshToken, { httpOnly: true })
      .json({ data: processResult.accessToken, message: processResult.message });

    return;
  } catch (err) {
    next(err);
  }
};

export default loginControl;
