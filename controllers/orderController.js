import { StatusCodes } from 'http-status-codes';

export const getAllOrders = async (req, res) => {
  return res.status(StatusCodes.OK).json({
    status: 'success',
    message: 'getAllOrders',
  });
};

export const getSingleOder = async (req, res) => {
  return res.status(StatusCodes.OK).json({
    status: 'success',
    message: 'getSingleOder',
  });
};

export const getCurrentUserOrders = async (req, res) => {
  return res.status(StatusCodes.OK).json({
    status: 'success',
    message: 'getCurrentUserOrders',
  });
};

export const createOrder = async (req, res) => {
  return res.status(StatusCodes.OK).json({
    status: 'success',
    message: 'createOrder',
  });
};

export const updateOrder = async (req, res) => {
  return res.status(StatusCodes.OK).json({
    status: 'success',
    message: 'updateOrder',
  });
};
