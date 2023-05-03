import userDeleteService from "../services/user-delete-service.js";

const userDeleteCtrl = async (req, res, next) => {
  try {
    const { password } = req.body;
    const { token } = req.cookies.token;
    const processResult = await userDeleteService(token, password);
    return res.status(processResult.status).send(processResult.message);
  } catch (err) {
    next(err);
  }
};

export default userDeleteCtrl;
