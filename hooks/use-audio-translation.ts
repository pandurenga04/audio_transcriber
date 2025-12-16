"use client"

import { useState, useCallback } from "react"
import { SUPPORTED_LANGUAGES } from "./use-translation"

export interface AudioTranslation {
  originalText: string
  translatedText: string
  language: string
  languageCode: string
  isPlaying: boolean
}

export function useAudioTranslation() {
  const [audioTranslations, setAudioTranslations] = useState<AudioTranslation[]>([])
  const [isTranslating, setIsTranslating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const translateAndSpeak = useCallback(async (text: string, targetLanguages: string[]) => {
    if (!text.trim()) return

    setIsTranslating(true)
    setError(null)

    try {
      // Translate text to target languages
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
          originalText: text,
          translatedText: data.responseData.translatedText,
          language: language?.name || langCode,
          languageCode: langCode,
          isPlaying: false,
        }
      })

      const results = await Promise.all(translationPromises)
      setAudioTranslations(results)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Translation failed")
    } finally {
      setIsTranslating(false)
    }
  }, [])

  const speakTranslation = useCallback((translatedText: string, languageCode: string, index: number) => {
    if ("speechSynthesis" in window) {
      // Stop any currently playing speech
      speechSynthesis.cancel()

      // Update playing state
      setAudioTranslations((prev) => prev.map((item, i) => ({ ...item, isPlaying: i === index })))

      const utterance = new SpeechSynthesisUtterance(translatedText)
      utterance.lang = languageCode
      utterance.rate = 0.8
      utterance.pitch = 1

      utterance.onend = () => {
        setAudioTranslations((prev) => prev.map((item) => ({ ...item, isPlaying: false })))
      }

      utterance.onerror = () => {
        setAudioTranslations((prev) => prev.map((item) => ({ ...item, isPlaying: false })))
        setError("Speech synthesis failed")
      }

      speechSynthesis.speak(utterance)
    } else {
      setError("Speech synthesis not supported in this browser")
    }
  }, [])

  const speakInTamil = useCallback(async (translatedText: string, fromLanguage: string) => {
    if (!translatedText.trim()) return

    try {
      // Translate back to Tamil
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(translatedText)}&langpair=${fromLanguage}|ta`,
      )

      if (!response.ok) {
        throw new Error("Translation to Tamil failed")
      }

      const data = await response.json()
      const tamilText = data.responseData.translatedText

      // Speak in Tamil
      if ("speechSynthesis" in window) {
        speechSynthesis.cancel()

        const utterance = new SpeechSynthesisUtterance(tamilText)
        utterance.lang = "ta"
        utterance.rate = 0.8
        utterance.pitch = 1

        speechSynthesis.speak(utterance)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Tamil translation failed")
    }
  }, [])

  const clearAudioTranslations = useCallback(() => {
    setAudioTranslations([])
    setError(null)
    speechSynthesis.cancel()
  }, [])

  return {
    audioTranslations,
    isTranslating,
    error,
    translateAndSpeak,
    speakTranslation,
    speakInTamil,
    clearAudioTranslations,
  }
}
