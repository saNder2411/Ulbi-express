import 'reflect-metadata';

import { UploadedFile } from 'express-fileupload';

import { PostDTO } from './dto/post.dto';
import { Post } from './post.entity';

export interface IPostsService {
	create(newPost: PostDTO, file?: UploadedFile | undefined): Promise<Post>

	getAll(): Promise<Post[]>

	getOne(_id?: string | undefined): Promise<Post | null>

	update(post: Post): Promise<Post | null>

	delete(_id?: string | undefined): Promise<Post | null>
}
