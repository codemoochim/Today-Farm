import { changePwdService } from "../../services/userService/index.js";

const changePwdControl = async (req, res, next) => {
  try {
    const email = req.user;
    const { currentPwd, newPwd } = req.body;
    const processResult = await changePwdService(email, currentPwd, newPwd);
    res.status(processResult.statusCode).send(processResult.message);

    return;
  } catch (err) {
    next(err);
  }
};

export default changePwdControl;
