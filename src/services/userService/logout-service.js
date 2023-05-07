import { deleteTokenIntoRedis } from "../../utils/token/manage-token-with-redis.js";

const logoutService = async (req, res) => {
  try {
    const processResult = { statusCode: 200, message: "성공" };
    await deleteTokenIntoRedis(req.cookies.refreshToken);
    return processResult;
  } catch (err) {
    throw new Error(err);
  }
};

export default logoutService;
