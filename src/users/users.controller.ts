import { BaseController } from '../common/base.controller';
import { NextFunction, Router, Request, Response } from 'express';
import { HttpError } from '../error/http-error.class';
import { injectable, inject } from 'inversify';
import { LoggerProps } from '../logger/logger.interface';
import { TYPES } from '../types';
import 'reflect-metadata';
import { UserProps } from './user.interface';
import { userLoginDto } from './dto/userLogin.dto';
import { userRegisterDto } from './dto/userRegister.dto';

@injectable()
export class UserController extends BaseController implements UserProps {
	constructor(@inject(TYPES.LoggerProps) private loggerService: LoggerProps) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/register',
				method: 'post',
				func: this.register,
			},
			{
				path: '/login',
				method: 'post',
				func: this.login,
			},
		]);
	}

	login(req: Request<{}, {}, userLoginDto>, res: Response, next: NextFunction): void {
		console.log(req.body);
		next(new HttpError(401, 'ошибка авторизации', 'login'));
	}

	register(req: Request<{}, {}, userRegisterDto>, res: Response, next: NextFunction): void {
		console.log(req.body);
		this.ok(res, 'register');
	}
}
