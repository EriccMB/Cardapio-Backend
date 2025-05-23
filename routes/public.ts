import express from "express";
import { PrismaClient } from "../generated/prisma";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/food", async (req, res) => {
  const { title, image, price } = req.body;

  if (!title || typeof title !== "string") {
    res.status(400).json({ message: "Invalid title" });
  }
  if (!image || typeof image !== "string") {
    res.status(400).json({ message: "Invalid image" });
  }
  if (typeof price !== "number" || price <= 0) {
    res.status(400).json({ message: "Invalid price" });
  }

  try {
    const foodData = await prisma.food.create({
      data: {
        title,
        image,
        price,
      },
    });
    res.status(201).json(foodData);
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor" });
  }
});

router.get("/food", async (req, res) => {
  try {
    const allFoods = await prisma.food.findMany();
    res.status(200).json(allFoods);
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor" });
  }
});

export default router;
