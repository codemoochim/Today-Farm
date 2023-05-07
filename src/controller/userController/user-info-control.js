import { userInfoService } from "../../services/userService/index.js";

const userInfoControl = async (req, res) => {
  const email = req.user;
  const processResult = await userInfoService(email);
  return res.status(processResult.statusCode).send(processResult.message);
};

export default userInfoControl;
