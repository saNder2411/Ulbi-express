import { Container, ContainerModule, interfaces } from 'inversify'
import { App } from './app'

import { FileService } from './common/file.service'
import { IFileService } from './common/file.service.interface'
import { ConfigService } from './config/config.service'
import { IConfigService } from './config/config.service.interface'
import { MongooseService } from './database/mongoose.service'
import { IMongooseService } from './database/mongoose.service.interface'
import { ExceptionFilter } from './errors/exception.filter'
import { IExceptionFilter } from './errors/exception.filter.interface'
import { ILoggerService, LoggerService } from './logger/logger.service'
import { PostsRepository } from './posts/post.repository'
import { IPostsRepository } from './posts/post.repository.interface'
import { PostsController } from './posts/posts.controller'
import { IPostsController } from './posts/posts.controller.interface'
import { PostsService } from './posts/posts.service'
import { IPostsService } from './posts/posts.service.interface'
import { TYPES } from './types'

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILoggerService>(TYPES.ILoggerService).to(LoggerService).inSingletonScope()
	bind<IConfigService>(TYPES.IConfigService).to(ConfigService).inSingletonScope()
	bind<IExceptionFilter>(TYPES.IExceptionFilter).to(ExceptionFilter).inSingletonScope()
	bind<IFileService>(TYPES.IFileService).to(FileService).inSingletonScope()
	bind<IMongooseService>(TYPES.IMongooseService).to(MongooseService).inSingletonScope()
	bind<IPostsRepository>(TYPES.IPostsRepository).to(PostsRepository).inSingletonScope()
	bind<IPostsService>(TYPES.IPostsService).to(PostsService).inSingletonScope()
	bind<IPostsController>(TYPES.IPostsController).to(PostsController).inSingletonScope()
	bind<App>(TYPES.App).to(App).inSingletonScope()
})

const bootstrap = async () => {
	const appContainer = new Container()
	appContainer.load(appBindings)

	const app = appContainer.get<App>(TYPES.App)
	await app.init()

	return { app, appContainer }
}

export const boot = bootstrap()
