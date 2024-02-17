import { PrismaClient } from "@prisma/client";
import type { User } from "@prisma/client";

export type TValidLengthTypes = {
  table_name: keyof PrismaClient;
  field_name: keyof User;
  value: unknown;
  length: number;
};

export type TValidTypes = Omit<TValidLengthTypes, "length">;
