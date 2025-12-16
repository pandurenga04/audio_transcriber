"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Volume2, MapPin, Headphones } from "lucide-react"
import type { TouristAttraction } from "@/data/tourist-attractions"
import { useAudioTranslation } from "@/hooks/use-audio-translation"
import { AudioPlayer } from "./audio-player"
import { SUPPORTED_LANGUAGES } from "@/hooks/use-translation"

interface EnhancedAttractionCardProps {
  attraction: TouristAttraction
  selectedLanguages: string[]
}

export function EnhancedAttractionCard({ attraction, selectedLanguages }: EnhancedAttractionCardProps) {
  const [activeTab, setActiveTab] = useState("info")
  const [showTranslations, setShowTranslations] = useState(false)
  const { audioTranslations, isTranslating, translateAndSpeak, speakInTamil } = useAudioTranslation()

  const handleTranslate = () => {
    if (selectedLanguages.length === 0) return
    translateAndSpeak(attraction.descriptionTamil, selectedLanguages)
    setShowTranslations(true)
    setActiveTab("audio")
  }

  const handleSpeakTamil = () => {
    speakInTamil(attraction.descriptionTamil, "ta")
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
        <div className="absolute bottom-3 left-3">
          <Button
            size="sm"
            variant="secondary"
            onClick={handleSpeakTamil}
            className="h-8 gap-2 bg-black/70 text-white hover:bg-black/80"
          >
            <Volume2 className="h-3 w-3" />
            தமிழில் கேளுங்கள்
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="info" className="text-xs">
              தகவல் / Info
            </TabsTrigger>
            <TabsTrigger value="audio" className="text-xs">
              ஆடியோ / Audio
            </TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="space-y-4 mt-4">
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
              <p className="text-sm font-medium">விளக்கம் / Description:</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{attraction.descriptionTamil}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{attraction.description}</p>
            </div>

            {/* Translation Button */}
            <div className="pt-2 border-t">
              <Button
                onClick={handleTranslate}
                disabled={selectedLanguages.length === 0 || isTranslating}
                className="w-full h-10 gap-2"
              >
                {isTranslating ? (
                  <>
                    <div className="h-2 w-2 bg-white rounded-full animate-pulse" />
                    மொழிபெயர்க்கிறது...
                  </>
                ) : (
                  <>
                    <Headphones className="h-4 w-4" />
                    ஆடியோ மொழிபெயர்ப்பு / Audio Translation
                  </>
                )}
              </Button>

              {selectedLanguages.length === 0 && (
                <p className="text-xs text-muted-foreground text-center mt-2">
                  மொழிகளைத் தேர்ந்தெடுக்கவும் / Please select languages above
                </p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="audio" className="space-y-4 mt-4">
            {/* Tamil Audio */}
            <div>
              <p className="text-sm font-medium mb-2">தமிழ் ஆடியோ / Tamil Audio:</p>
              <AudioPlayer text={attraction.descriptionTamil} language="தமிழ் / Tamil" languageCode="ta" />
            </div>

            {/* Translated Audio */}
            {showTranslations && audioTranslations.length > 0 && (
              <div>
                <p className="text-sm font-medium mb-2">மொழிபெயர்க்கப்பட்ட ஆடியோ / Translated Audio:</p>
                <div className="space-y-3">
                  {audioTranslations.map((translation, index) => {
                    const language = SUPPORTED_LANGUAGES.find((lang) => lang.code === translation.languageCode)
                    return (
                      <div key={index} className="space-y-2">
                        <AudioPlayer
                          text={translation.translatedText}
                          language={`${language?.flag} ${translation.language}`}
                          languageCode={translation.languageCode}
                        />

                        {/* Back to Tamil Button */}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => speakInTamil(translation.translatedText, translation.languageCode)}
                          className="w-full h-8 text-xs gap-2"
                        >
                          <Volume2 className="h-3 w-3" />
                          இதை தமிழில் கேளுங்கள் / Listen in Tamil
                        </Button>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {!showTranslations && (
              <div className="text-center py-8">
                <Headphones className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-sm text-muted-foreground mb-2">ஆடியோ மொழிபெயர்ப்பு கிடைக்கவில்லை</p>
                <p className="text-xs text-muted-foreground">
                  Audio translations not available. Click "Audio Translation" in the Info tab.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Card>
  )
}
