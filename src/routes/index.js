import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello 오늘농장!");
});

export default router;
