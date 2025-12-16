"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Volume2, VolumeX, Play, Pause, RotateCcw } from "lucide-react"

interface AudioPlayerProps {
  text: string
  language: string
  languageCode: string
  onPlay?: () => void
  onStop?: () => void
  className?: string
}

export function AudioPlayer({ text, language, languageCode, onPlay, onStop, className = "" }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentUtterance, setCurrentUtterance] = useState<SpeechSynthesisUtterance | null>(null)

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      if (currentUtterance) {
        speechSynthesis.cancel()
      }
    }
  }, [currentUtterance])

  const handlePlay = () => {
    if (!("speechSynthesis" in window)) {
      alert("Speech synthesis not supported in this browser")
      return
    }

    if (isPaused && currentUtterance) {
      // Resume paused speech
      speechSynthesis.resume()
      setIsPaused(false)
      setIsPlaying(true)
      return
    }

    // Stop any currently playing speech
    speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = languageCode
    utterance.rate = 0.8
    utterance.pitch = 1
    utterance.volume = 1

    // Estimate duration (rough calculation)
    const estimatedDuration = (text.length / 10) * 1000 // ~10 characters per second
    setDuration(estimatedDuration)

    let startTime = Date.now()
    let progressInterval: NodeJS.Timeout

    utterance.onstart = () => {
      setIsPlaying(true)
      setIsPaused(false)
      setProgress(0)
      onPlay?.()

      // Update progress
      progressInterval = setInterval(() => {
        const elapsed = Date.now() - startTime
        const progressPercent = Math.min((elapsed / estimatedDuration) * 100, 100)
        setProgress(progressPercent)
      }, 100)
    }

    utterance.onend = () => {
      setIsPlaying(false)
      setIsPaused(false)
      setProgress(100)
      setCurrentUtterance(null)
      onStop?.()
      if (progressInterval) clearInterval(progressInterval)
    }

    utterance.onerror = () => {
      setIsPlaying(false)
      setIsPaused(false)
      setProgress(0)
      setCurrentUtterance(null)
      onStop?.()
      if (progressInterval) clearInterval(progressInterval)
    }

    utterance.onpause = () => {
      setIsPaused(true)
      setIsPlaying(false)
      if (progressInterval) clearInterval(progressInterval)
    }

    utterance.onresume = () => {
      setIsPaused(false)
      setIsPlaying(true)
      startTime = Date.now() - (progress / 100) * estimatedDuration
      progressInterval = setInterval(() => {
        const elapsed = Date.now() - startTime
        const progressPercent = Math.min((elapsed / estimatedDuration) * 100, 100)
        setProgress(progressPercent)
      }, 100)
    }

    setCurrentUtterance(utterance)
    speechSynthesis.speak(utterance)
  }

  const handlePause = () => {
    if (speechSynthesis.speaking && !speechSynthesis.paused) {
      speechSynthesis.pause()
    }
  }

  const handleStop = () => {
    speechSynthesis.cancel()
    setIsPlaying(false)
    setIsPaused(false)
    setProgress(0)
    setCurrentUtterance(null)
    onStop?.()
  }

  const handleRestart = () => {
    handleStop()
    setTimeout(handlePlay, 100)
  }

  return (
    <Card className={`p-3 ${className}`}>
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Volume2 className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">{language}</span>
          </div>
          <div className="flex items-center gap-1">
            <Button
              size="sm"
              variant="ghost"
              onClick={handleRestart}
              disabled={!isPlaying && !isPaused}
              className="h-6 w-6 p-0"
            >
              <RotateCcw className="h-3 w-3" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleStop}
              disabled={!isPlaying && !isPaused}
              className="h-6 w-6 p-0"
            >
              <VolumeX className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        {(isPlaying || isPaused || progress > 0) && (
          <div className="space-y-1">
            <Progress value={progress} className="h-1" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{isPlaying ? "Playing..." : isPaused ? "Paused" : "Ready"}</span>
              <span>{Math.round(progress)}%</span>
            </div>
          </div>
        )}

        {/* Text Preview */}
        <div className="text-xs text-muted-foreground bg-muted/30 p-2 rounded max-h-16 overflow-y-auto">
          {text.length > 100 ? `${text.substring(0, 100)}...` : text}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center">
          {!isPlaying && !isPaused ? (
            <Button size="sm" onClick={handlePlay} className="h-8 gap-2">
              <Play className="h-3 w-3" />
              Play
            </Button>
          ) : isPaused ? (
            <Button size="sm" onClick={handlePlay} className="h-8 gap-2">
              <Play className="h-3 w-3" />
              Resume
            </Button>
          ) : (
            <Button size="sm" variant="outline" onClick={handlePause} className="h-8 gap-2 bg-transparent">
              <Pause className="h-3 w-3" />
              Pause
            </Button>
          )}
        </div>
      </div>
    </Card>
  )
}
