import 'reflect-metadata'

import { config, DotenvParseOutput } from 'dotenv'
import { inject, injectable } from 'inversify'

import { TYPES } from '../types'
import { IConfigService, Key } from './config.service.interface'
import { ILoggerService } from '../logger/logger.service'

@injectable()
export class ConfigService implements IConfigService {
	private config: DotenvParseOutput | null = null

	constructor(@inject(TYPES.ILoggerService) private logger: ILoggerService) {
		const result = config()

		if (result.error) this.logger.error('[ConfigService] The file could not be read or is missing')

		if (result.parsed) {
			this.config = result.parsed as DotenvParseOutput
			this.logger.log('[ConfigService] Config .env uploaded')
		}
	}

	get<K extends Key>(key: K) {
		return this.config?.[key] ?? ''
	}
}
