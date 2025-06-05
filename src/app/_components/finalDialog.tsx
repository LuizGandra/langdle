'use client'

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle
} from '@/components/ui/dialog'
import { useGame } from '@/contexts/GameContext'
import { useEffect, useState } from 'react'

type FinalDialogProps = {
	word: string
	meaning: string
	example: string
}

export function FinalDialog({ word, meaning, example }: FinalDialogProps) {
	const { isFinished, isWinner } = useGame()

	const [show, setShow] = useState(false)

	useEffect(() => {
		setShow(isFinished)
	}, [isFinished])

	return (
		<Dialog open={show} onOpenChange={setShow}>
			<DialogContent className="max-w-4xs">
				<DialogHeader className="mb-4">
					<DialogTitle className="text-center leading-none">
						{isWinner ? 'Parabéns!' : 'Boa sorte na próxima!'}
					</DialogTitle>
					<DialogDescription className="sr-only">
						The game is over. Here are the details of the word you played.
					</DialogDescription>
				</DialogHeader>
				<div className="space-y-4">
					<h2 className="text-center text-3xl font-medium leading-none">
						{word.toUpperCase()}
					</h2>
					<p className="text-center">{meaning}</p>
					<p className="text-center">
						<strong className="font-medium">Example:</strong> "{example}"
					</p>
				</div>
			</DialogContent>
		</Dialog>
	)
}
