import findPwdSrvc from "../services/findPwdSrvc.js";

const findPwdCtrl = async (req, res, next) => {
  try {
    const { email, phone } = req.body;
    const processResult = await findPwdSrvc(email, phone);
    return res.status(processResult.status).send(processResult.message);
  } catch (err) {
    next(err);
  }
};

export default findPwdCtrl;
