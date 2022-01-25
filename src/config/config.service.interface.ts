export type Key = 'PORT' | 'DB_URL'

export interface IConfigService {
	get: <K extends Key>(key: K) => string
}
