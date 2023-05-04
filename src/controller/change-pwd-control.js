import changePwdService from "../services/change-pwd-service.js";

const changePwdCtrl = async (req, res, next) => {
  try {
    const { token } = req.cookies.token;
    const { currentPwd, newPwd } = req.body;
    const processResult = await changePwdService(token, currentPwd, newPwd);
    return res.status(processResult.statusCode).send(processResult.message);
  } catch (err) {
    next(err);
  }
};

export default changePwdCtrl;
