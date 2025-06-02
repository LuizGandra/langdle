import { updateCurrentDay } from '@/lib/redis'

export async function GET(request: Request) {
	const secret = request.headers.get('x-cron-secret')
	const expectedSecret = process.env.CRON_SECRET

	if (secret !== expectedSecret)
		return new Response('Unauthorized', { status: 401 })

	try {
		const newDay = await updateCurrentDay()

		return Response.json({ currentDay: newDay })
	} catch (error) {
		console.error('Error reading / updating Redis:', error)
		return new Response('Error', { status: 500 })
	}
}
