import express from "express";
const router = express.Router();

// Example route
router.get("/", (req, res) => {
  res.send("Cart routes working!");
});

export default router;
