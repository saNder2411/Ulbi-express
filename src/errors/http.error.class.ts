export class HttpError extends Error {
	constructor(public statusCode: number, public message: string, public errorCtx?: string) {
		super(message)
	}
}
