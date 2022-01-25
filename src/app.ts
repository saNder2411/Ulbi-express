import 'reflect-metadata'

import express, { Express, json } from 'express'
import { Server } from 'http'
import { inject, injectable } from 'inversify'
import FileUpload from 'express-fileupload'

import { IConfigService } from './config/config.service.interface'
import { IExceptionFilter } from './errors/exception.filter.interface'
import { ILoggerService } from './logger/logger.service'
import { TYPES } from './types'
import { IPostsController } from './posts/posts.controller.interface'
import { IMongooseService } from './database/mongoose.service.interface'

@injectable()
export class App {
	app: Express
	server: Server | null = null

	constructor(
		@inject(TYPES.ILoggerService) private logger: ILoggerService,
		@inject(TYPES.IConfigService) private configService: IConfigService,
		@inject(TYPES.IPostsController) private postsController: IPostsController,
		@inject(TYPES.IExceptionFilter) private exceptionFilter: IExceptionFilter,
		@inject(TYPES.IMongooseService) private mongooseService: IMongooseService
	) {
		this.app = express()
	}

	useMiddleware() {
		this.app.use(json())
		this.app.use(express.static('static'))
		this.app.use(FileUpload({}))
	}

	useRoutes() {
		this.app.use('/api', this.postsController.router)
	}

	useExceptionFilters() {
		this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter))
	}

	async init() {
		this.useMiddleware()
		this.useRoutes()
		this.useExceptionFilters()
		await this.mongooseService.connect()

		const PORT = +this.configService.get('PORT')

		this.server = this.app.listen(PORT, () => {
			this.logger.log(`Server run on: http://localhost:${PORT}`)
		})
	}

	close() {
		this.server?.close()
	}
}
