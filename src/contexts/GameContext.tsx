'use client'

import React, { useCallback, useContext, useRef, useState } from 'react'

type GameContextType = {
	board: string[][]
	setBoard: React.Dispatch<React.SetStateAction<string[][]>>
	currentRow: number
	selectedCol: number
	setCellRef: (
		el: HTMLInputElement | null,
		rowIndex: number,
		colIndex: number
	) => void
	handleCellChange: (colIndex: number, value: string) => void
	handleCellClick: (rowIndex: number, colIndex: number) => void
	handleKeyDown: (key: string, colIndex: number) => void
}

type GameProviderProps = {
	children: React.ReactNode
	word: string
	meaning: string
}

const GameContext = React.createContext<GameContextType | null>(null)

export function GameProvider({ children, word, meaning }: GameProviderProps) {
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

	const setCellRef = useCallback(
		(el: HTMLInputElement | null, rowIndex: number, colIndex: number) => {
			if (el) cellRefs.current[rowIndex][colIndex] = el
		},
		[]
	)

	const handleCellChange = useCallback(
		(colIndex: number, value: string) => {
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
		},
		[currentRow]
	)

	const handleCellClick = useCallback(
		(rowIndex: number, colIndex: number) => {
			if (rowIndex === currentRow) {
				setSelectedCol(colIndex)
				cellRefs.current[rowIndex][colIndex]?.focus()
			}
		},
		[currentRow]
	)

	const handleKeyDown = useCallback(
		(key: string, colIndex: number) => {
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
				if (board[currentRow].some((cell) => cell === '')) return

				if (board[currentRow].join('').toLowerCase() === word) {
					alert(`Congratulations! You guessed the word: ${word}. ${meaning}`)
					return
				}

				// TODO fix this logic
				board[currentRow].forEach((letter, index) => {
					console.log('Letter:', letter.toLowerCase(), 'word[i]:', word[index])
					if (letter.toLowerCase() === word[index])
						cellRefs.current[currentRow][index]?.classList.add('correct')
					else if (word.includes(letter.toLowerCase())) {
						cellRefs.current[currentRow][index]?.classList.add('wrong-pos')
					} else cellRefs.current[currentRow][index]?.classList.add('wrong')
				})

				if (currentRow < 5) {
					setCurrentRow((prev) => prev + 1)
					setSelectedCol(0)
					cellRefs.current[currentRow + 1]?.[0]?.focus()
				}
			}
		},
		[board, currentRow, handleCellClick, word, meaning]
	)

	return (
		<GameContext.Provider
			value={{
				board,
				setBoard,
				currentRow,
				selectedCol,
				setCellRef,
				handleCellChange,
				handleCellClick,
				handleKeyDown
			}}
		>
			{children}
		</GameContext.Provider>
	)
}

export function useGame() {
	const context = useContext(GameContext)
	if (!context) throw new Error('useGame must be used within a GameProvider')
	return context
}
