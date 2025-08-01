import express from "express";
import { authorizeRole } from "../middleware/authorizeRole";
import { loginUser, requestPasswordReset, resetPassword  } from "../controllers/authController";

const router = express.Router();

// Admin routes
router.use("/admin", authorizeRole(["admin"]));
router.get("/admin/dashboard", (req, res) => {
  res.send("Admin Dashboard");
});

// Employee routes
router.use("/employee", authorizeRole(["employee"]));
router.get("/employee/emp_dashboard", (req, res) => {
  res.send("Employee Dashboard");
});

// Maintenance head routes
router.use("/dashboard", authorizeRole(["maintenance_head"]));
router.get("/dashboard/dashboardHome", (req, res) => {
  res.send("Maintenance Dashboard");
});

// Technician routes
router.use("/technician", authorizeRole(["technician"]));
router.get("/technician/allHistory", (req, res) => {
  res.send("Technician History");
});

// Department head routes
router.use("/department", authorizeRole(["department_head"]));
router.get("/department/allRequest", (req, res) => {
  res.send("Department Head Requests");
});


// Authentication route
router.post("/login", loginUser);
router.post("/request-password-reset", requestPasswordReset);
router.post("/reset-password", resetPassword);


export default router;