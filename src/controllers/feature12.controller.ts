import { PrismaClient } from "@prisma/client";
import { Response, Request } from "express";
const feature12Client = new PrismaClient();

/*
import express from "express";
import { Server, Socket } from "socket.io";
import { createServer } from "http";
import cors from "cors";
import { ClientToServerEvents, ServerToClientEvents } from "../typings";

const app = express();
app.use(cors());
const server = createServer(app);
const io = new Server<ClientToServerEvents, ServerToClientEvents>(server, {
  cors: {
    origin: ["http://localhost:5173", "https://admin.socket.io"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket: Socket<ClientToServerEvents, ServerToClientEvents>) => {
  console.log(socket.id, " connected");

  socket.on("send-message", (message, room) => {
    console.log("sending message: " + message + " to room: " + room);
    socket.broadcast.to(room).emit("receive-message", message);

  })

  socket.on("join-room", (room, cb) => {
    socket.join(room);
    cb('UserID+ joined the Group');
  }
});



  //client side
  
  socket.emit("join-room", room, message => {
    displayMessage(message);
  });
  

socket.on("connect", () => {
  socket.emit("send-message", message, room)
});
  
socket.on("receive-message", (message) => {
  displaychatUIMessage(message);
});
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
export const displayAllQuestionsWrtName = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const questions = await feature12Client.venue_question.findMany({
      where: {
        venueId: parseInt(id),
      },
      select: {
        question: true,
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
export const displayAllDistinctCategory = async (req: Request, res: Response) => {
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