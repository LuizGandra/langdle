import { updateCurrentDay } from '@/lib/redis'

export async function GET(request: Request) {
	try {
		const newDay = await updateCurrentDay()
		console.log('newDay: ', newDay)

		return Response.json({ currentDay: newDay })
	} catch (error) {
		console.error('Error reading / updating Redis:', error)
		return new Response('Error', { status: 500 })
	}
}
