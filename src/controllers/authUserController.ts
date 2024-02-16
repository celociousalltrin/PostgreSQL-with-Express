import { Request, Response } from "express";
import { customError } from "../utils/common-function";
import { successResponse } from "../utils/response-handler";
import { responseMessage } from "../utils/response-message";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createUser = [
  async (req: Request, res: Response) => {
    try {
      return successResponse({
        res,
        responseDetails: responseMessage("OK001"),
      });
    } catch (err: any) {
      console.log("🚀 ~ async ~ err:", err);
      customError(res, err);
    }
  },
];
