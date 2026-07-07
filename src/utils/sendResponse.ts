import { Response } from "express";

type TResponseData<T> ={

  success: boolean;
  statusCode: number;
  message: string;
  data?: T;
 meta?: {
    total?: number;
    page?: number;    
}
}

 export const sendResponse = <T>(res: Response, data: TResponseData<T>) => {
  res.status(data.statusCode).json(data);
};