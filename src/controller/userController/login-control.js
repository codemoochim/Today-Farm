import { login } from "../../services/userService/index.js";

const loginControl = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const processResult = await login(email, password);
    return res
      .status(processResult.statusCode)
      .cookie("accessToken", processResult.accessToken, { httpOnly: true })
      .cookie("refreshToken", processResult.refreshToken, { httpOnly: true })
      .send(processResult.message);
  } catch (err) {
    next(err);
  }
};

export default loginControl;
