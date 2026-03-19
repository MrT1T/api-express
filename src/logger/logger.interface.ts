import { Logger, ILogObj } from 'tslog';

export interface ILoggerService {
	logger: Logger<ILogObj>;
	log: (message: string) => void;
	error: (message: string) => void;
	warn: (message: string) => void;
}
