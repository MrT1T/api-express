import type { Request, Response, NextFunction } from 'express';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

import type { IMiddleware } from './route.interface';

export class ValidateMiddleware implements IMiddleware {
	constructor(private classToValidate: ClassConstructor<object>) {}

	execute({ body }: Request, res: Response, next: NextFunction): void {
		console.log('ValidateMiddleware');
		const instance = plainToClass(this.classToValidate, body);
		console.log('tyt');
		validate(instance).then((errors) => {
			if (errors.length > 0) {
				res.status(422).json(errors);
			} else {
				next();
			}
		});
	}
}
