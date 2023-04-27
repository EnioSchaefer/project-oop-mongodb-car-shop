import { NextFunction, Request, Response } from 'express';

function ValidateId(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  const idRegex = /^[a-f\d]{24}$/i;

  const idValidation = id.match(idRegex);
  
  if (!idValidation) return res.status(422).json({ message: 'Invalid mongo id' });

  return next();
}

export default ValidateId;