import logoutService from "../services/logout-service.js";

const logoutControl = async (req, res, next) => {
  try {
    const processResult = await logoutService(req, res);
    return res.status(processResult.status).send(processResult.message);
  } catch (err) {
    next(err);
  }
};

export default logoutControl;
