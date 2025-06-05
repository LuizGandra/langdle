'use client'

import { useGame } from '@/contexts/GameContext'
import { cn } from '@/lib/utils'
import '../styles/gameboard.css'
import { useEffect } from 'react'

export function GameBoard() {
	const {
		board,
		boardStatus,
		currentRow,
		selectedCol,
		setCellRef,
		handleCellChange,
		handleCellClick
	} = useGame()

	useEffect(() => {
		handleCellClick(0, 0)
	}, [handleCellClick])

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
									'w-16 h-16 rounded-md border-4 border-empty text-4xl text-center font-medium uppercase caret-transparent focus:outline-none transition-all duration-25',
									rowIndex === currentRow ? 'cursor-pointer' : 'cursor-default',
									rowIndex === currentRow ? 'bg-transparent' : 'bg-empty',
									rowIndex === currentRow &&
										colIndex === selectedCol &&
										'border-b-10',
									boardStatus[rowIndex][colIndex] === 'correct' &&
										'bg-correct border-correct',
									boardStatus[rowIndex][colIndex] === 'wrong-pos' &&
										'bg-wrong-pos border-wrong-pos',
									boardStatus[rowIndex][colIndex] === 'wrong' &&
										'bg-wrong border-wrong'
								)}
								value={cell}
								onChange={(e) => handleCellChange(colIndex, e.target.value)}
								onClick={() => handleCellClick(rowIndex, colIndex)}
								readOnly
							/>
						))}
					</div>
				))}
			</div>
		</div>
	)
}
