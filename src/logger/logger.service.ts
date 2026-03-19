import { injectable } from 'inversify';
import { Logger, ILogObj } from 'tslog';

import { ILoggerService } from './logger.interface.js';

@injectable()
export class LoggerService implements ILoggerService {
	public logger: Logger<ILogObj>;

	constructor() {
		this.logger = new Logger({
			hideLogPositionForProduction: true,
		});
	}

	log(message: string) {
		this.logger.info(message);
	}

	error(message: string) {
		this.logger.error(message);
	}

	warn(message: string) {
		this.logger.warn(message);
	}
}
