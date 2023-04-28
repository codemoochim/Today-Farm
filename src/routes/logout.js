const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  // 로그아웃 처리
  res.clearCookie("jwt", { httpOnly: true });
  res.status(200).send("Logged out");
});

module.exports = router;
