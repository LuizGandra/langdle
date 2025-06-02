'use client'

import { useGame } from '@/contexts/GameContext'
import { cn } from '@/lib/utils'
import { useEffect } from 'react'
import '../styles/gameboard.css'

export function GameBoard() {
	const {
		board,
		currentRow,
		selectedCol,
		setCellRef,
		handleCellChange,
		handleCellClick,
		handleKeyDown
	} = useGame()

	useEffect(() => {
		const onKeyDown = (event: KeyboardEvent) => {
			handleKeyDown(event.key, selectedCol)
		}

		window.addEventListener('keydown', onKeyDown)
		return () => window.removeEventListener('keydown', onKeyDown)
	}, [handleKeyDown, selectedCol])

	return (
		<div className="flex justify-center">
			<div className="w-fit space-y-2">
				{board.map((row, rowIndex) => (
					<div key={`br-${rowIndex}`} className="grid grid-cols-5 gap-2">
						{row.map((cell, colIndex) => (
							<input
								ref={(el) => setCellRef(el, rowIndex, colIndex)}
								key={`bc-${rowIndex}-${colIndex}`}
								type="text"
								className={cn(
									'w-16 h-16 rounded-md border-4 border-zinc-800 text-4xl text-center text-zinc-50 font-medium uppercase caret-transparent cursor-pointer focus:outline-none transition-all duration-25',
									rowIndex === currentRow ? 'bg-transparent' : 'bg-zinc-800',
									rowIndex === currentRow &&
										colIndex === selectedCol &&
										'border-b-10'
								)}
								value={cell}
								onChange={(e) => handleCellChange(colIndex, e.target.value)}
								onClick={() => handleCellClick(rowIndex, colIndex)}
							/>
						))}
					</div>
				))}
			</div>
		</div>
	)
}
