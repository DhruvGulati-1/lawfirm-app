import express from "express";
const router = express.Router();

// Sample GET route
router.get("/", (req, res) => {
  res.send("Case route working ✅");
});

export default router;
