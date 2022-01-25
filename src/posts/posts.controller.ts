import 'reflect-metadata'

import { NextFunction, Request, Response } from 'express'
import { inject, injectable } from 'inversify'

import { BaseController } from '../common/base.controller'
import { HttpError } from '../errors/http.error.class'
import { ILoggerService } from '../logger/logger.service'
import { TYPES } from '../types'
import { IPostsController } from './posts.controller.interface'
import { IPostsService } from './posts.service.interface'
import { PostDTO } from './dto/post.dto'
import { UploadedFile } from 'express-fileupload'
import { Post } from './post.entity'
import { ValidateMiddleware } from '../common/validate.middleware'

@injectable()
export class PostsController extends BaseController implements IPostsController {
	constructor(
		@inject(TYPES.ILoggerService) private loggerService: ILoggerService,
		@inject(TYPES.IPostsService) private postsService: IPostsService
	) {
		super(loggerService)
		this.bindRoutes([
			{
				path: '/posts',
				methodKey: 'post',
				callback: this.create,
				middlewares: [new ValidateMiddleware(PostDTO)],
			},
			{
				path: '/posts',
				methodKey: 'get',
				callback: this.getAll,
				middlewares: [],
			},
			{
				path: '/posts/:id',
				methodKey: 'get',
				callback: this.getOne,
				middlewares: [],
			},
			{
				path: '/posts',
				methodKey: 'put',
				callback: this.update,
				middlewares: [],
			},
			{
				path: '/posts/:id',
				methodKey: 'delete',
				callback: this.delete,
				middlewares: [],
			},
		])
	}

	async create(req: Request<{}, {}, PostDTO>, res: Response, next: NextFunction) {
		try {
			const post = await this.postsService.create(req.body, req.files?.image as UploadedFile)

			if (!post) return next(new HttpError(500, 'Something was wrong!'))

			this.loggerService.log(`[PostsController] create post: ${post.title}`)

			this.ok(res, post)
		} catch (err) {
			res.status(500).json(err)
		}
	}

	async getAll(req: Request, res: Response, next: NextFunction) {
		try {
			const posts = await this.postsService.getAll()

			this.ok(res, posts)
		} catch (err) {
			res.status(500).json(err)
		}
	}

	async getOne(req: Request<{ id: string }>, res: Response) {
		try {
			const post = await this.postsService.getOne(req.params.id)
			this.ok(res, post)
		} catch (err) {
			res.status(500).json(err)
		}
	}

	async update(req: Request<{}, {}, Post>, res: Response) {
		try {
			const updatedPost = await this.postsService.update(req.body)
			this.ok(res, updatedPost)
		} catch (err) {
			res.status(500).json(err)
		}
	}

	async delete(req: Request<{ id: string }>, res: Response) {
		try {
			const post = await this.postsService.delete(req.params.id)
			this.ok(res, post?._id)
		} catch (err) {
			res.status(500).json(err)
		}
	}
}
