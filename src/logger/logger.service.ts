import 'reflect-metadata'

import { injectable } from 'inversify'
import { Logger } from 'tslog'

export interface ILoggerService<T = Logger> {
	logger: T
	log: (...args: unknown[]) => void
	error: (...args: unknown[]) => void
	warn: (...args: unknown[]) => void
}

@injectable()
export class LoggerService implements ILoggerService {
	logger: Logger

	constructor() {
		this.logger = new Logger({
			displayInstanceName: false,
			displayLoggerName: false,
			displayFilePath: 'hidden',
			displayFunctionName: false,
		})
	}

	log(...args: unknown[]) {
		this.logger.info(...args)
	}

	error(...args: unknown[]) {
		this.logger.error(...args)
	}

	warn(...args: unknown[]) {
		this.logger.warn(...args)
	}
}
