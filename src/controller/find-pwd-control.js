import findPwdService from "../services/find-pwd-service.js";

const findPwdCtrl = async (req, res, next) => {
  try {
    const { email, phone } = req.body;
    const processResult = await findPwdService(email, phone);
    return res.status(processResult.status).send(processResult.message);
  } catch (err) {
    next(err);
  }
};

export default findPwdCtrl;
