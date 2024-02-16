import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { tokenGenertionDataTypes } from "./utils-types";

export const generateEnnumErrorMessage = (props: Record<string, any>) => {
  const y = props.enumValues.join(", ");
  return `${props.value} is not a valid value for ${props.path}. Allowed values are ${y}`;
};

export const dataHashing = (data: string) => {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(data, salt);
  return hash;
};

export const generateAccessToken = (
  data: tokenGenertionDataTypes,
  expiresIn = "15m"
) => {
  return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET as string, {
    expiresIn,
  });
};

const generateRefreshToken = (
  data: tokenGenertionDataTypes,
  expiresIn: string
) => {
  return jwt.sign(data, process.env.REFRESH_TOKEN_SECRET as string, {
    expiresIn,
  });
};

export const assignRefreshTokeninCookie = (
  res: Response,
  data: tokenGenertionDataTypes,
  expiresIn = "12h"
) => {
  //Cookie expire time needs to set in milliseconds
  res.cookie("refresh_token", generateRefreshToken(data, expiresIn), {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    maxAge: 12 * 60 * 60 * 1000,
  });
};

export const tokenVerification = (
  err: jwt.VerifyErrors | null,
  decoded: string | jwt.JwtPayload | undefined,
  tokenType: string,
  req: Request
) => {
  switch (err?.name) {
    case "JsonWebTokenError":
      return err?.name;
    case "TokenExpiredError":
      if (tokenType === "accessToken") {
        req.new_access_token = generateAccessToken({
          user_email: (decoded as { user_email: string })?.user_email,
        });
      } else {
        return { refresh_token_expired: true };
      }
      return { is_expired: true };
    default:
      return decoded;
  }
};

const otpLength = (len: number) => {
  return parseInt("1" + "0".repeat(len));
};

export const OtpGenerator = (length = 4) => {
  return Math.floor(Math.random() * otpLength(length))
    .toString()
    .padStart(4, "0");
};

export const getFrontEndAppURL = (environment: string) => {
  if (environment === "development") {
    return "http://127.0.0.1:5174";
  } else {
    return process.env.REACT_APP_URL as string;
  }
};

export const getBackEndAppURL = (environment: string) => {
  if (environment === "development") {
    return "http://localhost:7777/api";
  } else {
    return process.env.EXPRESS_APP_URL as string;
  }
};

export const dateInMilliseconds = (number: number, format = "minutes") => {
  switch (format) {
    case "seconds":
      return number * 1000;
    case "minutes":
      return number * 60 * 1000;
    case "hours":
      return number * 60 * 60 * 1000;
    case "days":
      return number * 24 * 60 * 60 * 1000;
    case "weeks":
      return number * 7 * 24 * 60 * 60 * 1000;
    case "months":
      return number * 30 * 24 * 60 * 60 * 1000;
    case "years":
      return number * 365 * 24 * 60 * 60 * 1000;
    default:
      return 0;
  }
};
