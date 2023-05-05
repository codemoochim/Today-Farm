import userDeleteService from "../services/user-delete-service.js";

const userDeleteCtrl = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const { password } = req.body;
    const processResult = await userDeleteService(token, password);
    return res.status(processResult.statusCode).send(processResult.message);
  } catch (err) {
    next(err);
  }
};

export default userDeleteCtrl;
