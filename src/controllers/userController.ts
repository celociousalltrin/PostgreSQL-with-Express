import { Request, Response } from "express";
import { errorResponse, successResponse } from "../utils/response-handler";
import { responseMessage } from "../utils/response-message";
import { prisma } from "../config/prisma-config";

export const getUser = [
  async (req: Request, res: Response) => {
    try {
      const { id } = req.userDetails;

      const result = await prisma.user.findUnique({
        where: {
          id,
        },
        include: {
          profile: true,
        },
      });

      return successResponse({
        res,
        response_data: result,
        new_access_token: req.new_access_token,
      });
    } catch (err: any) {
      console.log("🚀 ~ async ~ err:", err);
      errorResponse({ res, responseDetails: responseMessage("ER999") });
    }
  },
];

export const deleteUser = [
  async (req: Request, res: Response) => {
    try {
      return successResponse({
        res,
        responseDetails: responseMessage("OK001"),
      });
    } catch (err: any) {
      console.log("🚀 ~ async ~ err:", err);
      errorResponse({ res, responseDetails: responseMessage("ER999") });
    }
  },
];
