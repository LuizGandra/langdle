import { createClient } from 'redis'

let redisClient: ReturnType<typeof createClient> | null = null

function getRedisClient() {
	if (!redisClient) {
		redisClient = createClient({
			url: process.env.REDIS_REDIS_URL || 'redis://localhost:6379'
		})
		redisClient.connect().catch((error) => {
			console.error('Redis connection error:', error)
		})
	}

	return redisClient
}

export async function getCurrentDay() {
	const redis = getRedisClient()
	const day = await redis.get('currentDay')
	if (day) return Number.parseInt(day)

	await redis.set('currentDay', 0)
	return 0
}

export async function updateCurrentDay() {
	const redis = getRedisClient()
	const day = await redis.get('currentDay')
	const currentDay = day ? Number.parseInt(day) : -1
	const newDay = currentDay + 1

	await redis.set('currentDay', newDay)
	return newDay
}
