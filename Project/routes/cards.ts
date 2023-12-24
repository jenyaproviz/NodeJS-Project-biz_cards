import { Router } from "express";
import { Card } from "../db/model/card.model";
import { verifyToken } from "../middleware/verify-token";
import { validateCard } from "../middleware/validate-schema";
import { verifyIsBusiness } from "../middleware/verify-is-business";
import chalk from "chalk";

const router = Router();

// Get all cards
router.get("/", async (req, res, next) => {
  try {
    const cards = await Card.find();
    res.json(cards);
  } catch (e) {
    next(e);
  }
});

// Get user cards
router.get("/my-cards", verifyToken, async (req, res, next) => {
  try {
    const userId = req.user?.id;

    const cards = await Card.find({ user_id: userId });
    res.json(cards);
  } catch (e) {
    next(e);
  }
});

// Get Card by Id
router.get("/:id", async (req, res, next) => {
  try {
    const cardId = req.params.id;
    const card = await Card.findById(cardId);

    if (!card) {
      console.log(chalk.redBright(`Card with ID ${cardId} not found`));
      return res
        .status(404)
        .json({ message: `Card with ID ${cardId} not found` });
    }

    res.json(card);
  } catch (e: any) {
    console.log(chalk.redBright(`Error fetching card by ID: ${e.message}`));
    next(e);
  }
});

// Create new card
router.post("/", verifyIsBusiness, validateCard, async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const card = await Card.create({ ...req.body, user_id: userId });
    res.status(201).json(card);
  } catch (e: any) {
    console.log(chalk.redBright(`Error creating new card: ${e.message}`));
    next(e);
  }
});

// Edit card
router.put("/:id", verifyToken, validateCard, async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const cardId = req.params.id;

    const updatedCard = await Card.findOneAndUpdate(
      { _id: cardId, user_id: userId },
      { $set: req.body },
      { new: true }
    );

    res.json(updatedCard);
  } catch (e: any) {
    console.log(chalk.redBright(`Error updating card: ${e.message}`));
    next(e);
  }
});

// Like card
router.patch("/:id", verifyToken, async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const cardId = req.params.id;

    const updatedCard = await Card.findOneAndUpdate(
      { _id: cardId },
      { $addToSet: { likes: userId } },
      { new: true }
    );

    res.json(updatedCard);
  } catch (e: any) {
    console.log(chalk.redBright(`Error liking card: ${e.message}`));
    next(e);
  }
});

// Delete card
router.delete("/:id", verifyToken, async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const cardId = req.params.id;

    const deletedCard = await Card.findOneAndDelete({
      _id: cardId,
      $or: [{ user_id: userId }, { role: "admin" }],
    });

    res.json(deletedCard);
  } catch (e: any) {
    console.log(chalk.redBright(`Error deleting card: ${e.message}`));
    next(e);
  }
});

export default router;
