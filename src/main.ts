import Express, { json } from 'express'
import Mongoose from 'mongoose'
import FileUpload from 'express-fileupload'

import { postRouter } from './posts/posts.router'

const PORT = 5000

const app = Express()

const DB_URL = 'mongodb+srv://user0:1234@ulbi-tv-express.fww2p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

app.use(json())
app.use(Express.static('static'))
app.use(FileUpload({}))

app.use('/api', postRouter)

const bootstrap = async () => {
	try {
		await Mongoose.connect(DB_URL)
		app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`))
	} catch (err) {
		console.log(err)
	}
}

bootstrap()
