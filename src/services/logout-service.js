const logout = async (req, res) => {
  try {
    const processResult = { statusCode: 200, message: "성공" };
    console.log(req.cookies);
    res.clearCookie("secret");
    res.clearCookie("refresh-secret");
    // res.redirect("/login");
    return processResult;
  } catch (err) {
    throw new Error(err);
  }
};

export default logout;

// { httpOnly: true }
