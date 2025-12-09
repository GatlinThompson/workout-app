import { Router } from "express";

const router = Router();

router.get("/login", (req, res) => {
  res.send("Login");
});

router.get("/", (req, res) => {
  res.send("Auth");
});

router.get("/register", (req, res) => {
  res.send("Register");
});

export default router;
