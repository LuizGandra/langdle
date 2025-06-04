'use client'

import { useGame } from '@/contexts/GameContext'

type KeyboardRowProps = {
	keys: Array<string>
}

type KeyboardKeyProps = {
	keyValue: string
}

const keysMap = [
	['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
	['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', '<-'],
	['Z', 'X', 'C', 'V', 'B', 'N', 'M', 'ENTER']
]

export function Keyboard() {
	return (
		<div className="flex justify-center">
			<div className="w-fit space-y-2">
				{keysMap.map((row) => (
					<KeyboardRow key={`kr-${row[0]}:${row[row.length - 1]}`} keys={row} />
				))}
			</div>
		</div>
	)
}

function KeyboardRow({ keys }: KeyboardRowProps) {
	return (
		<div className="space-x-2">
			{keys?.map((key) => (
				<KeyboardKey key={key} keyValue={key} />
			))}
		</div>
	)
}

function KeyboardKey({ keyValue }: KeyboardKeyProps) {
	const { selectedCol, handleCellChange } = useGame()

	return (
		<button
			type="button"
			className="min-w-12 h-12 rounded-md border-4 border-zinc-800 text-xl text-center text-zinc-50 font-medium uppercase"
			onClick={() => handleCellChange(selectedCol, keyValue)}
		>
			{keyValue}
		</button>
	)
}
