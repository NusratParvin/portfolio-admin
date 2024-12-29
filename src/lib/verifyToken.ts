/* eslint-disable @typescript-eslint/no-unused-vars */
import { jwtDecode } from "jwt-decode";

export const decodeToken = (token: string) => {
  return jwtDecode(token);
};
