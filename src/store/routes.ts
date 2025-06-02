export const BASE_URL =
	process.env.NODE_ENV === 'production'
		? 'https://langdle.vercel.app/api'
		: 'http://localhost:3000/api'

export const CRON_URL = `${BASE_URL}/cron`
