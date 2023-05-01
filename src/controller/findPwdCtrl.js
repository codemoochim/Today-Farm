import findPwdSrvc from "../services/findEmailSrvc.js";

const findPwdCtrl = async (req, res, next) => {
  try {
    const processResult = await findPwdSrvc();
    return res.status(processResult.status).send(processResult.message);
  } catch (err) {
    next(err);
  }
};

export default findPwdCtrl;
