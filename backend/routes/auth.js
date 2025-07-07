import express from "express";
const router = express.Router();

// Sample auth route
router.get("/", (req, res) => {
  res.send("Auth route is live ✅");
});

export default router;
