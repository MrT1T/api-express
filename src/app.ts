import express, { Express } from 'express';
import { Server } from 'node:http';
import { injectable, inject } from 'inversify';

import { UsersController } from './users/users.controller.js';
import { ExceptionFilter } from './errors/exception.filter.js';

import { TYPES } from './types.js';

import type { ILoggerService } from './logger/logger.interface.js';

@injectable()
export class App {
	app: Express;
	port: number;
	server: Server;

	constructor(
		@inject(TYPES.ILoggerService) private logger: ILoggerService,
		@inject(TYPES.UsersController) private userController: UsersController,
		@inject(TYPES.ExceptionFilter) private exceptionFilter: ExceptionFilter,
	) {
		this.app = express();
		this.port = 8000;
	}

	useRoutes() {
		this.app.use('/users', this.userController.router);
	}

	useExceptionFilters() {
		this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
	}

	public async init() {
		this.useRoutes();
		this.useExceptionFilters();
		this.server = this.app.listen(this.port, () => {
			this.logger.log(`Server running at http://localhost:${this.port}/`);
		});
	}
}
