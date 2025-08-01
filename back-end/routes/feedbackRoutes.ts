import express from 'express';
import {
  getTechnicianNameInfo,
  getTechnicianIDInfo,
  addFeedback,
  getCompletions,
} from '../controllers/feedbackController';

const router = express.Router();

// Use POST method
router.post('/getTechnicianName', getTechnicianNameInfo);
router.post('/getTechnicianId', getTechnicianIDInfo);
router.post('/addFeedback', addFeedback);
router.get('/getCompletions', getCompletions);
export default router;
