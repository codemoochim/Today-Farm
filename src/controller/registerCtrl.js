import registerSrvc from "../services/registerSrvc.js";

const registerCtrl = async (req, res, next) => {
  try {
    console.log(req.body);
    const { email, password, phone, name } = req.body;
    const processResult = await registerSrvc(email, password, phone, name);
    return res.status(processResult.statusCode).send(processResult.message);
  } catch (err) {
    next(err);
  }
};

export default registerCtrl;
