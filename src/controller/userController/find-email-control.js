import { findEmailService } from "../../services/userService/index.js";
import { checkRequiredParams } from "../../utils/check-required-params.js";

const findEmailControl = async (req, res, next) => {
  try {
    const requestParams = ["name", "phone"];

    if (!checkRequiredParams(req.body, requestParams)) {
      res.status(400).send("Required parameter(s) missing");

      return;
    }

    const { name, phone } = req.body;
    const processResult = await findEmailService(name, phone);

    return res.status(processResult.statusCode).send(processResult.message);
  } catch (err) {
    next(err);
  }
};

export default findEmailControl;
