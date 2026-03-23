import type { Request, Response, NextFunction } from 'express';

import { BaseController } from '../common/base.controller.js';
import { HttpError } from '../errors/http-error.class.js';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types.js';

import { ILoggerService } from '../logger/logger.interface.js';
import { IUsersController } from './users.controller.interface.js';
import { UserRegisterDto } from './dto/user-register.dto.js';
import { UserLoginDto } from './dto/user-login.dto.js';
import { User } from './user.entity.js';

@injectable()
export class UsersController extends BaseController implements IUsersController {
	constructor(@inject(TYPES.ILoggerService) private loggerService: ILoggerService) {
		super(loggerService);
		this.bindRoutes([
			{ path: '/login', method: 'post', func: this.login },
			{ path: '/register', method: 'post', func: this.register },
		]);
	}

	login(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction) {
		console.log(req.body);
		return this.ok(res, 'Login');

		// next(new HttpError(400, 'Login error', 'Login'));
	}

	async register({ body }: Request<{}, {}, UserRegisterDto>, res: Response, next: NextFunction) {
		console.log(body);
		const newUser = new User(body.email, body.name);
		await newUser.setPassword(body.password);
		return this.ok(res, newUser);
	}
}
