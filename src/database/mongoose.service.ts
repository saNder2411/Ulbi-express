import 'reflect-metadata'

import { inject, injectable } from 'inversify'
import Mongoose from 'mongoose'

import { ILoggerService } from '../logger/logger.service'
import { TYPES } from '../types'
import { IMongooseService } from './mongoose.service.interface'
import { IConfigService } from '../config/config.service.interface'

@injectable()
export class MongooseService implements IMongooseService {
	client: typeof Mongoose = Mongoose
	constructor(
		@inject(TYPES.ILoggerService) private logger: ILoggerService,
		@inject(TYPES.IConfigService) private configService: IConfigService
	) {}

	async connect() {
		try {
			await this.client.connect(this.configService.get('DB_URL'))
			this.logger.log('[MongooseService] connect to db')
		} catch (err) {
			if (err instanceof Error) this.logger.error(`[MongooseService] Error connect to db ${err.message}`)
		}
	}

	async disconnect() {
		await this.client.disconnect()
		this.logger.log('[MongooseService] disconnect from db')
	}
}
