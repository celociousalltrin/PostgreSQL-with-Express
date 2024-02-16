import { responseDetailsTypes } from "./utils-types";

const responseData = [
  { code: "OK001", message: "User Created Successfully" },
  { code: "ER999", message: "Something went wrong" },
  { code: "ER001", message: "Requested Page not found" },
  { code: "ER901", message: "Please Autheticate" },
  { code: "ER902", message: "No User Found" },
] as const;

export const responseMessage = (
  code: (typeof responseData)[number]["code"]
): responseDetailsTypes => {
  const info = responseData.find(
    (o) => o.code === code
  ) as responseDetailsTypes;
  return info;
};
