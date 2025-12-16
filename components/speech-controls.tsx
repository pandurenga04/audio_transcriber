"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Mic, Square, Trash2, AlertCircle, Settings, Download } from "lucide-react"
import { useSpeechRecognition } from "@/hooks/use-speech-recognition"
import { AudioVisualizer } from "@/components/audio-visualizer"

interface SpeechControlsProps {
  onTranscriptChange: (transcript: string) => void
}

export function SpeechControls({ onTranscriptChange }: SpeechControlsProps) {
  const {
    isListening,
    transcript,
    interimTranscript,
    error,
    isSupported,
    startListening,
    stopListening,
    clearTranscript,
  } = useSpeechRecognition()

  // Update parent component when transcript changes
  React.useEffect(() => {
    onTranscriptChange(transcript)
  }, [transcript, onTranscriptChange])

  const downloadTranscript = () => {
    const content = transcript + interimTranscript
    if (!content.trim()) return

    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `tamil-transcript-${new Date().toISOString().slice(0, 10)}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (!isSupported) {
    return (
      <Card className="p-6 text-center border-destructive/20">
        <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
        <h3 className="font-semibold mb-2">Speech Recognition Not Supported</h3>
        <p className="text-muted-foreground text-sm mb-4">
          Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari for the best
          experience.
        </p>
        <Button variant="outline" size="sm" asChild>
          <a href="https://www.google.com/chrome/" target="_blank" rel="noopener noreferrer">
            <Settings className="h-4 w-4 mr-2" />
            Get Chrome
          </a>
        </Button>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Audio Visualizer */}
      <div className="flex justify-center">
        <AudioVisualizer isListening={isListening} />
      </div>

      {/* Control Buttons */}
      <div className="flex items-center justify-center gap-6">
        <Button
          onClick={isListening ? stopListening : startListening}
          size="lg"
          className={`h-20 w-20 rounded-full transition-all duration-300 transform hover:scale-105 ${
            isListening
              ? "bg-destructive hover:bg-destructive/90 animate-pulse shadow-xl shadow-destructive/30"
              : "bg-primary hover:bg-primary/90 shadow-xl shadow-primary/30"
          }`}
        >
          {isListening ? <Square className="h-8 w-8" /> : <Mic className="h-8 w-8" />}
        </Button>

        <Button
          onClick={clearTranscript}
          variant="outline"
          size="lg"
          disabled={!transcript && !interimTranscript}
          className="h-14 px-6 hover:shadow-md transition-all bg-transparent"
        >
          <Trash2 className="h-5 w-5 mr-2" />
          Clear Text
        </Button>
      </div>

      {/* Status Indicator */}
      <div className="text-center min-h-[32px] flex items-center justify-center">
        {isListening && (
          <div className="flex items-center justify-center gap-3 text-primary">
            <div className="flex gap-1">
              <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
            <span className="text-base font-medium">Listening for Tamil speech...</span>
          </div>
        )}
        {error && (
          <div className="flex items-center justify-center gap-2 text-destructive bg-destructive/10 px-4 py-2 rounded-full">
            <AlertCircle className="h-4 w-4" />
            <span className="text-sm font-medium">Error: {error}</span>
          </div>
        )}
        {!isListening && !error && (
          <span className="text-muted-foreground">Click the microphone to start recording</span>
        )}
      </div>

      {/* Transcript Display */}
      <Card className="overflow-hidden bg-gradient-to-br from-card/80 to-card backdrop-blur-sm border-2">
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-base text-muted-foreground flex items-center gap-2">
              <div
                className={`h-3 w-3 rounded-full transition-colors ${
                  isListening ? "bg-primary animate-pulse" : "bg-muted"
                }`}
              />
              Tamil Speech Recognition
            </h3>
            {(transcript || interimTranscript) && (
              <div className="flex items-center gap-3">
                <div className="text-sm text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">
                  {transcript.length + interimTranscript.length} characters
                </div>
                <Button onClick={downloadTranscript} variant="outline" size="sm" className="h-8 px-3 bg-transparent">
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
              </div>
            )}
          </div>

          <div className="min-h-[100px] p-4 rounded-lg bg-background/70 border border-border/50">
            <div className="text-lg leading-relaxed">
              {transcript && <span className="text-foreground font-medium">{transcript}</span>}
              {interimTranscript && (
                <span className="text-muted-foreground italic bg-accent/20 px-2 py-1 rounded ml-1">
                  {interimTranscript}
                </span>
              )}
              {!transcript && !interimTranscript && (
                <div className="text-center py-8 text-muted-foreground">
                  <Mic className="h-8 w-8 mx-auto mb-3 opacity-50" />
                  <p className="text-base">Your Tamil speech will appear here...</p>
                  <p className="text-sm mt-1">Speak clearly for best results</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
