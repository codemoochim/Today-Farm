import changePwdService from "../services/change-pwd-service.js";

const changePwdCtrl = async (req, res, next) => {
  try {
    const { currentPwd, newPwd } = req.body;
    const { token } = req.cookies.token;
    const processResult = await changePwdService(token, currentPwd, newPwd);
    return res.status(processResult.statusCode).send(processResult.message);
  } catch (err) {
    next(err);
  }
};

export default changePwdCtrl;
