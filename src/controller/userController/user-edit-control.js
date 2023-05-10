import { userEditService } from "../../services/userService/index.js";

const userEditControl = async (req, res) => {
  const email = req.user;
  const { name, phone } = req.body;
  const processResult = await userEditService(email, name, phone);

  return res.status(processResult.statusCode).send(processResult.message);
};

export default userEditControl;
