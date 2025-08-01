import express from 'express';
import { newUser } from '../controllers/requestController';
import {
  getMaintenanceRequests,
  getUserInfo,
  addNewRequestType,
  removeRequestType,
  requestTypeList,
  getPendingRequests,
  getRequestTypelist,
  getDetialOfPendingRequest,
} from '../controllers/requestController';
import { getRequestList } from '../controllers/requestController';
import { getMaintenanceRequestsApproval } from '../controllers/requestController';
import { getMaintenanceRequestsByName } from '../controllers/requestController';
import { updateRequestStatus } from '../controllers/requestController';
import { getDepartmentName } from '../controllers/requestController';
import { updateRequestStatusforrejection } from '../controllers/requestController'; // Adjust the path
import { updateRequestStatusfordepartment } from '../controllers/requestController'; // Adjust the path
import { getRejectionReason } from '../controllers/requestController'; // Adjust the path


const router = express.Router();

router.post('/newForm', newUser);
router.post('/maintenancerequests', getMaintenanceRequests);
router.get('/userInfo/:userId', getUserInfo);
router.post('/addRequestType', addNewRequestType);
router.post('/removeRequestType', removeRequestType);
router.get('/requestTypeList', requestTypeList);
router.delete('/removeRequestType', removeRequestType);
router.get('/getPendingRequests', getPendingRequests);
router.get('/requestTypelist', getRequestTypelist);
router.get('/getRequestList', getRequestList);
router.post('/maintenancerequestsApproval', getMaintenanceRequestsApproval);

router.post('/getRejectionReason', getRejectionReason);

router.get('/maintenanceRequests/:request_id', getMaintenanceRequestsByName);
router.patch('/maintenanceRequests/:request_id/status', updateRequestStatus);

router.patch(
  '/maintenanceRequests/rejectHandle/:request_id/status',
  updateRequestStatusforrejection
);
router.get('/department/:departmentId', getDepartmentName);
router.get('/getDetialOfPendingRequest/:id', getDetialOfPendingRequest);
router.patch(
  '/maintenanceRequests/:request_id/priority',
  updateRequestStatusfordepartment
);
export default router;
