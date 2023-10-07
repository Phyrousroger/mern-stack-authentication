import { Request, Response } from "express";
import prisma from "../../prisma/seed";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

export const Register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res
        .status(422)
        .json({ message: "your email password and username is required" });
    }

    /** checking email to be unique */
    const exitingemail = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (exitingemail) {
      return res
        .status(400)
        .json({ message: "your email is already registered!" });
    }

    /** encryption password to be safe */
    const hashedPassword = await bcrypt.hash(password, 12);
    console.log({ hashedPassword });

    /**  first user registered */

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    return res.status(200).json({ user });
  } catch (err) {
    return res.status(500).json({ err: "internal server error" });
  }
};

export const Login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "your email and password is required!" });
    }

    const exitingemail = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (!exitingemail) {
      return res
        .status(400)
        .json({ message: "your email or password is not correct!" });
    }

    const validatePassword = await bcrypt.compare(
      password,
      exitingemail.password
    );
    if (!validatePassword) {
      return res
        .status(400)
        .json({ message: "your email or password is not correct!" });
    }

    if (exitingemail && validatePassword) {
      const accesstoken = jwt.sign(
        {
          userId: exitingemail.id,
        },
        process.env.JWT_ACCESS_SECRET as string,
        {
          expiresIn: "1h",
        }
      );
      const refreshtoken = jwt.sign(
        {
          userId: exitingemail.id,
          uuidv4,
        },
        process.env.JWT_REFRESH_SECRET as string,
        {
          expiresIn: "8h",
        }
      );

      console.log({ email, password });
      return res.status(200).json({ refreshtoken, accesstoken });
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};
