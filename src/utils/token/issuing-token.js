import jwt from "jsonwebtoken";

export const issuingToken = (email, secret, time) => {
  const token = jwt.sign(
    {
      email,
    },
    `${secret}`,
    { expiresIn: `${time}s` }, // 초단위
  );
  return token;
};
