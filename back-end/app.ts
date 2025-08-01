import express, { Response, Request } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import requestRoutes from './routes/requestRoutes';
import cookieParser from 'cookie-parser';
import { handleChatbotMessage } from './controllers/chatbotIntents';
import helpDeskRoutes from './routes/helpDeskRoutes';
import * as dotenv from 'dotenv';
import feedbackRoutes from './routes/feedbackRoutes';
import assignmentRoutes from './routes/assignmentRoutes';

require('dotenv').config();

const app = express();

app.use(cookieParser()); // To parse cookies in request
app.use(express.json()); // To parse JSON bodies

app.use(cors());
app.use(bodyParser.json());
dotenv.config();

app.use('/api/requests/', requestRoutes);
app.use('/api/auth/', authRoutes);
app.use('/api/registers/', userRoutes);
app.use('/api/helpDeskEntry/', helpDeskRoutes);
app.use('/api/avaliableHelpDesk/', helpDeskRoutes);
app.use('/api/search/', helpDeskRoutes);
app.use('/api/feedbacks/', feedbackRoutes);
app.use('/api/assignTechnician/', assignmentRoutes);
app.use('/api/assigningTechnician/', assignmentRoutes);
app.use('/api/assignment/', assignmentRoutes);
// Example route
// Chatbot route using the intent handler from chatbotIntents.ts
app.post('/chatbot', (req: Request, res: Response) => {
  const { message } = req.body;
  const response = handleChatbotMessage(message); // Use the imported function
  res.status(200).json({ response });
});

const PORT = process.env.PORT || 3002;

app.listen(PORT, function () {
  console.log(`Server is running on port ${PORT}`);
});
