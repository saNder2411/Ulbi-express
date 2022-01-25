import { IsString, isBase64 } from 'class-validator'

export class PostDTO {
	@IsString({ message: 'Author is not valid!' })
	author: string = ''
	@IsString({ message: 'Title not specified!' })
	title: string = ''
	@IsString({ message: 'Content not specified!' })
	content: string = ''
}
