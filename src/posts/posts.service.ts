import 'reflect-metadata'

import { UploadedFile } from 'express-fileupload'
import { inject, injectable } from 'inversify'

import { IFileService } from '../common/file.service.interface'
import { TYPES } from '../types'
import { PostDTO } from './dto/post.dto'
import { Post } from './post.entity'
import { IPostsRepository } from './post.repository.interface'
import { IPostsService } from './posts.service.interface'

@injectable()
export class PostsService implements IPostsService {
	constructor(
		@inject(TYPES.IFileService) private fileService: IFileService,
		@inject(TYPES.IPostsRepository) private postsRepository: IPostsRepository
	) {}
	async create(newPost: PostDTO, file?: UploadedFile) {
		const fileName = await this.fileService.save(file)
		return await this.postsRepository.create(newPost, fileName)
	}

	async getAll() {
		return await this.postsRepository.getAll()
	}

	async getOne(_id?: string) {
		if (!_id) {
			throw new Error('Id not found')
		}

		return await this.postsRepository.getOne(_id)
	}

	async update(post: Post) {
		if (!post._id) {
			throw new Error('Id not found')
		}

		return await this.postsRepository.update(post)
	}

	async delete(_id?: string) {
		if (!_id) {
			throw new Error('Id not found')
		}

		const post = await this.postsRepository.getOne(_id)

		await this.fileService.remove(post?.image)

		return await this.postsRepository.delete(_id)
	}
}
