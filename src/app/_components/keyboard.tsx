'use client'

import { useGame } from '@/contexts/GameContext'
import { cn } from '@/lib/utils'

type KeyboardRowProps = {
	keys: Array<string>
}

type KeyboardKeyProps = {
	keyValue: string
	className: string
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
	const { board, boardStatus } = useGame()

	return (
		<div className="space-x-2">
			{keys?.map((key) => {
				const flatBoard = board.flat()
				const flatStatus = boardStatus.flat()

				const keyPositions = flatBoard
					.map((cell, i) => (cell === key ? i : -1))
					.filter((i) => i !== -1)

				const statuses = keyPositions.map((i) => flatStatus[i])

				let keyColor = ''
				if (statuses.includes('correct')) {
					keyColor = 'bg-correct border-correct'
				} else if (statuses.includes('wrong-pos')) {
					keyColor = 'bg-wrong-pos border-wrong-pos'
				} else if (statuses.includes('wrong')) {
					keyColor = 'bg-wrong border-wrong'
				}

				return <KeyboardKey key={key} keyValue={key} className={keyColor} />
			})}
		</div>
	)
}

function KeyboardKey({ keyValue, className }: KeyboardKeyProps) {
	const { selectedCol, handleCellChange } = useGame()

	return (
		<button
			type="button"
			className={cn(
				'min-w-12 h-12 rounded-md border-4 border-zinc-800 text-xl text-center text-zinc-50 font-medium uppercase',
				className
			)}
			onClick={() => handleCellChange(selectedCol, keyValue)}
		>
			{keyValue}
		</button>
	)
}
