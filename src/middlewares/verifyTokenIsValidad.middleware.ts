import { NextFunction, Request, Response } from "express";
import "dotenv/config";
import jwt from "jsonwebtoken";
import { AppError } from "../error";

const verifyTokenIsValidadMid = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let token: string | undefined = req.headers.authorization;

  if (!token) {
    throw new AppError("Missing bearer token", 401);
  }

  token = token.split(" ")[1];

  const tokenCompare = jwt.verify(
    token,
    process.env.SECRET_KEY!,
    (err: any, decoded: any) => {
      if (err) {
        throw new AppError(err.message, 401);
      }
      res.locals.userEmail = decoded.email;
    }
  );

  res.locals.token = token;

  return next();
};

export { verifyTokenIsValidadMid };
