import type { Request, Response, NextFunction } from 'express';

import { BaseController } from '../common/base.controller.js';
import { HttpError } from '../errors/http-error.class.js';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types.js';

import { IUsersController } from './users.controller.interface.js';
import { UserRegisterDto } from './dto/user-register.dto.js';
import { UserLoginDto } from './dto/user-login.dto.js';
import { ValidateMiddleware } from '../common/validate.middleware.js';

import type { IUsersService } from './users.service.interface.js';
import type { ILoggerService } from '../logger/logger.interface.js';

@injectable()
export class UsersController extends BaseController implements IUsersController {
	constructor(
		@inject(TYPES.ILoggerService) private loggerService: ILoggerService,
		@inject(TYPES.UsersService) private usersService: IUsersService,
	) {
		super(loggerService);
		this.bindRoutes([
			{ path: '/login', method: 'post', func: this.login },
			{
				path: '/register',
				method: 'post',
				func: this.register,
				middlewares: [new ValidateMiddleware(UserRegisterDto)],
			},
		]);
	}

	login(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction) {
		console.log(req.body);
		return this.ok(res, 'Login');

		// next(new HttpError(400, 'Login error', 'Login'));
	}

	async register({ body }: Request<{}, {}, UserRegisterDto>, res: Response, next: NextFunction) {
		console.log(body);
		const result = await this.usersService.createUser(body);
		if (!result) {
			return next(new HttpError(422, 'User already exists', 'Register'));
		}
		return this.ok(res, { email: result.email });
	}
}
