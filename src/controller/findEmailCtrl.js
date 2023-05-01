import findEmailSrvc from "../services/findEmailSrvc.js";

const findEmailCtrl = async (req, res, next) => {
  try {
    const { name, phone } = req.body;
    const processResult = await findEmailSrvc(name, phone);
    return res.status(processResult.status).send(processResult.message);
  } catch (err) {
    next(err);
  }
};

export default findEmailCtrl;
