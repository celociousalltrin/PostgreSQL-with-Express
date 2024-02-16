import { Request, Response } from "express";
import { errorResponse, successResponse } from "../utils/response-handler";
import { responseMessage } from "../utils/response-message";

export const createNotification = [
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

export const readNotification = [
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

export const clearNotification = [
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
