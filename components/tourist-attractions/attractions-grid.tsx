"use client"

import { useState, useMemo } from "react"
import { EnhancedAttractionCard } from "./enhanced-attraction-card"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TAMIL_CITIES, ATTRACTION_CATEGORIES } from "@/data/tourist-attractions"
import { Filter, MapPin } from "lucide-react"

interface AttractionsGridProps {
  selectedCity: string | null
  selectedLanguages: string[]
}

export function AttractionsGrid({ selectedCity, selectedLanguages }: AttractionsGridProps) {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showFilters, setShowFilters] = useState(false)

  const filteredAttractions = useMemo(() => {
    let attractions = selectedCity
      ? TAMIL_CITIES.find((city) => city.id === selectedCity)?.attractions || []
      : TAMIL_CITIES.flatMap((city) => city.attractions)

    if (selectedCategory !== "all") {
      attractions = attractions.filter((attraction) => attraction.category.toLowerCase() === selectedCategory)
    }

    return attractions
  }, [selectedCity, selectedCategory])

  const selectedCityData = selectedCity ? TAMIL_CITIES.find((city) => city.id === selectedCity) : null

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">
            {selectedCityData ? `${selectedCityData.nameTamil} இடங்கள்` : "தமிழ்நாட்டு சுற்றுலா இடங்கள்"}
          </h2>
          <p className="text-sm text-muted-foreground">
            {selectedCityData ? `${selectedCityData.name} Tourist Attractions` : "Tamil Nadu Tourist Attractions"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline">{filteredAttractions.length} இடங்கள்</Badge>
          <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)} className="h-8">
            <Filter className="h-3 w-3 mr-2" />
            வடிகட்டி
          </Button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <Card className="p-4">
          <div className="space-y-3">
            <p className="text-sm font-medium">வகைகள் / Categories:</p>
            <div className="flex flex-wrap gap-2">
              {ATTRACTION_CATEGORIES.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="h-8 text-xs"
                >
                  {category.nameTamil}
                </Button>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* City Description */}
      {selectedCityData && (
        <Card className="p-4 bg-muted/30">
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold mb-2">{selectedCityData.nameTamil} பற்றி</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-2">{selectedCityData.descriptionTamil}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{selectedCityData.description}</p>
            </div>
          </div>
        </Card>
      )}

      {/* Attractions Grid */}
      {filteredAttractions.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredAttractions.map((attraction) => (
            <EnhancedAttractionCard key={attraction.id} attraction={attraction} selectedLanguages={selectedLanguages} />
          ))}
        </div>
      ) : (
        <Card className="p-8 text-center">
          <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground mb-2">
            {selectedCategory === "all" ? "இந்த நகரத்தில் இடங்கள் இல்லை" : "இந்த வகையில் இடங்கள் இல்லை"}
          </p>
          <p className="text-sm text-muted-foreground">
            {selectedCategory === "all" ? "No attractions found in this city" : "No attractions found in this category"}
          </p>
        </Card>
      )}
    </div>
  )
}
