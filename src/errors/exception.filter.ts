import { Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'inversify';

import { IExceptionFilter } from './exception.filter.interface.js';
import { HttpError } from './http-error.class.js';
import { ILoggerService } from '../logger/logger.interface.js';
import { TYPES } from '../types.js';

@injectable()
export class ExceptionFilter implements IExceptionFilter {
	constructor(@inject(TYPES.ILoggerService) private logger: ILoggerService) {}

	catch(err: Error | HttpError, req: Request, res: Response, next: NextFunction) {
		if (err instanceof HttpError) {
			this.logger.error(
				`HTTP Error: ${err.message}, Status Code: ${err.statusCode}, Context: ${err.context}`,
			);
			res.status(err.statusCode).send({ error: err.message });
		} else {
			this.logger.error(`Error: ${err.message}`);
			res.status(500).send({ error: err.message });
		}
	}
}
