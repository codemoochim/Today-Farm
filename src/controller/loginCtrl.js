import { login, refreshAccessToken } from "../services/loginSrvc.js";

const loginCtrl = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const processResult = await login(email, password);
    if (processResult.statusCode === 400) {
      const { refreshToken } = req.cookie;
      if (!refreshToken) {
        // refreshToken이 없는 경우
        processResult = {
          statusCode: 400,
          message: "Unauthorized",
        };
      } else {
        const refreshResult = await refreshAccessToken(refreshToken);
        processResult = refreshResult;
      }
    }
    return res.status(processResult.statusCode).send(processResult.message);
  } catch (err) {
    next(err);
  }
};

export default loginCtrl;
