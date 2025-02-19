import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

import crypto from 'crypto'; // Add this import
import emailjs from 'emailjs-com'; // Import EmailJS


const prisma = new PrismaClient();


// Add a memory store for verification codes (consider using a more robust solution for production)
const verificationCodes = new Map();

export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const trimmedUsername = username.trim();
  // console.log(req.body);

  console.log(username);
  const user = await prisma.user.findUnique({
    where: { username: trimmedUsername },
  });
  // console.log(user);

  try {
    const user = await prisma.user.findUnique({
      where: { username: username },
    });

    if (!user) {
      console.log("User not found:", username);
      return res.status(401).json({ message: "Invalid username or password." });
    }

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      console.log("Password comparison:", isMatch);

      if (!isMatch) {
        return res.status(401).json({ message: "Invalid password." });
      }

      const secret = process.env.JWT_KEY as string;

      if (!secret) {
        throw new Error("No token key is specified in environment variable");
      }
      const token = jwt.sign(
        { userId: user.user_id,  username: user.username, departementId : user.department_id , role: user.role },
        secret,
        {
          expiresIn: "1h",
        }
      );
      console.log("username:", user.username, "role:", user.role);

      // Set token in HTTP-only cookie
      res.setHeader(
        "Set-Cookie",
        `authToken=${token}; HttpOnly; Path=/; Max-Age=3600000000`
      );

      res.json({ user: { username: user.username, role: user.role }, token });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};



export const requestPasswordReset = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    // Check if the email exists in the database
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "This email is not registered in our database." });
    }

    // If the email exists, generate a verification code
    const code = crypto.randomInt(100000, 999999).toString();
    verificationCodes.set(email, code);
    console.log('EmailJS data:', {
      to_name: user.username,
      to_email: email,
      verification_code: code
    });
    // Send the verification code via EmailJS
    await emailjs.send('service_qnkr0zl', 'template_x8ebqpr', {
      to_name: user.username, // Ensure you have the user's name
      to_email: email,
      verification_code: code
    }, 'lWHM5CfXyjJ7yzSUU');

    res.status(200).json({ message: "Verification code sent to your email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


export const verifyCode = async (req: Request, res: Response) => {
  const { email, code } = req.body;

  if (verificationCodes.get(email) === code) {
    verificationCodes.delete(email); // Remove the code after successful verification
    res.status(200).json({ message: "Verification successful" });
  } else {
    res.status(400).json({ message: "Invalid verification code" });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const { email, newPassword } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    res.status(200).json({ message: "Password updated successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

