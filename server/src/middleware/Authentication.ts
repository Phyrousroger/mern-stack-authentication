import { NextFunction, Response } from "express";
import { IRequest } from "../types/express";

import jwt from "jsonwebtoken";

const Authenticated = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "unauthorized error" });
  }
  try {
    if (authHeader && authHeader.startsWith("Bearer")) {
      const token = authHeader.split(" ")[1];
      if (token) {
        jwt.verify(
          token,
          process.env.JWT_ACCESS_SECRET as string,
          async (err: any, user: any) => {
            if (err) {
              return res.json(401).json({ message: "unauthorized error!" });
            }
            req.user = { userId: user.userId };
            next();
          }
        );
      } else {
        return res
          .status(401)
          .json({ message: "unauthorization error and token is missing!" });
      }
    } else {
      return res.status(401).json({ message: "Invalid Token format!" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ messgae: "Internal server Error!" });
  }
};

export default Authenticated;
