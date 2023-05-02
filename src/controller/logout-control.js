import logoutService from "../services/logout-services.js";

const logoutControl = async (req, res, next) => {
  try {
    const processResult = await logoutService();
    return res.status(processResult.status).send(processResult.message);
  } catch (err) {
    next(err);
  }
};

export default logoutControl;
