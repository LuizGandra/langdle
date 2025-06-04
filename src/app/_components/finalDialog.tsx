'use client'

import {
	Dialog,
	DialogContent,
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

	const [show, setShow] = useState(isFinished)

	const handleShowChange = () => {
		setShow((value) => !value)
	}

	useEffect(() => {
		if (isFinished) handleShowChange()
	}, [isFinished])

	return (
		<Dialog open={show} onOpenChange={setShow}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader className="mb-4">
					<DialogTitle className="text-center leading-none">
						{isWinner ? 'Congratulations!' : 'Better luck next time!'}
					</DialogTitle>
				</DialogHeader>
				<div className="space-y-4">
					<h2 className="text-center text-3xl font-medium leading-none">
						{word.toUpperCase()}
					</h2>
					<p className="text-center">{meaning}</p>
					<p className="text-zinc-600 text-center">
						<strong className="font-medium">Example:</strong> "{example}"
					</p>
				</div>
			</DialogContent>
		</Dialog>
	)
}
