'use client'

import { useGame } from '@/contexts/GameContext'
import { useEffect } from 'react'

export function KeyboardListener({ children }: { children: React.ReactNode }) {
	const { selectedCol, isFinished, handleKeyDown } = useGame()

	useEffect(() => {
		const onKeyDown = (event: KeyboardEvent) => {
			handleKeyDown(event.key, selectedCol)
		}

		if (!isFinished) window.addEventListener('keydown', onKeyDown)
		return () => window.removeEventListener('keydown', onKeyDown)
	}, [handleKeyDown, isFinished, selectedCol])

	return <>{children}</>
}
