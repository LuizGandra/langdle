import { Toaster } from '@/components/ui/sonner'
import { GameProvider } from '@/contexts/GameContext'
import { getCurrentDay } from '@/lib/redis'
import { database } from '@/store/database'
import { FinalDialog } from './_components/finalDialog'
import { GameBoard } from './_components/gameBoard'
import { Keyboard } from './_components/keyboard'
import { KeyboardListener } from './_components/keyboardListener'
import { loadDictionary } from './actions/dictionaries/action'

export default async function Page() {
	const day = await getCurrentDay()
	const { word, meaning, example } = database.days[day]

	await loadDictionary()

	return (
		<GameProvider word={word}>
			<KeyboardListener>
				<div className="min-h-dvh space-y-6 bg-zinc-900 text-center">
					<header className="py-6">
						<h1 className="text-xl text-zinc-400 font-medium leading-none">
							Langdle
						</h1>
					</header>
					<main className="space-y-6">
						<p className="text-2xl text-zinc-50 font-medium leading-none">
							Inglês
						</p>
						<GameBoard />
						<Keyboard />
					</main>
				</div>
				<FinalDialog word={word} meaning={meaning} example={example} />
				<Toaster />
			</KeyboardListener>
		</GameProvider>
	)
}
