import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

const prisma = new PrismaClient();

export const getCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await prisma.customers.findMany();
    return res.status(200).json({
      code: 200,
      message: "Get customers successfully",
      data: customers,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: "Internal server error",
    });
  }
};

export const getCustomer = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const customer = await prisma.customers.findFirst({
      where: {
        customerId: id,
      },
    });
    if (!customer) {
      return res.status(404).json({
        code: 404,
        message: "Customer not found",
      });
    } else {
      return res.status(200).json({
        code: 200,
        message: `Get customer by ${id} successfully`,
        data: customer,
      });
    }
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: "Internal server error",
    });
  }
};

export const createCustomer = async (req: Request, res: Response) => {
  try {
    const birthDate = new Date(req.body.dateOfBirth);
    const customer = await prisma.customers.create({
      data: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        gender: req.body.gender,
        dateOfBirth: birthDate,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        address: req.body.address,
      },
    });

    return res.status(201).json({
      code: 201,
      message: "Create customer successfully",
      data: customer,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: "Internal server error",
    });
  }
};

export const updateCustomer = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (req.body.email) {
    return res.status(400).json({
      code: 400,
      message: "Email cannot be updated",
    });
  }
  try {
    const customerExists = await prisma.customers.findUnique({
      where: {
        customerId: id,
      },
    });

    if (!customerExists) {
      return res.status(404).json({
        code: 404,
        message: "Customer not found",
      });
    }
    const birthDate = new Date(req.body.dateOfBirth);

    const payload = {
      ...req.body,
    };
    if (req.body.dateOfBirth) {
      payload.dateOfBirth = birthDate;
    }
    const customer = await prisma.customers.update({
      where: {
        customerId: id,
      },
      data: payload,
    });
    return res.status(200).json({
      code: 200,
      message: "Update customer successfully",
      data: customer,
    });
  } catch (error) {
    console.log("errror", error);

    return res.status(500).json({
      code: 500,
      message: "Internal server error",
      error: error,
    });
  }
};

export const deleteCustomer = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const customerExists = await prisma.customers.findUnique({
      where: {
        customerId: id,
      },
    });

    if (!customerExists) {
      return res.status(404).json({
        code: 404,
        message: "Customer not found",
      });
    }

    const customer = await prisma.customers.delete({
      where: {
        customerId: id,
      },
    });

    return res.status(200).json({
      code: 200,
      message: "Delete customer successfully",
      data: customer,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: "Internal server error",
    });
  }
};
