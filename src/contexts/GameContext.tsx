'use client'

import { validateWord } from '@/app/actions/dictionaries/action'
import React, { useCallback, useContext, useRef, useState } from 'react'
import { toast } from 'sonner'

type GameContextType = {
	board: string[][]
	boardStatus: string[][]
	setBoard: React.Dispatch<React.SetStateAction<string[][]>>
	currentRow: number
	selectedCol: number
	isFinished: boolean
	isWinner: boolean
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
}

const GameContext = React.createContext<GameContextType | null>(null)

export function GameProvider({ children, word }: GameProviderProps) {
	const [board, setBoard] = useState<string[][]>(
		Array(6)
			.fill(null)
			.map(() => Array(5).fill(''))
	)
	const [boardStatus, setBoardStatus] = useState<string[][]>(
		Array(6)
			.fill(null)
			.map(() => Array(5).fill(''))
	)
	const [currentRow, setCurrentRow] = useState(0)
	const [selectedCol, setSelectedCol] = useState(0)

	const [isFinished, setIsFinished] = useState(false)
	const [isWinner, setIsWinner] = useState(false)

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
			if (!value || isFinished) return

			const newValue = value.toUpperCase()[0]
			if (!/^[A-Z]$/.test(newValue)) return

			setBoard((prevBoard) =>
				prevBoard.map((row, rI) =>
					rI === currentRow
						? row.map((cell, cI) => (cI === colIndex ? newValue : cell))
						: row
				)
			)

			if (newValue && colIndex < 4) {
				setSelectedCol(colIndex + 1)
				cellRefs.current[currentRow][colIndex + 1]?.focus()
			} else if (newValue && colIndex === 4) {
				setSelectedCol(0)
				cellRefs.current[currentRow + 1]?.[0]?.focus()
			}
		},
		[currentRow, isFinished]
	)

	const handleCellClick = useCallback(
		(rowIndex: number, colIndex: number) => {
			if (isFinished) return

			if (rowIndex === currentRow) {
				setSelectedCol(colIndex)
				cellRefs.current[rowIndex][colIndex]?.focus()
			}
		},
		[currentRow, isFinished]
	)

	const handleKeyDown = useCallback(
		(key: string, colIndex: number) => {
			if (isFinished) return

			if (/^[a-zA-Z]$/.test(key)) {
				handleCellChange(colIndex, key)
			} else if (key === 'ArrowRight') {
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
				const guess = board[currentRow].join('').toLowerCase()
				if (guess.length !== 5) return

				if (!validateWord(guess)) {
					toast.dismiss()
					toast(
						`"${guess.charAt(0).toUpperCase() + guess.slice(1)}" não é uma
								palavra válida.`,
						{
							position: 'top-center',
							duration: 5000
						}
					)
					return
				}

				const newBoardStatus = [...boardStatus]
				const guessLetters = board[currentRow].map((l) => l.toLowerCase())
				const wordLetters = word.split('')
				const status = Array(5).fill('')

				const letterCount: Record<string, number> = {}
				for (const l of wordLetters) letterCount[l] = (letterCount[l] || 0) + 1

				for (let i = 0; i < 5; i++) {
					if (guessLetters[i] === wordLetters[i]) {
						status[i] = 'correct'
						letterCount[guessLetters[i]]--
					}
				}

				for (let i = 0; i < 5; i++) {
					if (status[i]) continue

					if (letterCount[guessLetters[i]] > 0) {
						status[i] = 'wrong-pos'
						letterCount[guessLetters[i]]--
					} else status[i] = 'wrong'
				}
				newBoardStatus[currentRow] = status
				setBoardStatus(newBoardStatus)

				if (guess === word) {
					setIsWinner(true)
					setIsFinished(true)
					return
				}

				if (currentRow < 5) {
					setCurrentRow((prev) => prev + 1)
					setSelectedCol(0)
					cellRefs.current[currentRow + 1]?.[0]?.focus()
				} else setIsFinished(true)
			}
		},
		[
			board,
			boardStatus,
			currentRow,
			isFinished,
			handleCellClick,
			handleCellChange,
			word
		]
	)

	return (
		<GameContext.Provider
			value={{
				board,
				setBoard,
				boardStatus,
				currentRow,
				selectedCol,
				isFinished,
				isWinner,
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
