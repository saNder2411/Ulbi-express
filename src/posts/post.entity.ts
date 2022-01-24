import { Schema, model } from 'mongoose'

export interface Post {
	_id: string
	author: string
	title: string
	content: string
	image: string
}

export type IPostDTO = Omit<Post, '_id' | 'image'>

const PostSchema = new Schema<Post>({
	author: { type: String, required: true },
	title: { type: String, required: true },
	content: { type: String, required: true },
	image: { type: String },
})

export const Post = model('Post', PostSchema)
