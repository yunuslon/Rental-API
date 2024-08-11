import { ValidationChain, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

export const validate = (rules: ValidationChain[]) => [
  rules,
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        code: 422,
        message: "Unprocessable Entity",
        errors: errors.array(),
      });
    }
    next();
  },
];
