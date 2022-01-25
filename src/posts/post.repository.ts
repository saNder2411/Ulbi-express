import 'reflect-metadata'

import { injectable } from 'inversify'
import { model } from 'mongoose'

import { PostDTO } from './dto/post.dto'
import { Post, PostSchema } from './post.entity'
import { IPostsRepository } from './post.repository.interface'

@injectable()
export class PostsRepository implements IPostsRepository {
	repository = model('Post', PostSchema)

	async create(newPost: PostDTO, fileName: string) {
		return await this.repository.create({ ...newPost, image: fileName })
	}

	async getAll() {
		return await this.repository.find()
	}

	async getOne(_id: string) {
		return await this.repository.findById(_id)
	}

	async update(post: Post) {
		return await this.repository.findByIdAndUpdate(post._id, post, { new: true })
	}

	async delete(_id?: string) {
		return await this.repository.findByIdAndDelete(_id)
	}
}
