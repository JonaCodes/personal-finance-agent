import { Request, Response } from 'express';
import { fetchDummyData } from '../services/dataService';

export const getDummyData = (_: Request, res: Response): void => {
  const data = fetchDummyData();
  res.json(data);
};
