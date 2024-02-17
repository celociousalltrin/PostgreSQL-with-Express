import { Request, Response } from "express";

import { errorResponse, successResponse } from "../utils/response-handler";
import { responseMessage } from "../utils/response-message";
import { prisma } from "../config/prisma-config";

export const createLike = [
  async (req: Request, res: Response) => {
    try {
      const {
        params: { post_id },
        userDetails: { id },
      } = req;

      await prisma.likes.create({
        data: {
          user: {
            connect: {
              id,
            },
          },
          posts: {
            connect: {
              id: post_id,
            },
          },
        },
      });

      return successResponse({
        res,
        responseDetails: responseMessage("OK006"),
      });
    } catch (err: any) {
      console.log("🚀 ~ async ~ err:", err);
      errorResponse({ res, responseDetails: responseMessage("ER999") });
    }
  },
];

export const deleteLike = [
  async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      await prisma.likes.update({
        where: {
          id,
        },
        data: {
          isDeleted: true,
        },
      });
      return successResponse({
        res,
        responseDetails: responseMessage("OK007"),
        new_access_token: req.new_access_token,
      });
    } catch (err: any) {
      console.log("🚀 ~ async ~ err:", err);
      errorResponse({ res, responseDetails: responseMessage("ER999") });
    }
  },
];
