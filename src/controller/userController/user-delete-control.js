import { userDeleteService } from "../../services/userService/index.js";

const userDeleteControl = async (req, res, next) => {
  try {
    const email = req.user;
    // HACK 웹사이트 시연 용도 공개 개정 삭제 불가
    if (email === "sando@naver.com") {
      res.status(400).send("삭제할 수 없죠");
    }
    const { refreshToken } = req.cookies;
    const { password } = req.body;
    const processResult = await userDeleteService(email, password, refreshToken);
    const maxAge = 1000 * 60 * 60 * 24 * 14; // 14일
    const cookieOptions = {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge,
    };
    res.status(processResult.statusCode).clearCookie("refreshToken", cookieOptions).send(processResult.message);

    return;
  } catch (err) {
    next(err);
  }
};

export default userDeleteControl;
