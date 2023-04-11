import { NextFunction, Router, Request, Response } from 'express';

export interface UserProps {
	login: (req: Request, res: Response, next: NextFunction) => void;
	register: (req: Request, res: Response, next: NextFunction) => void;
}
