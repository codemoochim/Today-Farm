const logout = async (req, res) => {
  try {
    const processResult = { statusCode: 200, message: "성공" };
    res.clearCookie("jwt", { httpOnly: true });
    return processResult;
  } catch (err) {
    throw new Error(err);
  }
};

export default logout;
