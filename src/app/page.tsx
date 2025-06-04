import { Toaster } from '@/components/ui/sonner'
import { GameProvider } from '@/contexts/GameContext'
import { getDictionary } from '@/lib/dictionary'
import { getCurrentDay } from '@/lib/redis'
import { database } from '@/store/database'
import { FinalDialog } from './_components/finalDialog'
import { GameBoard } from './_components/gameBoard'
import { Keyboard } from './_components/keyboard'
import { KeyboardListener } from './_components/keyboardListener'

export default async function Page() {
	const day = await getCurrentDay()
	const { word, meaning, example } = database.days[day]

	const dictionary = getDictionary()

	return (
		<GameProvider word={word} meaning={meaning} dictionary={dictionary}>
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
			</KeyboardListener>
			<FinalDialog word={word} meaning={meaning} example={example} />
			<Toaster />
		</GameProvider>
	)
}
