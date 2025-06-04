'use server'

import dictionary from '@/store/en.json'

let cachedDictionary: Record<string, string> | null = null

export async function loadDictionary() {
	if (cachedDictionary) return cachedDictionary

	cachedDictionary = Object.fromEntries(
		Object.entries(dictionary).filter(([key]) => key.length === 5)
	)

	return cachedDictionary
}

export async function validateWord(word: string) {
	if (!cachedDictionary) cachedDictionary = await loadDictionary()

	if (word.length !== 5) return false

	return Object.keys(cachedDictionary).includes(word)
}
