"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TAMIL_CITIES } from "@/data/tourist-attractions"
import { MapPin, ChevronDown, ChevronUp } from "lucide-react"

interface CitySelectorProps {
  selectedCity: string | null
  onCityChange: (cityId: string | null) => void
}

export function CitySelector({ selectedCity, onCityChange }: CitySelectorProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  const selectedCityData = selectedCity ? TAMIL_CITIES.find((city) => city.id === selectedCity) : null

  return (
    <Card className="overflow-hidden">
      {/* Header */}
      <div
        className="p-4 bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-primary" />
            <div>
              <h3 className="font-semibold">தமிழ் நகரங்கள் / Tamil Cities</h3>
              <p className="text-sm text-muted-foreground">
                {selectedCityData
                  ? `${selectedCityData.nameTamil} / ${selectedCityData.name} selected`
                  : "எந்த நகரமும் தேர்ந்தெடுக்கப்படவில்லை / No city selected"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {selectedCityData && (
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                {selectedCityData.attractions.length} இடங்கள்
              </Badge>
            )}
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>

      {/* City Selection */}
      {isExpanded && (
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">நகரத்தைத் தேர்ந்தெடுக்கவும் / Select a city</p>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onCityChange(null)}
              disabled={!selectedCity}
              className="h-8 text-xs bg-transparent"
            >
              அனைத்தும் / All
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {TAMIL_CITIES.map((city) => {
              const isSelected = selectedCity === city.id
              return (
                <div
                  key={city.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-sm ${
                    isSelected
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "border-border hover:border-primary/50 hover:bg-muted/30"
                  }`}
                  onClick={() => onCityChange(city.id)}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-sm">{city.nameTamil}</h4>
                      <Badge variant="outline" className="text-xs">
                        {city.attractions.length} இடங்கள்
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground font-medium">{city.name}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{city.descriptionTamil}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </Card>
  )
}
