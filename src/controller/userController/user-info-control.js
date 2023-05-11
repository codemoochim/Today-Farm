import { userInfoService } from "../../services/userService/index.js";

const userInfoControl = async (req, res) => {
  const email = req.user;
  const processResult = await userInfoService(email);
  res.status(processResult.statusCode).send(processResult.message[0]);

  return;
};

export default userInfoControl;
