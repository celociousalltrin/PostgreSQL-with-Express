import { Request, Response } from "express";
import { errorResponse, successResponse } from "../utils/response-handler";
import { responseMessage } from "../utils/response-message";
import { prisma } from "../config/prisma-config";
import { record_limit } from "../utils/helper";

export const createPost = [
  async (req: Request, res: Response) => {
    try {
      const { id } = req.userDetails;
      const [result] = await prisma.$transaction([
        prisma.post.create({
          data: {
            ...req.body,
            user: {
              connect: {
                id,
              },
            },
          },
        }),
        prisma.notifications.create({
          data: {
            type: "Post",
            user: {
              connect: {
                id,
              },
            },
          },
        }),
      ]);

      return successResponse({
        res,
        responseDetails: responseMessage("OK003"),
        response_data: result,
      });
    } catch (err: any) {
      console.log("🚀 ~ async ~ err:", err);
      errorResponse({ res, responseDetails: responseMessage("ER999") });
    }
  },
];

export const updatePost = [
  async (req: Request, res: Response) => {
    const {
      params: { id },
      body,
    } = req;

    try {
      const result = await prisma.post.update({
        where: {
          id,
        },
        data: { ...body, updatedAt: new Date() },
      });
      return successResponse({
        res,
        responseDetails: responseMessage("OK004"),
        new_access_token: req.new_access_token,
        response_data: result,
      });
    } catch (err: any) {
      console.log("🚀 ~ async ~ err:", err);
      errorResponse({ res, responseDetails: responseMessage("ER999") });
    }
  },
];

export const getSinglePost = [
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const result = await prisma.post.findUnique({
        where: {
          id,
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

export const getPosts = [
  async (req: Request, res: Response) => {
    try {
      const { skip = 0, limit = record_limit } = req.query;

      const result = await prisma.post.findMany({
        where: {
          isDeleted: false,
        },
        skip: Number(skip),
        take: Number(limit),
        orderBy: {
          createdAt: "desc",
        },
        select: {
          title: true,
          description: true,
          createdAt: true,
          updatedAt: true,
          user: {
            select: {
              userName: true,
              email: true,
              profile: {
                select: {
                  name: true,
                },
              },
            },
          },
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

export const deletePost = [
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await prisma.post.update({
        where: {
          id,
        },
        data: {
          isDeleted: true,
        },
      });
      return successResponse({
        res,
        responseDetails: responseMessage("OK005"),
        new_access_token: req.new_access_token,
      });
    } catch (err: any) {
      console.log("🚀 ~ async ~ err:", err);
      errorResponse({ res, responseDetails: responseMessage("ER999") });
    }
  },
];
