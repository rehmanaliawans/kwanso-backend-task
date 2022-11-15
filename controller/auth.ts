import { NextFunction, Request, Response } from "express";

exports.signUp = async (req: Request, res:Response, next:NextFunction) => {
  console.log("function call");
};
