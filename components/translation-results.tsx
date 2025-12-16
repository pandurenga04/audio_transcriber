"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Volume2, Download, Share2 } from "lucide-react"
import type { Translation } from "@/hooks/use-translation"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"

interface TranslationResultsProps {
  translations: Translation[]
  isTranslating: boolean
  error: string | null
}

export function TranslationResults({ translations, isTranslating, error }: TranslationResultsProps) {
  const { toast } = useToast()
  const [playingIndex, setPlayingIndex] = useState<number | null>(null)

  const copyToClipboard = async (text: string, language: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast({
        title: "Copied!",
        description: `${language} translation copied to clipboard`,
      })
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Unable to copy to clipboard",
        variant: "destructive",
      })
    }
  }

  const speakText = (text: string, languageCode: string, index: number) => {
    if ("speechSynthesis" in window) {
      // Stop any currently playing speech
      speechSynthesis.cancel()

      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = languageCode
      utterance.rate = 0.8
      utterance.pitch = 1

      utterance.onstart = () => setPlayingIndex(index)
      utterance.onend = () => setPlayingIndex(null)
      utterance.onerror = () => {
        setPlayingIndex(null)
        toast({
          title: "Speech failed",
          description: "Unable to play audio",
          variant: "destructive",
        })
      }

      speechSynthesis.speak(utterance)
    } else {
      toast({
        title: "Speech not supported",
        description: "Text-to-speech is not supported in your browser",
        variant: "destructive",
      })
    }
  }

  const shareTranslation = async (text: string, language: string) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Translation to ${language}`,
          text: text,
        })
      } catch (err) {
        // User cancelled sharing
      }
    } else {
      // Fallback to copying
      copyToClipboard(text, language)
    }
  }

  const downloadTranslations = () => {
    const content = translations.map((t) => `${t.language}:\n${t.text}\n`).join("\n")

    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "translations.txt"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (error) {
    return (
      <Card className="p-6 text-center border-destructive/20">
        <div className="text-destructive mb-2">Translation Error</div>
        <p className="text-sm text-muted-foreground">{error}</p>
      </Card>
    )
  }

  if (isTranslating) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <Card key={i} className="p-4">
            <div className="animate-pulse">
              <div className="flex items-center justify-between mb-3">
                <div className="h-4 bg-muted rounded w-20"></div>
                <div className="h-6 bg-muted rounded w-16"></div>
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-muted rounded"></div>
                <div className="h-3 bg-muted rounded w-4/5"></div>
                <div className="h-3 bg-muted rounded w-3/5"></div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    )
  }

  if (translations.length === 0) {
    return (
      <Card className="p-8 text-center">
        <div className="text-muted-foreground space-y-2">
          <p className="text-lg">Ready for translation</p>
          <p className="text-sm">Start speaking in Tamil to see translations appear here</p>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {/* Action Bar */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {translations.length} translation{translations.length !== 1 ? "s" : ""} ready
        </p>
        <Button variant="outline" size="sm" onClick={downloadTranslations} className="h-8 bg-transparent">
          <Download className="h-3 w-3 mr-2" />
          Download All
        </Button>
      </div>

      {/* Translation Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {translations.map((translation, index) => (
          <Card key={index} className="p-4 hover:shadow-md transition-all duration-200 group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-sm text-primary flex items-center gap-2">
                  <span className="text-lg">
                    {translation.languageCode === "en" && "🇺🇸"}
                    {translation.languageCode === "es" && "🇪🇸"}
                    {translation.languageCode === "de" && "🇩🇪"}
                    {translation.languageCode === "hi" && "🇮🇳"}
                    {translation.languageCode === "ja" && "🇯🇵"}
                  </span>
                  {translation.language}
                </h3>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => speakText(translation.text, translation.languageCode, index)}
                    className="h-8 w-8 p-0"
                    disabled={playingIndex === index}
                  >
                    <Volume2 className={`h-3 w-3 ${playingIndex === index ? "animate-pulse text-primary" : ""}`} />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(translation.text, translation.language)}
                    className="h-8 w-8 p-0"
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => shareTranslation(translation.text, translation.language)}
                    className="h-8 w-8 p-0"
                  >
                    <Share2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <div className="relative">
                <p className="text-sm leading-relaxed text-card-foreground min-h-[3rem] p-3 bg-background/50 rounded-md border">
                  {translation.text}
                </p>
                {playingIndex === index && (
                  <div className="absolute top-2 right-2">
                    <div className="flex gap-1">
                      <div
                        className="h-1 w-1 bg-primary rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      />
                      <div
                        className="h-1 w-1 bg-primary rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      />
                      <div
                        className="h-1 w-1 bg-primary rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
