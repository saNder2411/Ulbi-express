import { Request, Response } from 'express'
import { UploadedFile } from 'express-fileupload'
import { IPostDTO, Post } from './post.entity'
import { postService } from './posts.service'

export class PostsController {
	async create(req: Request<{}, {}, IPostDTO>, res: Response) {
		try {
			const post = await postService.create(req.body, req.files?.image as UploadedFile)
			res.status(200).json(post)
		} catch (err) {
			res.status(500).json(err)
		}
	}

	async getAll(req: Request, res: Response) {
		try {
			const posts = await postService.getAll()
			res.status(200).json(posts)
		} catch (err) {
			res.status(500).json(err)
		}
	}

	async getOne(req: Request<{ id: string }>, res: Response) {
		try {
			const post = await postService.getOne(req.params.id)
			res.status(200).json(post)
		} catch (err) {
			res.status(500).json(err)
		}
	}

	async update(req: Request<{}, {}, Post>, res: Response) {
		try {
			const updatedPost = await postService.update(req.body)
			res.status(200).json(updatedPost)
		} catch (err) {
			res.status(500).json(err)
		}
	}

	async delete(req: Request<{ id: string }>, res: Response) {
		try {
			const post = await postService.delete(req.params.id)
			res.status(200).json(post?._id)
		} catch (err) {
			res.status(500).json(err)
		}
	}
}

export const postsController = new PostsController()
