import express from 'express';

import { getTechnicainInfo } from '../controllers/assignmentController';
import { getRequestorViewInfo } from '../controllers/assignmentController';
import { getTechnicianViewInfo } from '../controllers/assignmentController';
import { getTechnicianInfoWorkLoad } from '../controllers/assignmentController';
import { getTechnicianInfoCompleted } from '../controllers/assignmentController';
import {
  completedMaintenanceRequestUpdate,
  assignTechnician,
  assignTechnicianToTasks,
  requestAndAssignedTechnicianDetail,
  singleRequestDetailWithTechnician,
} from '../controllers/assignmentController';

const router = express.Router();

router.post('/TechnicainInfo', getTechnicainInfo);
router.post('/maintenancedata', getRequestorViewInfo);
router.post('/Technicaindata', getTechnicianViewInfo);
router.post('/TechnicainInfoWorkLoad', getTechnicianInfoWorkLoad);
router.post('/TechnicainInfoCompleted', getTechnicianInfoCompleted);
router.post('/FillCompletionForm', completedMaintenanceRequestUpdate);
router.get('/getTechnicianWithWorkload', assignTechnician);
router.post('/technicianAssignedToTasks/:id', assignTechnicianToTasks);
router.get(
  '/requestAndAssignedTechnicianDetail',
  requestAndAssignedTechnicianDetail
);
router.get(
  '/singleRequestDetailWithTechnician/:id',
  singleRequestDetailWithTechnician
);

export default router;
