import findEmailService from "../services/find-email-service.js";

const findEmailCtrl = async (req, res, next) => {
  try {
    const { name, phone } = req.body;
    const processResult = await findEmailService(name, phone);
    return res.status(processResult.statusCode).send(processResult.message);
  } catch (err) {
    next(err);
  }
};

export default findEmailCtrl;
