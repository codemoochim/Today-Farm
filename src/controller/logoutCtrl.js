import logoutSrvc from "../services/logoutSrvc";

const logoutCtrl = async (req, res, next) => {
  try {
    const processResult = await logoutSrvc();
    return res.status(processResult.status).send(processResult.message);
  } catch (err) {
    next(err);
  }
};

export default logoutCtrl;
