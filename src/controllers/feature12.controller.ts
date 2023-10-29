import { PrismaClient } from "@prisma/client";
import { Response, Request } from "express";
const feature12Client = new PrismaClient();
export const getfeature12 = async (req: Request, res: Response) => {

};

//Create
export const createGQuestions = async (req: Request, res: Response) => {
  const { Questionid, QuestionText } = req.body;
  try {
    const GQuestions = await feature12Client.general_question.create({
      data: {
        id: Questionid,
        g_question: QuestionText,
      },
    });
    return res.status(201).json(GQuestions);
  } catch (error) {
    return res.status(500).json({ error });
  }
};


//Read
export const getAllGeneralQuestions = async (req: Request, res: Response) => {
  try {
    const GQuestions = await feature12Client.general_question.findMany();
    return res.status(200).json(GQuestions);
  } catch (error) {
    return res.status(500).json({ error });
  }
};