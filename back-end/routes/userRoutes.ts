import express from 'express';
import { newUser } from '../controllers/userController';
import {
  newDepartment,
  getDepartments,
  removeDepartment,
  getUsersList,
  updateUserPassword,
  updateUserStatus,
  getDisabledUsersList,
  updateUser,
} from '../controllers/userController';

const router = express.Router();

router.post('/users', newUser);
router.post('/departments', newDepartment);
router.get('/getDepartments', getDepartments);
router.delete('/removeDepartment', removeDepartment);
router.get('/getUsersList', getUsersList);
router.post('/updatePassword', updateUserPassword);
router.patch('/updateUserStatus', updateUserStatus);
router.get('/getDisabledUsersList', getDisabledUsersList);
router.put('/updateUser/:id', updateUser);

export default router;
