import { registerService } from "../../services/userService/index.js";

const registerControl = async (req, res, next) => {
  try {
    const { email, password, phone, name } = req.body;
    const processResult = await registerService(email, password, phone, name);
    return res.status(processResult.statusCode).send(processResult.message);
  } catch (err) {
    next(err);
  }
};

export default registerControl;
