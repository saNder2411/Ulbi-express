import 'reflect-metadata'

import { UploadedFile } from 'express-fileupload'
import fs from 'fs/promises'
import { injectable } from 'inversify'
import path from 'path'
import { v4 } from 'uuid'

import { IFileService } from './file.service.interface'

@injectable()
export class FileService implements IFileService {
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

		return ''
	}

	async remove(fileName?: string) {
		if (!fileName) return
		fs.rm(path.resolve('static', fileName))
	}
}
