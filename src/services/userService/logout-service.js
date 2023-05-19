import { deleteTokenIntoRedis } from "../../utils/auth/index.js";

const logoutService = async (refreshToken) => {
  try {
    const processResult = { statusCode: 200, message: "Success" };
    await deleteTokenIntoRedis(refreshToken);
    return processResult;
  } catch (err) {
    throw err;
  }
};

export default logoutService;
