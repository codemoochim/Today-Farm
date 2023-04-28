import loginSrvc from "../services/loginSrvc";

const loginCtrl = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const processResult = await loginSrvc(email, password);
    return res.status(processResult.statusCode).send(processResult.message);
  } catch (err) {
    next(err);
  }
};

export default loginCtrl;
