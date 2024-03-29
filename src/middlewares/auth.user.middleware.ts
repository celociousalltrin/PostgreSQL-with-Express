import jwt from "jsonwebtoken";
import { NextFunction, Response, Request } from "express";
import { responseMessage } from "../utils/response-message";
import { errorResponse } from "../utils/response-handler";
import { tokenVerification } from "../utils/common-function";
import { prisma } from "../config/prisma-config";
import type { User } from "@prisma/client";

//Declaration Merging
declare global {
  namespace Express {
    interface Request {
      new_access_token?: string;
      userDetails: User;
    }
  }
}

//Augmentation
// declare module "express" {
//   interface Request {
//     new_access_token?: string;
//     userDetails: Record<string, any>;
//   }
// }

export const authUserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers;

    const access_token = authorization?.split(" ")[1];

    const refresh_token = req?.cookies?.refresh_token;

    if (!access_token)
      return errorResponse({
        res,
        responseDetails: responseMessage("ER901"),
        status: 401,
      });

    if (!refresh_token)
      return errorResponse({
        res,
        responseDetails: responseMessage("ER901"),
        status: 401,
      });

    const accessTokenVerify = jwt.verify(
      access_token,
      process.env.ACCESS_TOKEN_SECRET as string,
      (err, decoded) => tokenVerification(err, decoded, "accessToken", req)
    ) as Record<string, any> | undefined | string;

    const refreshTokenVerify = jwt.verify(
      refresh_token,
      process.env.REFRESH_TOKEN_SECRET as string,
      (
        err: jwt.VerifyErrors | null,
        decoded: string | jwt.JwtPayload | undefined
      ) => tokenVerification(err, decoded, "refreshToken", req)
    ) as Record<string, any> | undefined | string;

    if (
      accessTokenVerify === "JsonWebTokenError" ||
      refreshTokenVerify === "JsonWebTokenError" ||
      (refreshTokenVerify as { refresh_token_expired: boolean })
        ?.refresh_token_expired
    ) {
      return errorResponse({
        res,
        responseDetails: responseMessage("ER901"),
        status: 401,
      });
    }

    const userDetails = await prisma.user.findUnique({
      where: {
        email: (refreshTokenVerify as { user_email: string })?.user_email,
      },
      include: {
        profile: true,
      },
    });

    if (!userDetails) {
      return errorResponse({
        res,
        responseDetails: responseMessage(userDetails ? "ER903" : "ER902"),
        status: 401,
      });
    } else {
      req.userDetails = userDetails;
    }

    next();
  } catch (err) {
    console.log("🚀 ~ authUserMiddleware ~ err:", err);
  }
};
