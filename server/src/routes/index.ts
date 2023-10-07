import { Request, Response, Router } from "express";
import prisma from "../../prisma/seed";

import env from "dotenv";

env.config();
import Authenticated from "../middleware/Authentication";
import { IRequest } from "../types/express";
import { Login, Register } from "../controller/Appcontroller";
const router = Router();

router.post("/auth/register", Register);

router.post("/auth/login", Login);

router.get(
  "/auth/profile",
  Authenticated,
  async (req: IRequest, res: Response) => {
    try {
      const { userId } = req.user;
      const userData = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
      console.log({ userData });

      return res.status(200).json({ message: "your are in dashboard here!" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal hello Server Error" });
    }
  }
);

// router.post("/auth/refresh-token", async (req: Request, res: Response) => {
//   try {
//     const { refreshToken } = req.body;

//     console.log({ refreshToken });
//     if (!refreshToken) {
//       return res
//         .status(400)
//         .json({ message: "your refreshtoken is required!" });
//     }

//     const payload = jwt.verify(
//       refreshToken,
//       process.env.JWT_REFRESH_SECRET as string
//     );

//     // const savedRefreshToken = await prisma.refreshToken.findUnique({
//     //   where: {
//     //     id: payload,
//     //   },
//     // });

//     console.log(payload);

//     // console.log(savedRefreshToken);
//     return res
//       .status(400)
//       .json({ message: "your refresh token is successful!" });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ message: "Internal Server error!" });
//   }
// });

export default router;
