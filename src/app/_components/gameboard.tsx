'use client'

import { cn } from '@/lib/utils'
import { useEffect, useRef, useState } from 'react'

export function GameBoard() {
	const [board, setBoard] = useState<string[][]>(
		Array(6)
			.fill(null)
			.map(() => Array(5).fill(''))
	)

	const [currentRow, setCurrentRow] = useState(0)
	const [selectedCol, setSelectedCol] = useState(0)
	const cellRefs = useRef<(HTMLInputElement | null)[][]>(
		Array(6)
			.fill(null)
			.map(() => Array(5).fill(null))
	)

	const handleCellChange = (colIndex: number, value: string) => {
		if (!value) return
		const newValue = value.toUpperCase()[0]
		if (!/^[A-Z]$/.test(newValue)) return

		setBoard((prevBoard) =>
			prevBoard.map((row, rI) =>
				rI === currentRow
					? row.map((cell, cI) => (cI === colIndex ? newValue : cell))
					: row
			)
		)

		// TODO improve the move to the next cell, should be the next / previous EMPTY CELL
		if (newValue && colIndex < 4) {
			setSelectedCol(colIndex + 1)
			cellRefs.current[currentRow][colIndex + 1]?.focus()
		} else if (newValue && colIndex === 4) {
			setSelectedCol(0) // TODO the prev empty cell
			cellRefs.current[currentRow + 1]?.[0]?.focus()
		}
	}

	const handleCellClick = (rowIndex: number, colIndex: number) => {
		if (rowIndex === currentRow) {
			setSelectedCol(colIndex)
			cellRefs.current[rowIndex][colIndex]?.focus()
		}
	}

	const handleKeyDown = (key: string, colIndex: number) => {
		if (key === 'ArrowRight') {
			if (colIndex < 4) handleCellClick(currentRow, colIndex + 1)
			else handleCellClick(currentRow, 0)
		} else if (key === 'ArrowLeft') {
			if (colIndex > 0) handleCellClick(currentRow, colIndex - 1)
			else handleCellClick(currentRow, 4)
		} else if (key === 'Backspace') {
			let newColIndex = colIndex
			if (!board[currentRow][colIndex] && colIndex > 0) {
				newColIndex = colIndex - 1
				handleCellClick(currentRow, newColIndex)
			}
			setBoard((prevBoard) =>
				prevBoard.map((row, rI) =>
					rI === currentRow
						? row.map((cell, cI) => (cI === newColIndex ? '' : cell))
						: row
				)
			)
		} else if (key === 'Enter') {
			// TODO implement correct logic
			if (currentRow < 5) {
				setCurrentRow((prev) => prev + 1)
				setSelectedCol(0)
				cellRefs.current[currentRow + 1]?.[0]?.focus()
			}
		}
	}

	const setCellRef = (
		el: HTMLInputElement | null,
		rowIndex: number,
		colIndex: number
	) => {
		if (el) cellRefs.current[rowIndex][colIndex] = el
	}

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
									'w-16 h-16 rounded-md border-4 border-zinc-800 text-4xl text-center text-zinc-50 font-medium uppercase caret-transparent focus:outline-none transition-all duration-25',
									rowIndex === currentRow ? 'bg-transparent' : 'bg-zinc-800',
									rowIndex === currentRow &&
										colIndex === selectedCol &&
										'border-b-10'
								)}
								value={cell}
								onChange={(e) => handleCellChange(colIndex, e.target.value)}
								onClick={() => handleCellClick(rowIndex, colIndex)}
								onKeyDown={(e) => handleKeyDown(e.key, colIndex)}
							/>
						))}
					</div>
				))}
			</div>
		</div>
	)
}
