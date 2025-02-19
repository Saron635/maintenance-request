import { Response, Request, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { request } from 'http';
const prisma = new PrismaClient();
// Define the interface for the JWT payload
interface DecodedToken {
  userId: string;
  username: string;
  role: string;
}

export const getTechnicainInfo = async (req: Request, res: Response) => {
  try {
    // Extract the token from the authorization header
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res
        .status(401)
        .json({ error: 'Authorization token missing or invalid' });
    }

    const token = authHeader.split(' ')[1];
    const secret = process.env.JWT_KEY as string;

    if (!secret) {
      throw new Error('No token key is specified in environment variable');
    }

    // Decode the JWT token
    const decodedToken = jwt.verify(token, secret) as {
      userId: string;
      username: string;
      departementId: string;
    };
    const { userId } = decodedToken;

    console.log('Technician ID from Token:', userId);

    // Fetch the maintenance requests for the technician and include department name
    const requests = await prisma.maintenanceRequest.findMany({
      where: {
        Assignments: {
          some: {
            technician_id: parseInt(userId), // Match technician_id with the userId from the token
          },
        },
      },
      include: {
        Assignments: true,
        department: true, // Include the department relation to get the department name
      },
    });

    res.status(200).json(requests);
  } catch (error) {
    console.error('Error fetching maintenance requests:', error);
    res
      .status(500)
      .json({ error: 'An error occurred while fetching maintenance requests' });
  }
};

// POST method to fetch maintenance request data
// POST method to fetch maintenance request data
export const getRequestorViewInfo = async (req: Request, res: Response) => {
  const { requestId } = req.body; // Extract from request body

  const request_id = parseInt(requestId, 10); // Convert to number

  if (isNaN(request_id)) {
    return res.status(400).json({ message: 'Invalid request ID' });
  }

  try {
    // Fetch single maintenance request by request_id
    const request = await prisma.maintenanceRequest.findUnique({
      where: {
        request_id: request_id,
      },
      include: {
        department: true, // Include related department info if needed
      },
    });

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.status(200).json(request);
  } catch (error) {
    console.error('Error fetching maintenance request:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getTechnicianViewInfo = async (req: Request, res: Response) => {
  const { requestId, technicianId } = req.body;

  try {
    // Parse requestId as an integer
    const parsedRequestId = parseInt(requestId, 10);

    if (isNaN(parsedRequestId)) {
      return res.status(400).json({ message: 'Invalid request ID' });
    }

    // Fetch assignment data including technician details
    const assignment = await prisma.assignment.findFirst({
      where: {
        request_id: parsedRequestId, // Use the parsed integer
        technician_id: technicianId,
      },
      include: {
        user: true, // Fetch related user details (technician)
      },
    });

    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    // Fetch technician details directly from the user table if needed
    const technician = await prisma.user.findUnique({
      where: {
        user_id: technicianId,
      },
    });

    if (!technician) {
      return res.status(404).json({ message: 'Technician not found' });
    }

    // Return the relevant technician details
    res.status(200).json({
      technicianName: technician.username,
      technicianEmail: technician.email,
      assignedAt: assignment.assigned_at,
    });
  } catch (error) {
    console.error('Error fetching technician information:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getTechnicianInfoWorkLoad = async (
  req: Request,
  res: Response
) => {
  try {
    // Extract the token from the authorization header
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res
        .status(401)
        .json({ error: 'Authorization token missing or invalid' });
    }

    const token = authHeader.split(' ')[1];
    const secret = process.env.JWT_KEY as string;

    if (!secret) {
      throw new Error('No token key is specified in environment variable');
    }

    // Decode the JWT token
    const decodedToken = jwt.verify(token, secret) as {
      userId: string;
      username: string;
      departementId: string;
    };
    const { userId } = decodedToken;

    console.log('Technician ID from Token:', userId);

    // Fetch the maintenance requests for the technician with status 'Assigned' and include department name
    const requests = await prisma.maintenanceRequest.findMany({
      where: {
        Assignments: {
          some: {
            technician_id: parseInt(userId), // Match technician_id with the userId from the token
          },
        },
        status: 'In_Progress', // Filter by status 'Assigned'
      },
      include: {
        Assignments: true,
        department: true, // Include the department relation to get the department name
      },
    });

    res.status(200).json(requests);
  } catch (error) {
    console.error('Error fetching maintenance requests:', error);
    res
      .status(500)
      .json({ error: 'An error occurred while fetching maintenance requests' });
  }
};

export const getTechnicianInfoCompleted = async (
  req: Request,
  res: Response
) => {
  try {
    // Extract the token from the authorization header
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res
        .status(401)
        .json({ error: 'Authorization token missing or invalid' });
    }

    const token = authHeader.split(' ')[1];
    const secret = process.env.JWT_KEY as string;

    if (!secret) {
      throw new Error('No token key is specified in environment variable');
    }

    // Decode the JWT token
    const decodedToken = jwt.verify(token, secret) as {
      userId: string;
      username: string;
      departementId: string;
    };
    const { userId } = decodedToken;

    console.log('Technician ID from Token:', userId);

    // Fetch the maintenance requests for the technician with status 'Assigned' and include department name
    const requests = await prisma.maintenanceRequest.findMany({
      where: {
        Assignments: {
          some: {
            technician_id: parseInt(userId), // Match technician_id with the userId from the token
          },
        },
        status: 'Completed', // Filter by status 'Assigned'
      },
      include: {
        Assignments: true,
        department: true, // Include the department relation to get the department name
      },
    });

    res.status(200).json(requests);
  } catch (error) {
    console.error('Error fetching maintenance requests:', error);
    res
      .status(500)
      .json({ error: 'An error occurred while fetching maintenance requests' });
  }
};

export const completedMaintenanceRequestUpdate = async (
  req: Request,
  res: Response
) => {
  const { requestId, technicianId, detailOfProblem } = req.body;

  try {
    // Parse requestId as an integer
    const parsedRequestId = parseInt(requestId, 10);

    // Fetch the assignedAt date from the assignment data
    const assignment = await prisma.assignment.findFirst({
      where: { request_id: parsedRequestId },
    });

    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }

    // Insert into completionConfirmation table
    const confirmation = await prisma.completionConfirmation.create({
      data: {
        given_at: assignment.assigned_at,
        request_id: parsedRequestId,
        technician_id: parseInt(technicianId, 10),
        detail_of_problem: detailOfProblem,
      },
    });

    // Update the status of the Maintenance Request to 'Completed'
    await prisma.maintenanceRequest.update({
      where: { request_id: parsedRequestId },
      data: { status: 'Completed' },
    });

    // Send success response
    res.status(200).json({
      message: 'Maintenance request completed successfully',
      confirmation,
    });
  } catch (error) {
    console.error('Error completing maintenance request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const assignTechnician = async (req: Request, res: Response) => {
  try {
    const technicians = await prisma.user.findMany({
      where: {
        role: 'Technician',
      },
      select: {
        username: true,
        user_id: true,
        email: true,
        phone_number: true,
        MaintenanceAssignments: {
          select: {
            work_load: true,
          },
        },
      },
    });

    const techniciansWithWorkload = technicians.map((technician) => {
      const totalWorkload = technician.MaintenanceAssignments.reduce(
        (acc, assignment) => acc + assignment.work_load,
        0
      );
      return {
        ...technician,
        totalWorkload,
      };
    });

    res.status(200).json(techniciansWithWorkload);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch technicians' });
  }
};

const assignTechnicianToTasks = async (req: Request, res: Response) => {
  const { requestId } = req.body;
  const technician_id = parseInt(req.params.id, 10);

  try {
    const request = await prisma.maintenanceRequest.findUnique({
      where: { request_id: requestId },
    });

    if (!request) {
      return res.status(404).json({ error: 'Maintenance request not found' });
    }

    // Create a new assignment with an initial workload of 1
    const newAssignment = await prisma.assignment.create({
      data: {
        technician_id: technician_id,
        request_id: requestId,
        work_load: 0, // Temporary, will update below
      },
    });

    // Get the total number of assignments for the technician
    const assignmentCount = await prisma.assignment.count({
      where: { technician_id: technician_id },
    });

    // Update the workload for all assignments of this technician to the total count
    await prisma.assignment.updateMany({
      where: { technician_id: technician_id },
      data: {
        work_load: assignmentCount, // Set the work_load for all assignments to the total number of tasks
      },
    });

    // Optional: Update the request status
    await prisma.maintenanceRequest.update({
      where: { request_id: requestId },
      data: { status: 'Assigned' },
    });

    return res.status(200).json({
      message:
        'Technician assigned successfully, workload updated for all assignments',
      assignment: newAssignment,
    });
  } catch (error) {
    console.error('Error assigning technician:', error);
    res.status(500).json({ error: 'Failed to assign technician' });
  }
};

// const assignTechnicianToTasks = async (req: Request, res: Response) => {
//   const { requestId } = req.body;
//   const technician_id = parseInt(req.params.id, 10);

//   try {
//     const request = await prisma.maintenanceRequest.findUnique({
//       where: { request_id: requestId },
//     });

//     if (!request) {
//       return res.status(404).json({ error: 'Maintenance request not found' });
//     }

//     // Check if the technician already has any task (assignment)
//     // const existingAssignment = await prisma.assignment.findFirst({
//     //   where: {
//     //     technician_id: technician_id, // Check if the technician has any task
//     //   },
//     // });
//     const newAssignment = await prisma.assignment.create({
//       data: {
//         technician_id: technician_id,
//         request_id: requestId,
//         work_load: 1, // Start with a workload of 1 for each new task
//       },
//     });

//     await prisma.assignment.updateMany({
//       where: { technician_id: technician_id },
//       data: {
//         work_load: {
//           increment: 1, // Increment workload by 1 on new assignment
//         },
//       },
//     });

//     // if (existingAssignment) {
//     //   // Technician already has this assignment, so you can update the workload (if needed)
//     //   await prisma.assignment.update({
//     //     where: { assignment_id: existingAssignment.assignment_id },
//     //     data: {
//     //       work_load: {
//     //         increment: 1, // Increment the workload by 1
//     //       },
//     //     },
//     //   });
//     // } else {
//     //   // Create a new assignment if the technician has no tasks
//     //   const newAssignment = await prisma.assignment.create({
//     //     data: {
//     //       technician_id: technician_id,
//     //       request_id: requestId,
//     //       work_load: 1, // Start with a workload of 1 for the first task
//     //     },
//     //   });

//       // Optional: Update the request status
//       await prisma.maintenanceRequest.update({
//         where: { request_id: requestId },
//         data: { status: 'Assigned' },
//       });

//       return res.status(200).json({
//         message: 'Technician assigned successfully with new assignment',
//         assignment: newAssignment,
//       });
//     }

//     res.status(200).json({ message: 'Technician workload updated' });
//   } catch (error) {
//     console.error('Error assigning technician:', error);
//     res.status(500).json({ error: 'Failed to assign technician' });
//   }
// };
const requestAndAssignedTechnicianDetail = async (
  req: Request,
  res: Response
) => {
  try {
    // Fetch the requests with assigned technicians and their workloads
    const requests = await prisma.maintenanceRequest.findMany({
      where: {
        status: 'Assigned', // Fetch only assigned requests
      },
      include: {
        // department: {
        //   department_id: true,
        // },
        Assignments: {
          include: {
            user: true, // Include technician details (user table)
          },
        },
      },
    });

    // Send back the fetched data
    return res.status(200).json(requests);
  } catch (error) {
    console.error('Error fetching requests:', error);
    return res.status(500).json({ error: 'Failed to fetch requests' });
  }
};

const singleRequestDetailWithTechnician = async (
  req: Request,
  res: Response
) => {
  const request_id = parseInt(req.params.id, 10);

  try {
    // Fetch the request details along with its assignments
    const request = await prisma.maintenanceRequest.findUnique({
      where: { request_id: Number(request_id) },
      include: { Assignments: true }, // Include assignments in the request details
    });

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    // Get the list of technician IDs from the Assignments
    const technicianIds = request.Assignments.map(assignment => assignment.technician_id);

    // Fetch the technician names from the user table based on the technician IDs
    const technicians = await prisma.user.findMany({
      where: { user_id: { in: technicianIds } },
      select: { user_id: true, username: true }, // Select only the user_id and username fields
    });

    // Map the technician names to their corresponding assignments
    const assignmentsWithTechnicians = request.Assignments.map(assignment => {
      const technician = technicians.find(tech => tech.user_id === assignment.technician_id);
      return {
        ...assignment,
        technician_name: technician ? technician.username : 'Unknown',
      };
    });

    // Attach the updated assignments back to the request object
    const requestWithTechnicians = {
      ...request,
      Assignments: assignmentsWithTechnicians,
    };

    res.status(200).json(requestWithTechnicians);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch request' });
  }
};

export {
  assignTechnician,
  assignTechnicianToTasks,
  requestAndAssignedTechnicianDetail,
  singleRequestDetailWithTechnician,
};
