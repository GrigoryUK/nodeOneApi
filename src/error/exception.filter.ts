import { Response, Request, NextFunction } from 'express';
import { ExceptionFilterInterfaceProps } from './exception.filter.interface';
import { HttpError } from './http-error.class';
import { injectable, inject } from 'inversify';
import { LoggerProps } from '../logger/logger.interface';
import { TYPES } from '../types';
import 'reflect-metadata';

@injectable()
export class ExceptionFilter implements ExceptionFilterInterfaceProps {
	constructor(@inject(TYPES.LoggerProps) private logger: LoggerProps) {}

	catch(err: Error | HttpError, req: Request, res: Response, next: NextFunction) {
		if (err instanceof HttpError) {
			this.logger.error(`${err.context} Ошибка ${err.statusCode} : ${err.message}`);
			res.status(err.statusCode).send({ err: err.message });
		} else {
			this.logger.error(`${err.message}`);
			res.status(500).send({ err: err.message });
		}
	}
}
