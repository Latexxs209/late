
import React, { useEffect, useRef } from 'react'

export default function Visualizer({ audioRef, isPlaying }) {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const audioCtxRef = useRef(null)
  const analyserRef = useRef(null)
  const sourceRef = useRef(null)
  const dataArrayRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const setupVisualizer = async () => {
      if (!audioRef.current) return

      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)()
      }

      try {
        await audioCtxRef.current.resume()
      } catch (e) {
        console.warn('AudioContext resume failed:', e)
      }

      if (!sourceRef.current) {
        sourceRef.current = audioCtxRef.current.createMediaElementSource(audioRef.current)
        analyserRef.current = audioCtxRef.current.createAnalyser()
        sourceRef.current.connect(analyserRef.current)
        analyserRef.current.connect(audioCtxRef.current.destination)
        analyserRef.current.fftSize = 256

        const bufferLength = analyserRef.current.frequencyBinCount
        dataArrayRef.current = new Uint8Array(bufferLength)
      }

      const draw = () => {
        animationRef.current = requestAnimationFrame(draw)
        analyserRef.current.getByteFrequencyData(dataArrayRef.current)

        ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        const barWidth = canvas.width / dataArrayRef.current.length
        let x = 0

        for (let i = 0; i < dataArrayRef.current.length; i++) {
          const barHeight = dataArrayRef.current[i] * 1.2
          ctx.fillStyle = 'rgba(29, 185, 84, 0.7)'
          ctx.fillRect(x, canvas.height - barHeight, barWidth - 2, barHeight)
          x += barWidth
        }
      }

      draw()
    }

    if (isPlaying) {
      setupVisualizer()
    } else {
      cancelAnimationFrame(animationRef.current)
    }

    return () => {
      cancelAnimationFrame(animationRef.current)
    }
  }, [audioRef, isPlaying])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        opacity: isPlaying ? 0.7 : 0,
        transition: 'opacity 0.5s ease'
      }}
    />
  )
}
