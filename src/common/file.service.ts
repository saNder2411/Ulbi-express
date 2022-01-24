import { UploadedFile } from 'express-fileupload'
import { v4 } from 'uuid'
import path from 'path'
import fs from 'fs/promises'

export class FileService {
	async save(file?: UploadedFile) {
		if (!file) return ''

		try {
			const fileName = `${v4()}.jpg`
			const filePath = path.resolve('static', fileName)
			await file.mv(filePath)
			return fileName
		} catch (err) {
			console.log(err)
		}
	}

	async remove(fileName?: string) {
		if (!fileName) return
		fs.rm(path.resolve('static', fileName))
	}
}

export const fileService = new FileService()
