"use client"

import { useState } from "react"
import { CitySelector } from "@/components/tourist-attractions/city-selector"
import { AttractionsGrid } from "@/components/tourist-attractions/attractions-grid"
import { LanguageSelector } from "@/components/language-selector"
import { Card } from "@/components/ui/card"
import { MapPin, Languages, Volume2, Info } from "lucide-react"

export default function KnowMyPlacePage() {
  const [selectedCity, setSelectedCity] = useState<string | null>(null)
  const [selectedLanguages, setSelectedLanguages] = useState(["en", "es", "hi"])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center">
                <MapPin className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-balance">என் இடத்தை அறிந்து கொள்ளுங்கள்</h1>
                <p className="text-sm text-muted-foreground">Know My Place - Tamil Tourist Attractions</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Volume2 className="h-3 w-3" />
                Audio Enabled
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Introduction */}
        <section>
          <Card className="p-6 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
            <div className="flex items-start gap-4">
              <Info className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
              <div className="space-y-2">
                <h2 className="text-lg font-semibold">தமிழ்நாட்டின் அழகிய இடங்களை கண்டறியுங்கள்</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  தமிழ்நாட்டின் முக்கிய நகரங்களில் உள்ள சுற்றுலா இடங்களை கண்டறிந்து, அவற்றின் விளக்கங்களை உங்கள் விருப்பமான மொழிகளில் கேட்டு
                  அனுபவிக்கவும். ஒவ்வொரு இடத்தின் விவரங்களும் தமிழில் கிடைக்கும், மேலும் அவற்றை பிற மொழிகளில் மொழிபெயர்த்து கேட்கலாம்.
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Discover tourist attractions in major Tamil cities and experience their descriptions in your preferred
                  languages. Each location's details are available in Tamil, and you can translate and listen to them in
                  other languages.
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* Language Selection */}
        <section>
          <div className="mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Languages className="h-5 w-5 text-primary" />
              மொழி தேர்வு / Language Selection
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              ஆடியோ மொழிபெயர்ப்புக்கான மொழிகளைத் தேர்ந்தெடுக்கவும் / Select languages for audio translation
            </p>
          </div>
          <LanguageSelector selectedLanguages={selectedLanguages} onLanguageChange={setSelectedLanguages} />
        </section>

        {/* City Selection */}
        <section>
          <div className="mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              நகர தேர்வு / City Selection
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              குறிப்பிட்ட நகரத்தின் இடங்களைப் பார்க்க தேர்ந்தெடுக்கவும் / Select to view attractions from a specific city
            </p>
          </div>
          <CitySelector selectedCity={selectedCity} onCityChange={setSelectedCity} />
        </section>

        {/* Attractions Display */}
        <section>
          <AttractionsGrid selectedCity={selectedCity} selectedLanguages={selectedLanguages} />
        </section>

        {/* Usage Instructions */}
        <section className="mt-12">
          <Card className="p-6 bg-muted/30">
            <h3 className="font-semibold mb-3">பயன்பாட்டு வழிமுறைகள் / Usage Instructions</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <Languages className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">மொழி தேர்வு / Language Selection</p>
                    <p className="text-muted-foreground">உங்கள் விருப்பமான மொழிகளைத் தேர்ந்தெடுக்கவும்</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">நகர தேர்வு / City Selection</p>
                    <p className="text-muted-foreground">குறிப்பிட்ட நகரம் அல்லது அனைத்து நகரங்களையும் பார்க்கவும்</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <Volume2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">ஆடியோ மொழிபெயர்ப்பு / Audio Translation</p>
                    <p className="text-muted-foreground">விளக்கங்களை மொழிபெயர்த்து கேட்கவும்</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">தமிழ் ஆடியோ / Tamil Audio</p>
                    <p className="text-muted-foreground">மொழிபெயர்ப்பை மீண்டும் தமிழில் கேட்கவும்</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>
      </main>
    </div>
  )
}
