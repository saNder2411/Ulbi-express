import { Request, Response, NextFunction, Router } from 'express'

export interface IPostsController {
	router: Router

	create: (req: Request, res: Response, next: NextFunction) => Promise<void>

	getAll: (req: Request, res: Response, next: NextFunction) => Promise<void>

	getOne: (req: Request<{ id: string }>, res: Response, next: NextFunction) => Promise<void>

	update: (req: Request, res: Response, next: NextFunction) => Promise<void>

	delete: (req: Request<{ id: string }>, res: Response, next: NextFunction) => Promise<void>
}
