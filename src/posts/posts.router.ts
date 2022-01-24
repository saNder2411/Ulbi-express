import { Router } from 'express'

import { Post } from './post.entity'
import { postsController } from './posts.controller'



const postRouter = Router()

postRouter.post('/posts', postsController.create)
postRouter.get('/posts', postsController.getAll)
postRouter.get('/posts/:id', postsController.getOne)
postRouter.put('/posts', postsController.update)
postRouter.delete('/posts/:id', postsController.delete)

export { postRouter }
