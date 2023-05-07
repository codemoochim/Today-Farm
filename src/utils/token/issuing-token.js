import jwt from "jsonwebtoken";

export const issuingToken = (email, userId, secret, time) => {
  const token = jwt.sign(
    {
      email: email,
      userId: userId,
    },
    `${secret}`,
    { expiresIn: `${time}s` }, // 초단위
  );
  return token;
};
