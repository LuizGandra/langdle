import { GameProvider } from '@/contexts/GameContext'
import { getCurrentDay } from '@/lib/redis'
import { database } from '@/store/database'
import { GameBoard } from './_components/gameboard'
import { Keyboard } from './_components/keyboard'

export default async function Page() {
	const day = await getCurrentDay()
	const { word, meaning } = database.days[day]

	return (
		<GameProvider word={word} meaning={meaning}>
			<div className="min-h-dvh space-y-6 bg-zinc-900 text-center">
				<header className="py-6">
					<h1 className="text-xl text-zinc-400 font-medium leading-none">
						Langdle
					</h1>
				</header>
				<main className="space-y-6">
					<p className="text-2xl text-zinc-50 font-medium leading-none">
						English
					</p>
					<GameBoard />
					<Keyboard />
				</main>
			</div>
		</GameProvider>
	)
}
