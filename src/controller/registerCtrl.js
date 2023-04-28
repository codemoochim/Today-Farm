import registerSrvc from "../services/registerSrvc";

const registerCtrl = async (req, res, next) => {
  try {
    const { email, password, phone, name } = req.body;
    const processResult = await registerSrvc(email, password, phone, name);
    return res.status(processResult.statusCode).send(processResult.message);
  } catch (error) {
    next(err);
  }
};

export default registerCtrl;
