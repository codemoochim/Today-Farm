import findEmailSrvc from "../services/findEmailSrvc.js";

const findEmailCtrl = async (req, res, next) => {
  try {
    const processResult = await findEmailSrvc();
    return res.status(processResult.status).send(processResult.message);
  } catch (err) {
    next(err);
  }
};

export default findEmailCtrl;
