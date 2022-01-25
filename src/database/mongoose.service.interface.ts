import { Mongoose } from 'mongoose'

export interface IMongooseService {
	client: Mongoose
	connect: () => Promise<void>
	disconnect: () => Promise<void>
}
