import { PrismaClient } from "@prisma/client";
import { Response, Request } from "express";
const feature12Client = new PrismaClient();
export const getfeature12 = async (req: Request, res: Response) => {

};

//Display All the question from General Question table (just the question column)
export const displayAllGQuestions = async (req: Request, res: Response) => {
  try {
    const questions = await feature12Client.general_questions.findMany({
      select: {
        g_question: true,
      },
    });
    res.json(questions);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

//Display Answer corresponding to the question
export const displayAnswer = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const answers = await feature12Client.general_answers.findMany({
      where: {
        gQuestionId: parseInt(id),
      },
      select: {
        g_answer: true,
      },
    });

    res.json(answers);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

//Create
export const createGAnswer = async (req: Request, res: Response) => {
  const { id, gQuestionId, g_answer } = req.body;
  try {
    const GAnswer = await feature12Client.general_answers.create({
      data: {
        id: id,
        gQuestionId: gQuestionId,
        g_answer: g_answer
      },
    });
    return res.status(201).json(GAnswer);
  } catch (error) {
    return res.status(500).json({ error });
  }
};


//Read
export const getAllGeneralQuestions = async (req: Request, res: Response) => {
  try {
    const GAnswer = await feature12Client.general_answers.findMany();
    return res.status(200).json(GAnswer);
  } catch (error) {
    return res.status(500).json({ error });
  }
};


//Update
export const updateGQuestion = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { g_answer } = req.body;
  try {
    const GQuestions = await feature12Client.general_answers.update({
      where: {
        id: parseInt(id),
      },
      data: {
        g_answer: g_answer,
      },
    });
    return res.status(200).json(GQuestions);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

/*
//Delete
export const deleteGQuestion = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const GQuestions = await feature12Client.general_questions.delete({
      where: {
        id: parseInt(id),
      },
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

*/