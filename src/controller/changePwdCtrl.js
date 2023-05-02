import changePwdSrvc from "../services/changePwdSrvc.js";

const changePwdCtrl = async (req, res, next) => {
  try {
    const { currentPwd, newPwd } = req.body;
    const { token } = req.cookies.token;
    const processResult = await changePwdSrvc(token, currentPwd, newPwd);
    return res.status(processResult.status).send(processResult.message);
  } catch (err) {
    next(err);
  }
};

export default changePwdCtrl;
