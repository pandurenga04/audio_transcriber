"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Volume2, Languages, MapPin, Play } from "lucide-react"
import type { TouristAttraction } from "@/data/tourist-attractions"
import { useAudioTranslation } from "@/hooks/use-audio-translation"
import { SUPPORTED_LANGUAGES } from "@/hooks/use-translation"

interface AttractionCardProps {
  attraction: TouristAttraction
  selectedLanguages: string[]
}

export function AttractionCard({ attraction, selectedLanguages }: AttractionCardProps) {
  const [showTranslations, setShowTranslations] = useState(false)
  const { audioTranslations, isTranslating, translateAndSpeak, speakTranslation, speakInTamil } = useAudioTranslation()

  const handleTranslate = () => {
    if (selectedLanguages.length === 0) return
    translateAndSpeak(attraction.descriptionTamil, selectedLanguages)
    setShowTranslations(true)
  }

  const handleSpeakTamil = () => {
    if ("speechSynthesis" in window) {
      speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(attraction.descriptionTamil)
      utterance.lang = "ta"
      utterance.rate = 0.8
      utterance.pitch = 1
      speechSynthesis.speak(utterance)
    }
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={attraction.image || "/placeholder.svg"}
          alt={attraction.nameTamil}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="bg-black/70 text-white">
            {attraction.categoryTamil}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Title and Location */}
        <div>
          <h3 className="font-bold text-lg text-balance leading-tight">{attraction.nameTamil}</h3>
          <p className="text-sm text-muted-foreground font-medium">{attraction.name}</p>
          <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span>
              {attraction.cityTamil} / {attraction.city}
            </span>
          </div>
        </div>

        {/* Tamil Description */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">விளக்கம் / Description:</p>
            <Button size="sm" variant="ghost" onClick={handleSpeakTamil} className="h-8 w-8 p-0">
              <Volume2 className="h-3 w-3" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{attraction.descriptionTamil}</p>
          <p className="text-xs text-muted-foreground leading-relaxed">{attraction.description}</p>
        </div>

        {/* Translation Controls */}
        <div className="space-y-3 pt-2 border-t">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium">மொழிபெயர்ப்பு / Translation:</p>
            <Button
              size="sm"
              variant="outline"
              onClick={handleTranslate}
              disabled={selectedLanguages.length === 0 || isTranslating}
              className="h-8 text-xs bg-transparent"
            >
              {isTranslating ? (
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-primary rounded-full animate-pulse" />
                  மொழிபெயர்க்கிறது...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Languages className="h-3 w-3" />
                  மொழிபெயர்க்கவும்
                </div>
              )}
            </Button>
          </div>

          {selectedLanguages.length === 0 && (
            <p className="text-xs text-muted-foreground">மொழிகளைத் தேர்ந்தெடுக்கவும் / Please select languages above</p>
          )}
        </div>

        {/* Audio Translations */}
        {showTranslations && audioTranslations.length > 0 && (
          <div className="space-y-2 pt-2 border-t">
            <p className="text-xs font-medium">ஆடியோ மொழிபெயர்ப்பு / Audio Translations:</p>
            <div className="grid gap-2">
              {audioTranslations.map((translation, index) => {
                const language = SUPPORTED_LANGUAGES.find((lang) => lang.code === translation.languageCode)
                return (
                  <div key={index} className="flex items-center justify-between p-2 bg-muted/30 rounded-md">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs">{language?.flag}</span>
                        <span className="text-xs font-medium">{translation.language}</span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{translation.translatedText}</p>
                    </div>
                    <div className="flex gap-1 ml-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => speakTranslation(translation.translatedText, translation.languageCode, index)}
                        className="h-6 w-6 p-0"
                        disabled={translation.isPlaying}
                      >
                        <Play className={`h-3 w-3 ${translation.isPlaying ? "animate-pulse text-primary" : ""}`} />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => speakInTamil(translation.translatedText, translation.languageCode)}
                        className="h-6 w-6 p-0"
                        title="தமிழில் கேளுங்கள் / Listen in Tamil"
                      >
                        <Volume2 className="h-3 w-3 text-primary" />
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
