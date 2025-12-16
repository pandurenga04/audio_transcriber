"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { SpeechControls } from "@/components/speech-controls"
import { TranslationResults } from "@/components/translation-results"
import { LanguageSelector } from "@/components/language-selector"
import { useTranslation } from "@/hooks/use-translation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Languages, Mic, Zap, MapPin, ArrowRight } from "lucide-react"

export default function HomePage() {
  const [transcript, setTranscript] = useState("")
  const [selectedLanguages, setSelectedLanguages] = useState(["en", "es", "hi"])
  const { translations, isTranslating, error, translateText, clearTranslations } = useTranslation()

  // Auto-translate when transcript changes
  useEffect(() => {
    if (transcript.trim() && selectedLanguages.length > 0) {
      const timeoutId = setTimeout(() => {
        translateText(transcript, selectedLanguages)
      }, 1000) // Debounce for 1 second

      return () => clearTimeout(timeoutId)
    }
  }, [transcript, selectedLanguages, translateText])

  const handleClearAll = () => {
    setTranscript("")
    clearTranslations()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center">
                <Languages className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-balance">Tamil Voice Translator</h1>
                <p className="text-sm text-muted-foreground">Real-time speech translation</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Zap className="h-3 w-3" />
                High Speed
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        <section>
          <Card className="p-6 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-4">
                <MapPin className="h-8 w-8 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h2 className="text-lg font-semibold mb-2">என் இடத்தை அறிந்து கொள்ளுங்கள் / Know My Place</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    தமிழ்நாட்டின் அழகிய சுற்றுலா இடங்களை கண்டறிந்து, அவற்றின் விளக்கங்களை உங்கள் விருப்பமான மொழிகளில் கேட்டு அனுபவிக்கவும்.
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Discover beautiful tourist attractions in Tamil Nadu with audio descriptions in multiple languages.
                  </p>
                </div>
              </div>
              <Link href="/know-my-place">
                <Button className="gap-2 whitespace-nowrap">
                  Explore Places
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </Card>
        </section>

        {/* Language Selection */}
        <section>
          <LanguageSelector selectedLanguages={selectedLanguages} onLanguageChange={setSelectedLanguages} />
        </section>

        {/* Speech Input */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Mic className="h-5 w-5 text-primary" />
              Speech Input
            </h2>
            {(transcript || translations.length > 0) && (
              <Button variant="outline" onClick={handleClearAll}>
                Clear All
              </Button>
            )}
          </div>
          <SpeechControls onTranscriptChange={setTranscript} />
        </section>

        {/* Translation Results */}
        <section>
          <div className="mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Languages className="h-5 w-5 text-primary" />
              Translations
              {isTranslating && (
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <div className="h-2 w-2 bg-primary rounded-full animate-pulse" />
                  Translating...
                </div>
              )}
            </h2>
            {selectedLanguages.length === 0 && (
              <p className="text-sm text-muted-foreground mt-1">Please select at least one target language above</p>
            )}
          </div>

          {selectedLanguages.length > 0 ? (
            <TranslationResults translations={translations} isTranslating={isTranslating} error={error} />
          ) : (
            <Card className="p-8 text-center">
              <Languages className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Select target languages to see translations</p>
            </Card>
          )}
        </section>

        {/* Features Info */}
        <section className="mt-12">
          <Card className="p-6 bg-muted/30">
            <h3 className="font-semibold mb-3">Features</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div className="flex items-start gap-2">
                <Mic className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Real-time Speech Recognition</p>
                  <p className="text-muted-foreground">Converts Tamil speech to text instantly</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Languages className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Multi-language Translation</p>
                  <p className="text-muted-foreground">Supports 5 major languages</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Zap className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">High-speed Processing</p>
                  <p className="text-muted-foreground">Fast translation with minimal delay</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Tourist Guide</p>
                  <p className="text-muted-foreground">Audio descriptions of Tamil attractions</p>
                </div>
              </div>
            </div>
          </Card>
        </section>
      </main>
    </div>
  )
}
