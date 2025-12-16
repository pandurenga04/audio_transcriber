"use client"

import { useEffect, useRef, useState } from "react"

interface AudioVisualizerProps {
  isListening: boolean
  className?: string
}

export function AudioVisualizer({ isListening, className = "" }: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null)
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null)

  useEffect(() => {
    if (isListening && !audioContext) {
      initializeAudio()
    } else if (!isListening && audioContext) {
      cleanup()
    }

    return () => cleanup()
  }, [isListening])

  const initializeAudio = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const context = new AudioContext()
      const analyserNode = context.createAnalyser()
      const source = context.createMediaStreamSource(stream)

      analyserNode.fftSize = 256
      source.connect(analyserNode)

      setAudioContext(context)
      setAnalyser(analyserNode)

      startVisualization(analyserNode)
    } catch (error) {
      console.error("Error accessing microphone:", error)
    }
  }

  const startVisualization = (analyserNode: AnalyserNode) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const bufferLength = analyserNode.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    const draw = () => {
      if (!isListening) return

      analyserNode.getByteFrequencyData(dataArray)

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const barWidth = (canvas.width / bufferLength) * 2.5
      let x = 0

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * canvas.height * 0.8

        const gradient = ctx.createLinearGradient(0, canvas.height, 0, canvas.height - barHeight)
        gradient.addColorStop(0, "#10b981")
        gradient.addColorStop(1, "#059669")

        ctx.fillStyle = gradient
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight)

        x += barWidth + 1
      }

      animationRef.current = requestAnimationFrame(draw)
    }

    draw()
  }

  const cleanup = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
    if (audioContext) {
      audioContext.close()
      setAudioContext(null)
    }
    setAnalyser(null)
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <canvas
        ref={canvasRef}
        width={200}
        height={60}
        className={`rounded-md transition-opacity duration-300 ${isListening ? "opacity-100" : "opacity-30"}`}
        style={{ background: "transparent" }}
      />
    </div>
  )
}
