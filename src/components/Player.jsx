
import React, { useEffect, useRef, useState } from 'react'
import './Player.css'

export default function Player({ currentTrack, setCurrentTrack, tracks, isFullScreen, setIsFullScreen, setIsPlaying, audioRef }) {
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const previousTrackRef = useRef(currentTrack.file)

  const currentIndex = tracks.findIndex(t => t.title === currentTrack.title)

  useEffect(() => {
    const audio = audioRef.current

    const updateProgress = () => {
      setProgress(audio.currentTime)
      setDuration(audio.duration || 0)
    }

    const handleEnded = () => {
      const nextIndex = (currentIndex + 1) % tracks.length
      setCurrentTrack(tracks[nextIndex])
    }

    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('timeupdate', updateProgress)
    audio.addEventListener('play', () => setIsPlaying(true))
    audio.addEventListener('pause', () => setIsPlaying(false))

    return () => {
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('timeupdate', updateProgress)
    }
  }, [currentTrack, currentIndex, setCurrentTrack, setIsPlaying, tracks, audioRef])

  useEffect(() => {
    const audio = audioRef.current
    if (previousTrackRef.current !== currentTrack.file) {
      audio.pause()
      if (audio.src !== currentTrack.file) {
        audio.src = currentTrack.file
        audio.load()
        audio.play().catch((e) => console.warn('Playback error:', e))
        previousTrackRef.current = currentTrack.file
      }
    }
  }, [currentTrack, audioRef])

  const handleSeek = (e) => {
    const newTime = (e.nativeEvent.offsetX / e.target.clientWidth) * duration
    audioRef.current.currentTime = newTime
  }

  const skipPrevious = () => {
    const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length
    setCurrentTrack(tracks[prevIndex])
  }

  const skipNext = () => {
    const nextIndex = (currentIndex + 1) % tracks.length
    setCurrentTrack(tracks[nextIndex])
  }

  const btnStyle = {
    backgroundColor: '#1db954',
    color: '#fff',
    border: 'none',
    fontSize: '1.5rem',
    padding: '10px 20px',
    borderRadius: '50%',
    cursor: 'pointer'
  }

  const FullscreenView = () => (
    <div className="fullscreen-player">
      <img
        src={currentTrack.cover}
        alt='cover'
        className={`cover ${audioRef.current.paused ? '' : 'cover-animated'}`}
      />
      <h2 className="track-title">{currentTrack.title}</h2>
      <p className="artist-name">Danny Beat</p>
      <div className="controls">
        <button onClick={skipPrevious} style={btnStyle}>⏮</button>
        <button onClick={() => audioRef.current.paused ? audioRef.current.play() : audioRef.current.pause()} style={btnStyle}>
          {audioRef.current.paused ? '▶️' : '⏸'}
        </button>
        <button onClick={skipNext} style={btnStyle}>⏭</button>
      </div>
      <div className="progress-bar" onClick={handleSeek}>
        <div className="progress" style={{ width: duration ? `${(progress / duration) * 100}%` : '0%' }} />
      </div>
      <button className="back-btn" onClick={() => setIsFullScreen(false)}>↩ Retour</button>
      <div className="equalizer">
        <div></div><div></div><div></div><div></div><div></div>
      </div>
    </div>
  )

  const MiniPlayer = () => (
    <div className="mini-player">
      <div className="mini-info">
        <img src={currentTrack.cover} alt="cover" className="mini-cover" />
        <div>
          <div className="mini-title">{currentTrack.title}</div>
          <div className="mini-artist">Danny Beat</div>
        </div>
      </div>
      <button className="fullscreen-btn" onClick={() => setIsFullScreen(true)}>
        🎬 Lecture immersive
      </button>
    </div>
  )

  return isFullScreen ? <FullscreenView /> : <MiniPlayer />
}
