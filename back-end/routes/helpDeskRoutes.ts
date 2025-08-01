import express from 'express';
import { searchProblems } from '../controllers/helpDeskController';
import { searchProblemById } from '../controllers/helpDeskController';
import { helpDeskController } from '../controllers/helpDeskController';
import { getHelpDeskLists } from '../controllers/helpDeskController';
import { handleHelpDeskRemove } from '../controllers/helpDeskController';
const router = express.Router();

// This route handles the GET request with a query parameter
router.get('/searchProblems', searchProblems);
// This route handles the GET request with an id parameter
router.get('/searchProblems/:id', searchProblemById);
router.post('/helpDeskEntryController', helpDeskController);
router.get('/getHelpDeskLists', getHelpDeskLists);
router.delete('/handleHelpDeskRemove/:id', handleHelpDeskRemove);

export default router;
