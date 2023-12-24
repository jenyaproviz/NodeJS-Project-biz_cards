import { Card } from "../db/model/card.model";
import { ApplicationError } from "../error/application-error";
import { ICard } from "./../db/types/db.d";
import chalk from "chalk";

export const createCard = async (cardData: ICard, userId: string) => {
  try {
    const card = await Card.create({ ...cardData, user_id: userId });
    return card;
  } catch (error: any) {
    console.log(chalk.redBright(`Error creating new card: ${error.message}`));
    throw new ApplicationError(500, "Internal Server Error");
  }
};

export const getCards = async () => {
  try {
    const cards = await Card.find();
    return cards;
  } catch (error: any) {
    console.log(chalk.redBright(`Error fetching cards: ${error.message}`));
    throw new ApplicationError(500, "Internal Server Error");
  }
};

export const getUserCards = async (userId: string) => {
  try {
    const cards = await Card.find({ user_id: userId });
    return cards;
  } catch (error: any) {
    console.log(chalk.redBright(`Error fetching user cards: ${error.message}`));
    throw new ApplicationError(500, "Internal Server Error");
  }
};

export const getCardById = async (cardId: string) => {
  try {
    const card = await Card.findById(cardId);

    if (!card) {
      console.log(chalk.redBright(`Card with ID ${cardId} not found`));
      throw new ApplicationError(404, `Card with ID ${cardId} not found`);
    }

    return card;
  } catch (error: any) {
    console.log(chalk.redBright(`Error fetching card by ID: ${error.message}`));
    throw new ApplicationError(500, "Internal Server Error");
  }
};

export const updateCard = async (
  cardId: string,
  userId: string,
  updateData: Partial<ICard>
) => {
  try {
    const updatedCard = await Card.findOneAndUpdate(
      { _id: cardId, user_id: userId },
      { $set: updateData },
      { new: true }
    );

    if (!updatedCard) {
      throw new ApplicationError(404, `Card with ID ${cardId} not found`);
    }

    return updatedCard;
  } catch (error: any) {
    console.log(chalk.redBright(`Error updating card: ${error.message}`));
    throw new ApplicationError(500, "Internal Server Error");
  }
};

export const likeCard = async (cardId: string, userId: string) => {
  try {
    const updatedCard = await Card.findOneAndUpdate(
      { _id: cardId },
      { $addToSet: { likes: userId } },
      { new: true }
    );

    return updatedCard;
  } catch (error: any) {
    console.log(chalk.redBright(`Error liking card: ${error.message}`));
    throw new ApplicationError(500, "Internal Server Error");
  }
};

export const deleteCard = async (cardId: string, userId: string) => {
  try {
    const deletedCard = await Card.findOneAndDelete({
      _id: cardId,
      user_id: userId,
    });

    if (!deletedCard) {
      throw new ApplicationError(404, `Card with ID ${cardId} not found`);
    }

    return deletedCard;
  } catch (error: any) {
    console.log(chalk.redBright(`Error deleting card: ${error.message}`));
    throw new ApplicationError(500, "Internal Server Error");
  }
};
