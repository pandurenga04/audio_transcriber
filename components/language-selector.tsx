"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { SUPPORTED_LANGUAGES } from "@/hooks/use-translation"
import { Globe, CheckCircle2 } from "lucide-react"

interface LanguageSelectorProps {
  selectedLanguages: string[]
  onLanguageChange: (languages: string[]) => void
}

export function LanguageSelector({ selectedLanguages, onLanguageChange }: LanguageSelectorProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  const toggleLanguage = (languageCode: string) => {
    const updated = selectedLanguages.includes(languageCode)
      ? selectedLanguages.filter((code) => code !== languageCode)
      : [...selectedLanguages, languageCode]

    onLanguageChange(updated)
  }

  const selectAll = () => {
    onLanguageChange(SUPPORTED_LANGUAGES.map((lang) => lang.code))
  }

  const clearAll = () => {
    onLanguageChange([])
  }

  const getSelectedLanguageNames = () => {
    return selectedLanguages
      .map((code) => SUPPORTED_LANGUAGES.find((lang) => lang.code === code)?.name)
      .filter(Boolean)
      .join(", ")
  }

  return (
    <Card className="overflow-hidden">
      {/* Header */}
      <div
        className="p-4 bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Globe className="h-5 w-5 text-primary" />
            <div>
              <h3 className="font-semibold">Target Languages</h3>
              <p className="text-sm text-muted-foreground">
                {selectedLanguages.length > 0
                  ? `${selectedLanguages.length} selected: ${getSelectedLanguageNames()}`
                  : "No languages selected"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {selectedLanguages.length > 0 && (
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                {selectedLanguages.length}
              </Badge>
            )}
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <CheckCircle2 className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
            </Button>
          </div>
        </div>
      </div>

      {/* Language Selection */}
      {isExpanded && (
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Select languages for translation</p>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={selectAll}
                disabled={selectedLanguages.length === SUPPORTED_LANGUAGES.length}
                className="h-8 text-xs bg-transparent"
              >
                Select All
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={clearAll}
                disabled={selectedLanguages.length === 0}
                className="h-8 text-xs bg-transparent"
              >
                Clear All
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {SUPPORTED_LANGUAGES.map((language) => {
              const isSelected = selectedLanguages.includes(language.code)
              return (
                <div
                  key={language.code}
                  className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-all hover:shadow-sm ${
                    isSelected
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "border-border hover:border-primary/50 hover:bg-muted/30"
                  }`}
                  onClick={() => toggleLanguage(language.code)}
                >
                  <Checkbox
                    id={language.code}
                    checked={isSelected}
                    onChange={() => toggleLanguage(language.code)}
                    className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <label htmlFor={language.code} className="flex items-center gap-3 cursor-pointer flex-1">
                    <span className="text-2xl">{language.flag}</span>
                    <div>
                      <p className="font-medium text-sm">{language.name}</p>
                      <p className="text-xs text-muted-foreground uppercase">{language.code}</p>
                    </div>
                  </label>
                </div>
              )
            })}
          </div>

          <div className="pt-2 border-t">
            <p className="text-xs text-muted-foreground text-center">
              Translation powered by MyMemory API • Real-time processing
            </p>
          </div>
        </div>
      )}
    </Card>
  )
}
