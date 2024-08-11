import { check, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";
import { validate } from "./validate";

const rulesPost = [
  check("firstName")
    .isString()
    .notEmpty()
    .withMessage("First firstName is required")
    .isAlpha()
    .withMessage("First firstName should contain only letters")
    .trim()
    .escape(),

  check("lastName")
    .isString()
    .notEmpty()
    .withMessage("Last name is required")
    .isAlpha()
    .withMessage("Last name should contain only letters")
    .trim()
    .escape(),

  check("gender")
    .notEmpty()
    .withMessage("Gender is required")
    .isIn(["Male", "Female", "Other"])
    .withMessage("Gender must be Male, Female, or Other")
    .trim()
    .escape(),

  check("dateOfBirth")
    .notEmpty()
    .withMessage("Date of Birth is required")
    .isDate({ format: "MM-DD-YYYY" })
    .withMessage("Date of Birth must be in MM-DD-YYYY format")
    .trim()
    .escape(),

  check("phoneNumber")
    .notEmpty()
    .withMessage("Phone number is required")
    .isLength({ min: 10, max: 13 })
    .withMessage("Phone number must be between 10 and 13 digits")
    .isMobilePhone("id-ID")
    .withMessage("Phone number must be a valid Indonesian number")
    .trim()
    .escape(),

  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email must be a valid email address")
    .trim()
    .escape(),
  check("address")
    .notEmpty()
    .withMessage("Address is required")
    .isLength({ min: 10 })
    .withMessage("Address must be at least 10 characters long")
    .trim()
    .escape(),
];


const rulesUpdate = [
  check("firstName")
    .isString()
    .isAlpha()
    .withMessage("First firstName should contain only letters")
    .trim()
    .escape(),

  check("lastName")
    .isString()
    .isAlpha()
    .withMessage("Last name should contain only letters")
    .trim()
    .escape(),

  check("gender")
    .isIn(["Male", "Female", "Other"])
    .withMessage("Gender must be Male, Female, or Other")
    .trim()
    .escape(),

  check("dateOfBirth")
    .isDate({ format: "MM-DD-YYYY" })
    .withMessage("Date of Birth must be in MM-DD-YYYY format")
    .trim()
    .escape(),

  check("phoneNumber")
    .isLength({ min: 10, max: 13 })
    .withMessage("Phone number must be between 10 and 13 digits")
    .isMobilePhone("id-ID")
    .withMessage("Phone number must be a valid Indonesian number")
    .trim()
    .escape(),

  check("address")
    .isLength({ min: 10 })
    .withMessage("Address must be at least 10 characters long")
    .trim()
    .escape(),
];

const v_PostCustomer = validate(rulesPost);
const v_UpdateCustomer = validate(rulesUpdate);


export { v_PostCustomer, v_UpdateCustomer };
