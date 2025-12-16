"use client"

import { useState, useCallback } from "react"

export interface Translation {
  language: string
  text: string
  languageCode: string
}

export interface TranslationLanguage {
  code: string
  name: string
  flag: string
}

export const SUPPORTED_LANGUAGES: TranslationLanguage[] = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Spanish", flag: "🇪🇸" },
  { code: "de", name: "German", flag: "🇩🇪" },
  { code: "hi", name: "Hindi", flag: "🇮🇳" },
  { code: "ja", name: "Japanese", flag: "🇯🇵" },
]

export function useTranslation() {
  const [translations, setTranslations] = useState<Translation[]>([])
  const [isTranslating, setIsTranslating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const translateText = useCallback(async (text: string, targetLanguages: string[]) => {
    if (!text.trim()) return

    setIsTranslating(true)
    setError(null)

    try {
      // Using Google Translate API via a free service
      const translationPromises = targetLanguages.map(async (langCode) => {
        const response = await fetch(
          `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=ta|${langCode}`,
        )

        if (!response.ok) {
          throw new Error(`Translation failed for ${langCode}`)
        }

        const data = await response.json()
        const language = SUPPORTED_LANGUAGES.find((lang) => lang.code === langCode)

        return {
          language: language?.name || langCode,
          text: data.responseData.translatedText,
          languageCode: langCode,
        }
      })

      const results = await Promise.all(translationPromises)
      setTranslations(results)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Translation failed")
    } finally {
      setIsTranslating(false)
    }
  }, [])

  const clearTranslations = useCallback(() => {
    setTranslations([])
    setError(null)
  }, [])

  return {
    translations,
    isTranslating,
    error,
    translateText,
    clearTranslations,
  }
}
