import { PrismaClient } from "@prisma/client";
import { Response, Request } from "express";
import fs from 'fs';
import { EntityTypesClient, protos } from '@google-cloud/dialogflow';
import path from 'path';
const feature12Client = new PrismaClient();
const prisma = new PrismaClient();

//For Updating the entity type in dialogflow
const entities = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../dialogflowData.json'), 'utf-8'));
type IEntityType = protos.google.cloud.dialogflow.v2.IEntityType;

//for dialogflow integration-1
import dialogflow from '@google-cloud/dialogflow';

//Getting CREDENTIALS from .env file for dialogflow
import loadEnv from "../configs/dotenvConfig";
loadEnv();

// Your credentials
const CREDENTIALS = JSON.parse(process.env.CREDENTIALS || '');

// Other way to read the credentials
// import fs from 'fs';
// const CREDENTIALS = JSON.parse(fs.readFileSync(''));

// Your google dialogflow project-id
const PROJECID = CREDENTIALS.project_id;

// // Configuration for the client
const CONFIGURATION = {
  credentials: {
    private_key: CREDENTIALS['private_key'],
    client_email: CREDENTIALS['client_email']
  }
}

//for dialogflow integration-2
// Create a new session
const sessionClient = new dialogflow.SessionsClient(CONFIGURATION);

// // Detect intent function
const detectIntent = async (languageCode, queryText, sessionId) => {

    const sessionPath = sessionClient.projectAgentSessionPath(PROJECID, sessionId);

    // The text query request.
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                // The query to send to the dialogflow agent
                text: queryText,
                // The language used by the client (en-US)
                languageCode: languageCode,
            },
        },
    };

    // Send request and log result
    const responses = await sessionClient.detectIntent(request);
//     // console.log(responses);
    const result = responses[0].queryResult;
//     // result?.outputContexts?.forEach(context => console.log(context.parameters?.fields));

    if (result) {
//     // Now you can safely access properties or methods on 'result'
        // console.log(result);
        return {
          result: result,
        };
    } else {
    console.log('Result is null or undefined');
    }
}

//Post request for dialogflow with body parameters
export const forDialogflow = async (req: Request, res: Response) => {
  const languageCode = req.body.languageCode;
  const queryText = req.body.queryText;
  const sessionId = req.body.sessionId;

  const responseData = await detectIntent(languageCode, queryText, sessionId);

    if (responseData) {
      if(responseData.result.intent?.displayName === 'ShowingVenues'){
        try{
          const categories = await feature12Client.venue.findMany({
            select: {
              category: true,
            },
            distinct: ["category"],
          });
          // console.log(venues);
          const categoriesArr = categories.map(venue => venue.category);
          const categoriesString = categoriesArr.join(', ');
          res.json({ 
            fulfillmentText : responseData.result.fulfillmentText,
            consequences: categoriesString
          });
        } catch (error) {
          return res.status(500).json({ error });
        }
      }else if (responseData.result.intent?.displayName === "choosingCategory") {
        const category =
          responseData.result?.outputContexts?.[0]?.parameters?.fields?.category
            ?.stringValue;
        // console.log(responseData.result?.outputContexts?.[0]?.parameters?.fields);
        try {
          const names = await feature12Client.venue.findMany({
            where: {
              category: category,
            },
            select: {
              venueId: true,
              name: true,
            },
            distinct: ["name"],
          });
          const namesArr = names.map((venue) => venue.name);
          const namesString = namesArr.join(", ");
          res.json({
            fulfillmentText: responseData.result.fulfillmentText,
            consequences: namesString,
          });
        } catch (error) {
          return res.status(500).json({ error });
        }
      } else if (
        responseData.result.intent?.displayName === "Ask Restaurant"
      ) {
        try {
          const names = await feature12Client.venue.findMany({
            
            select: {
              name: true,
            },
            distinct: ["name"],
          });
          const namesArr = names.map((venue) => venue.name);
          const namesString = namesArr.join(", ");
          res.json({
            fulfillmentText: responseData.result.fulfillmentText,
            consequences: namesString,
          });
        } catch (error) {
          return res.status(500).json({ error });
        }
      } 
      else if(responseData.result.intent?.displayName === "Change Username - yes - name"){
        // const newUsername =responseData.result.parameters?.fields?.user.structValue?.fields?.name.stringValue;
        // console.log(newUsername);
        // console.log(queryText)
        // console.log(sessionId)

        //update username in database according to sessionID
        await feature12Client.user.update({
          where: {
            addId: sessionId,
          },
          data: {
            username: queryText,
          },
        });
        res.json({
          fulfillmentText: responseData.result.fulfillmentText,
        });
      } 
      else {
        res.send({ fulfillmentText: responseData.result.fulfillmentText });
        // console.log(responseData.result.intent);
        // console.log(responseData.result.outputContexts);
      }
  } else {
    res.send('No response data');
  }
};

async function fetchVenuesAndWriteToFile() {
  const venues = await prisma.venue.findMany({
    select: {
      name: true
    },
    distinct: ["name"],
  });
  const venueData = {
    name: 'venue',
    entries: venues.map(venue => ({
      value: venue.name,
      synonyms: [venue.name], // synonyms can be the same as the value if you don't have any synonyms
    })),
  };

  const categories = await feature12Client.venue.findMany({
    select: {
      category: true,
    },
    distinct: ["category"],
  });
    const categoryData = {
    name: 'category',
    entries: categories.map(item => ({
      value: item.category,
      synonyms: [item.category], // synonyms can be the same as the value if you don't have any synonyms
    })),
  };
  
  // const users = await prisma.user.findMany({
  //   select: {
  //     username: true
  //   },
  //   distinct: ["username"],
  // });
  // const userData = {
  //   name: 'user',
  //   entries: users.map(user => ({
  //     value: user.username,
  //     synonyms: [user.username], // synonyms can be the same as the value if you don't have any synonyms
  //   })),
  // };

  fs.writeFileSync('dialogflowData.json', JSON.stringify([venueData,categoryData], null, 2));
}

async function updateEntityType() {
  const projectId = PROJECID; // Replace with your Dialogflow project ID

  const client = new EntityTypesClient({
    projectId: projectId,
    credentials: {
      private_key: CREDENTIALS['private_key'],
      client_email: CREDENTIALS['client_email']
    }
  });
  const parent = `projects/${projectId}/agent`;

  // Get the list of entity types
  const [entityTypes] = await client.listEntityTypes({ parent });

  for (const entity of entities) {
    // Find the entity type with the display name 'venue'
    const entityType = entityTypes.find(et => et.displayName === entity.name);

    if (entityType) {
      // Get the UUID of the entity type
      const entityTypePath = entityType.name;

      const request = {
        entityType: {
          name: entityTypePath,
          displayName: entity.name,
          kind: 'KIND_MAP',
          entities: entity.entries.map(entry => ({
            value: entry.value,
            synonyms: entry.synonyms,
          })),
        },
        updateMask: {
          paths: ['entities'],
        },
      } as { entityType: IEntityType };

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [response] = await client.updateEntityType(request);
      // console.log('DialogflowEntity updated:', response);
    }
  }
}

// async function createEntityType() {
//   const projectId = PROJECID; // Replace with your Dialogflow project ID

//   const client = new EntityTypesClient();
//   const parent = `projects/${projectId}/agent`;
//   for (const entity of entities) {
//     const request = {
//       parent: parent,
//       entityType: {
//         displayName: entity.name, // entity name
//         kind: 'KIND_MAP',
//         entities: entity.entries.map(entry => ({
//           value: entry.value,
//           synonyms: entry.synonyms,
//         })),
//       },
//     } as { parent: string, entityType: IEntityType };

//     const [response] = await client.createEntityType(request);
//     console.log('Entity created:', response);
//   }
// }

export const fetchData = async (req: Request, res: Response) => {
  await fetchVenuesAndWriteToFile().catch(err => console.error(err));
  await updateEntityType().catch(err => console.error(err));
  res.send('Data written to file');
}

//get All message (Comminity Chat)
export const getAllMessageCommunity = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const messages = await feature12Client.message.findMany({
      where: {
        roomId: parseInt(id),
      },
      select: {
        userId: true,
        User: {
          select: {
            username: true,
            fname: true,
            lname: true,
            profile_picture: true,
          },
        },
        message: true,
        date_time: true,
      },
      orderBy: {
        messageId: "asc",
      },
    });
    return res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

//get detail of community chat of specific userid
export const getCommunityChatList = async (req: any, res: Response) => {

  try {
    const userId = req.userId;
    const communityList = await feature12Client.chat_Room_Logs.findMany({
      where: {
        userId: parseInt(userId),
        access_status: {
          equals: true,
        },
      },
      select: {
        chatRoomId: true,
      },
      distinct: ["chatRoomId"],
    });

    const communitygroupDetail = await Promise.all(
      communityList.map(async (group) => {
        const id = group.chatRoomId;
        const groupInfo = await feature12Client.chat_room.findUnique({
          where: {
            chatRoomId: id,
          },
          select: {
            roomname: true,
            community_group_profile: true,
          },
        });

        const members = await feature12Client.chat_Room_Logs.findMany({
          where: {
            chatRoomId: id,
          },
          select: {
            userId: true,
            User: {
              select: {
                username: true,
                userId: true,
                addId: true,
                profile_picture: true,
              },
            },
            
          },
        });
        
        const messages = await feature12Client.message.findMany({
          where: {
            roomId: id,
          },
          select: {
            userId: true,
            // message: true,
            date_time: true,
            messageId: true,
          },
        });

        return {
          ...groupInfo,
          id,
          members,
          messages,
        };
      })
    );
    
    return res.status(200).json(communitygroupDetail);
  } catch (error) {
    return res.status(500).json({ error });
  }
};
//get userId from username
export const getUserId = async (req: Request, res: Response) => {
  const { sender } = req.params;
  try {
    const user = await feature12Client.user.findUnique({
      where: {
        username: sender,
      },
      select: {
        userId: true,
      },
    });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error });
  }
};
//reterieve all message from specific roomId in ascending order
export const getAllMessage = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const messages = await feature12Client.chat_message.findMany({
      where: {
        roomId: parseInt(id),
      },
      select: {
        userId: true,
        User:{
          select:{
            username:true,
            fname:true,
            lname:true,
            profile_picture:true,
          }
        },
        message: true,
        date_time: true,
      },
      orderBy: {
        messageId: "asc",
      },
    });
    return res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json({ error });
  }
};



//One Group Chat Detail
export const getGroupChatDetail = async (req: Request, res: Response) => {
  const { id } = req.params;
  try{
    const groupdetail = await feature12Client.group.findMany({
      where: {
        groupId: parseInt(id),
      },
      select: {
        group_name: true,
        group_profile: true,
      },
    });
    const group_name=groupdetail[0].group_name;
    const group_profile=groupdetail[0].group_profile;

    const members = await feature12Client.group_user.findMany({
      where: {
        groupId: parseInt(id),
      },
      select: {
        memberId: true,
        User: {
          select: {
            username: true,
            userId: true,
            addId: true,
            profile_picture: true,
          },
        },
      },
    });
    const messages = await feature12Client.chat_message.findMany({
      where: {
        roomId: parseInt(id),
      },
      select: {
        userId: true,
        message: true,
        date_time: true,
        messageId: true,
      },
    });
    
    return res.status(200).json({ group_name,group_profile,id,members, messages });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

// PrivateChat
export const getPrivateChatList = async (req: any, res: Response) => {

  try {
    const userId = req.userId;
    const groupList = await feature12Client.group_user.findMany({
      where: {
        memberId: parseInt(userId),
      },
      select: {
        groupId: true,
      },
    });

    const groupDetail = await Promise.all(
      groupList.map(async (group) => {
        const id = group.groupId;
        const groupInfo = await feature12Client.group.findUnique({
          where: {
            groupId: id,
          },
          select: {
            group_name: true,
            group_profile: true,
          },
        });

        const members = await feature12Client.group_user.findMany({
          where: {
            groupId: id,
          },
          select: {
            memberId: true,
            User: {
              select: {
                username: true,
                userId: true,
                addId: true,
                profile_picture: true,
              },
            },
            
          },
        });
        
        const messages = await feature12Client.chat_message.findMany({
          where: {
            roomId: id,
          },
          select: {
            userId: true,
            // message: true,
            date_time: true,
            messageId: true,
          },
        });

        return {
          ...groupInfo,
          id,
          members,
          messages,
        };
      })
    );
    
    return res.status(200).json(groupDetail);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

//Get the secondUserID from friendship table of specific user who has login
export const getFriendList = async (req: any, res: Response) => {

  try {
    const userId = req.userId;
    const friendships = await feature12Client.friendship.findMany({
      where: {
        firstUserId: parseInt(userId),
      },
      select: {
        sencondUserId: true,
      },
    });

    // Get the second user's details from the user table
    const secondUserDetails = await Promise.all(
      friendships.map(async (friendship) => {
        return await feature12Client.user.findUnique({
          where: {
            userId: friendship.sencondUserId,
          },
          select: {
            username: true,
            userId: true,
            addId: true,
            profile_picture: true,
          },
        });
      })
    );
    
    return res.status(200).json(secondUserDetails);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

//Extract all the user from the user table
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await feature12Client.user.findMany({
      select: {
        username: true,
        userId: true,
        fname: true,
        lname: true,
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
        venueId: true,
        Venue: {
          // Include the Venue relation
          select: {
            name: true, // Select the name field from the Venue table
          },
        },
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