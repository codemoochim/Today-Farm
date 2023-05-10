import { findPwdService } from "../../services/userService/index.js";

const findPwdControl = async (req, res, next) => {
  try {
    const { email, phone } = req.body;
    const processResult = await findPwdService(email, phone);

    return res.status(processResult.statusCode).send(processResult.message);
  } catch (err) {
    next(err);
  }
};

export default findPwdControl;
