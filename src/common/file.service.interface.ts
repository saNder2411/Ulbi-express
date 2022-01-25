import { UploadedFile } from 'express-fileupload'

export interface IFileService {
	save: (file?: UploadedFile) => Promise<string>

	remove: (fileName?: string) => Promise<void>
}
