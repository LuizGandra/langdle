import { GameBoard } from './_components/gameboard'
import { Keyboard } from './_components/keyboard'

export default function Page() {
	return (
		<div className="min-h-dvh space-y-12 bg-zinc-900 text-center">
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
	)
}
