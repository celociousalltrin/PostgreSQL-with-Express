import { responseDetailsTypes } from "./utils-types";

const responseData = [
  { code: "OK001", message: "User Created Successfully" },
  { code: "OK002", message: "Login in SuccessFully" },
  { code: "OK003", message: "Post has been Created" },
  { code: "OK004", message: "Post has been Updated" },
  { code: "OK005", message: "Post has been deleted" },

  { code: "ER999", message: "Something went wrong" },

  { code: "ER001", message: "Requested Page not found" },
  { code: "ER002", message: "UserName Already Exist" },
  { code: "ER003", message: "Email Already Exist" },
  { code: "ER004", message: "Email Address Not Found" },
  { code: "ER005", message: "Please Enter Correct Password" },

  { code: "ER901", message: "Please Autheticate" },
  { code: "ER902", message: "No User Found" },
  { code: "ER903", message: "User Account is Deleted" },
] as const;

export const responseMessage = (
  code: (typeof responseData)[number]["code"]
): responseDetailsTypes => {
  const info = responseData.find(
    (o) => o.code === code
  ) as responseDetailsTypes;
  return info;
};
