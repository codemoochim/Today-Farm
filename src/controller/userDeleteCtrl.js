import userDeleteSrvc from "../services/userDeleteSrvc.js";

const userDeleteCtrl = async (req, res, next) => {
  try {
    const { password } = req.body;
    const { token } = req.cookies.token;
    const processResult = await userDeleteSrvc(token, password);
    return res.status(processResult.status).send(processResult.message);
  } catch (err) {
    next(err);
  }
};

export default userDeleteCtrl;
