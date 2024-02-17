import { prisma } from "../config/prisma-config";
import { type TValidLengthTypes, TValidTypes } from "./types";

export const isvalid = async ({
  table_name,
  field_name,
  value,
}: TValidTypes) => {
  const data = await (prisma[table_name] as any).findUnique({
    where: { [field_name]: value },
  });
  return !!data;
};

export const isvalidWithLength = async ({
  table_name,
  field_name,
  value,
  length,
}: TValidLengthTypes) => {
  const data = await (prisma[table_name] as any).findMany({
    where: { [field_name]: value },
  });
  return data.length >= length;
};
