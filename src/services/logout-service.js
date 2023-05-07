import { minutesToMillisecond } from "../utils/setTimeForSearchData.js";
import { redisClient } from "../middleware/redis.js";

const logout = async (req, res) => {
  try {
    const processResult = { statusCode: 200, message: "성공" };
    await redisClient.connect();
    await redisClient.del(`${req.cookies.refreshToken}`, (err, response) => {
      if (err) throw err;
      console.log(response);
    });
    return processResult;
  } catch (err) {
    throw new Error(err);
  }
};

export default logout;
