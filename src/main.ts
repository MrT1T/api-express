import { Container, ContainerModule, ContainerModuleLoadOptions } from 'inversify';
import { App } from './app.js';

import { ExceptionFilter } from './errors/exception.filter.js';
import { LoggerService } from './logger/logger.service.js';
import { UsersController } from './users/users.controller.js';
import { ILoggerService } from './logger/logger.interface.js';
import { TYPES } from './types.js';
import { IExceptionFilter } from './errors/exception.filter.interface.js';
import { UsersService } from './users/users.service.js';
import type { IUsersService } from './users/users.service.interface.js';
import type { IUsersController } from './users/users.controller.interface.js';

export const appBindings = new ContainerModule((options: ContainerModuleLoadOptions) => {
	options.bind<ILoggerService>(TYPES.ILoggerService).to(LoggerService);
	options.bind<IUsersController>(TYPES.UsersController).to(UsersController);
	options.bind<IUsersService>(TYPES.UsersService).to(UsersService);
	options.bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
	options.bind<App>(TYPES.Application).to(App);
});

function bootstrap() {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);
	app.init();
	return { app, appContainer };
}

export const { app, appContainer } = bootstrap();
