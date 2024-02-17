import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { errorResponse, successResponse } from "../utils/response-handler";
import { responseMessage } from "../utils/response-message";
import { prisma } from "../config/prisma-config";
import {
  assignRefreshTokeninCookie,
  dataHashing,
  generateAccessToken,
} from "../utils/common-function";
import { isvalid } from "../service/validationService";

export const createUser = [
  async (req: Request, res: Response) => {
    try {
      const {
        body: { email, userName, password, ...rest },
      } = req;

      const hashed_password = dataHashing(password);

      const isEmailExist = await isvalid({
        table_name: "user",
        field_name: "email",
        value: email,
      });

      if (isEmailExist) {
        return errorResponse({
          res,
          responseDetails: responseMessage("ER002"),
          status: 422,
        });
      }

      const isUserNameExist = await isvalid({
        table_name: "user",
        field_name: "userName",
        value: userName,
      });

      if (isUserNameExist) {
        return errorResponse({
          res,
          responseDetails: responseMessage("ER003"),
          status: 422,
        });
      }

      await prisma.user.create({
        data: {
          email,
          password: hashed_password,
          userName,
          profile: {
            create: rest,
          },
        },
      });

      return successResponse({
        res,
        responseDetails: responseMessage("OK001"),
      });
    } catch (err: any) {
      console.log("🚀 ~ err:", err);
      errorResponse({ res, responseDetails: responseMessage("ER999") });
    }
  },
];

export const Login = [
  async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const user = await prisma.user.findUnique({
        where: {
          email,
        },
        include: {
          profile: true,
        },
      });

      if (!user) {
        return errorResponse({
          res,
          responseDetails: responseMessage("ER003"),
          status: 404,
        });
      }

      const { email: user_email, userName, profile } = user;

      const hash = bcrypt.compareSync(password, user.password as string);

      if (!hash)
        return errorResponse({
          res,
          responseDetails: responseMessage("ER004"),
          status: 404,
        });

      assignRefreshTokeninCookie(res, { user_email: user.email });
      const result = {
        user_email,
        userName,
        name: profile?.name,
        gender: profile?.gender,
        address: profile?.address,
        access_token: generateAccessToken({ user_email }),
      };
      return successResponse({
        res,
        responseDetails: responseMessage("OK002"),
        response_data: result,
      });
    } catch (err: any) {
      console.log("🚀 ~ err:", err);
      errorResponse({ res, responseDetails: responseMessage("ER999") });
    }
  },
];
