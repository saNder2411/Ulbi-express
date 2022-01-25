import { PostDTO } from './dto/post.dto'
import { Post } from './post.entity';



export interface IPostsRepository {
	create: (newPost: PostDTO, fileName: string) => Promise<Post>

	getAll: () => Promise<Post[]>

	getOne: (_id: string) => Promise<Post | null>

	update: (post: Post) => Promise<Post | null>

	delete: (_id?: string) => Promise<Post | null>
}
