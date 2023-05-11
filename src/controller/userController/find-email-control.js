import { findEmailService } from "../../services/userService/index.js";
import { checkRequiredParams } from "../../utils/check-required-params.js";

const findEmailControl = async (req, res, next) => {
  try {
    const { name, phone } = req.body;
    const processResult = await findEmailService(name, phone);
    res.status(processResult.statusCode).send(processResult.message);

    return;
  } catch (err) {
    next(err);
  }
};

export default findEmailControl;
