import { UploadedFile } from 'express-fileupload'
import { IPostDTO, Post } from './post.entity'
import { fileService } from '../common/file.service'

export class PostService {
	async create(newPost: IPostDTO, file?: UploadedFile) {
		const fileName = await fileService.save(file)
		return await Post.create({ ...newPost, image: fileName })
	}

	async getAll() {
		return await Post.find()
	}

	async getOne(_id?: string) {
		if (!_id) {
			throw new Error('Id not found')
		}

		return await Post.findById(_id)
	}

	async update(post: Post) {
		if (!post._id) {
			throw new Error('Id not found')
		}

		return await Post.findByIdAndUpdate(post._id, post, { new: true })
	}

	async delete(_id?: string) {
		if (!_id) {
			throw new Error('Id not found')
		}

		const post = await Post.findById(_id)

		await fileService.remove(post?.image)

		return await Post.findByIdAndDelete(_id)
	}
}

export const postService = new PostService()
