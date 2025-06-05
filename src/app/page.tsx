import { Toaster } from '@/components/ui/sonner'
import { GameProvider } from '@/contexts/GameContext'
import { getCurrentDay } from '@/lib/redis'
import { database } from '@/store/database'
import Image from 'next/image'
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
				<div className="min-h-dvh space-y-6 bg-background text-center">
					<header className="w-full py-6 border-b-2">
						<Image
							src="/assets/logo.svg"
							width={140}
							height={33}
							alt="Langdle logo"
							className="mx-auto"
						/>
					</header>
					<main className="space-y-6">
						<h2 className="text-2xl text-zinc-50 font-medium leading-none">
							Inglês - Dia {day + 1}
						</h2>
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
