import 'reflect-metadata';

import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

import { ILoggerService } from '../logger/logger.service';
import { TYPES } from './../types';
import { IExceptionFilter } from './exception.filter.interface';
import { HttpError } from './http.error.class';

@injectable()
export class ExceptionFilter implements IExceptionFilter {
	constructor(@inject(TYPES.ILoggerService) private logger: ILoggerService) {}

	catch(err: Error | HttpError, _req: Request, res: Response, _next: NextFunction) {
		if (err instanceof HttpError) {
			this.logger.error(`[${err?.errorCtx ?? ''}] Error ${err.statusCode}: ${err.message}`)
			return res.status(err.statusCode).send({ error: err.message })
		}

		this.logger.error(`${err.message}`)
		res.status(500).send({ error: err.message })
	}
}
