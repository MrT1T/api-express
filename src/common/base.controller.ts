import { Router, Response } from 'express';
import { injectable } from 'inversify';

import { IRoute } from './route.interface.js';

import { ILoggerService } from '../logger/logger.interface.js';

@injectable()
export abstract class BaseController {
	private readonly _router: Router;

	constructor(private logger: ILoggerService) {
		this._router = Router();
	}

	get router(): Router {
		return this._router;
	}

	public send<T>(res: Response, code: number, message: T) {
		res.type('application/json');
		return res.status(code).json({ message });
	}

	public ok<T>(res: Response, message: T) {
		return this.send<T>(res, 200, message);
	}

	public created<T>(res: Response) {
		return res.status(201);
	}

	protected bindRoutes(routes: IRoute[]) {
		for (const route of routes) {
			const { path, method, func } = route;
			this.logger.log(`Binding route ${method.toUpperCase()} ${path}`);
			const handler = func.bind(this);
			this.router[method](path, handler);
		}
	}
}
