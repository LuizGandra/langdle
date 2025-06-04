import fs from 'fs'
import path from 'path'

let cachedDictionary: Record<string, string> | null = null

export function getDictionary() {
  if (cachedDictionary) return cachedDictionary

  const dictionaryPath = path.join(process.cwd(), 'src/store/en.json')
  const rawData = fs.readFileSync(dictionaryPath, 'utf-8')
  cachedDictionary = JSON.parse(rawData)

  return cachedDictionary
}