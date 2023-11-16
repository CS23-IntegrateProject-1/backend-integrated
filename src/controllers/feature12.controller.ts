import { PrismaClient } from "@prisma/client";
import { Response, Request } from "express";
const feature12Client = new PrismaClient();

const prisma = new PrismaClient();

  // const existingChatRoom = await feature12Client.chat_room.findUnique({
  //   where: {
  //     //convert data.room to number
  //     chatRoomId: parseInt(data.room),
  //   },
  // });

  // if (existingChatRoom) {
  //   socket.join(data.room);
  //   console.log(`user joined room: ${data.room}`);

  //   io.to(data.room).emit("serverMsg", data);
  // }

/*
// Function to create chat rooms on the server and insert data back to the Chat_room DB
async function createChatRooms() {
  try {
    const venues = await feature12Client.venue.findMany();

    venues.forEach(async (venue) => {
      const roomKey = venue.chatRoomId;
      const roomName = venue.name;

    

      // Insert chat room data into the database
      try {
        await feature12Client.chat_room.create({
          data: {
            chatRoomId: roomKey,
            roomname: roomName,
          },
        });
        console.log(`Chat room ${roomKey} inserted into the database.`);
        // Server joins the chat room
        console.log(`Creating chat room: ${roomKey}`);

        socket.emit("joinServerRoom", {"Hi", roomKey});

      } catch {
        console.log(`Chat room ${roomKey} already created`);
      }
    });
  } catch (error) {
    console.error("Error creating chat rooms:", error);
  }
}
// Run the function to create chat rooms when the server starts
createChatRooms();
*/

//Extract all the user from the user table
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await feature12Client.user.findMany({
      select: {
        username: true,
      },
    });
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error });
  }
};
//Display the answer of selected questions wrt the venue
export const displayAnswerWrtVenueID = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const answers = await feature12Client.venue_answer.findMany({
      where: {
        questionId: parseInt(id),
      },
      select: {
        answer: true,
      },
    });

    res.json(answers);
  } catch (error) {
    return res.status(500).json({ error });
  }
};
//Display All questions from Venue_Question table when user select specific venue (VenueId from Venue Table = VenueId from Venue_Question Table)
export const displayAllQuestionsWrtName = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  try {
    const questions = await feature12Client.venue_question.findMany({
      where: {
        venueId: parseInt(id),
      },
      select: {
        question: true,
        venueQuestionId: true,
      },
    });
    res.json(questions);
  } catch (error) {
    return res.status(500).json({ error });
  }
};
//Display ALl distinct name when the user select specific category
export const displayAllDistinctName = async (req: Request, res: Response) => {
  const { category } = req.params;
  try {
    const names = await feature12Client.venue.findMany({
      where: {
        category: category,
      },
      select: {
        category: true,
        venueId: true,
        name: true,
      },
      distinct: ["name"],
    });
    res.json(names);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

//Display All distinct category out of Venue Table from prisma
export const displayAllDistinctCategory = async (
  req: Request,
  res: Response
) => {
  try {
    const categories = await feature12Client.venue.findMany({
      select: {
        category: true,
      },
      distinct: ["category"],
    });
    res.json(categories);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

//Display All the question from General Question table (just the question column)
export const displayAllGQuestions = async (req: Request, res: Response) => {
  try {
    const questions = await feature12Client.general_questions.findMany({
      select: {
        generalQuestionId: true,
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

/*
//Create
export const createGAnswer = async (req: Request, res: Response) => {
  const { id, gQuestionId, g_answer } = req.body;
  try {
    const GAnswer = await feature12Client.general_answers.create({
      data: {
        
        generalAnswerId: id,
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
        generalAnswerId: parseInt(id),
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
