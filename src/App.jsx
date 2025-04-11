
import React, { useRef, useState } from 'react'
import Player from './components/Player'
import Visualizer from './components/Visualizer'
import './App.css'

const tracks = [
  { title: 'Cold Streets', file: '/music/Cold Streets.mp3', cover: '/covers/cold_streets.png' },
  { title: 'Contigo Todo Cambió', file: '/music/Contigo Todo Cambió.mp3', cover: '/covers/contigo_todo_cambió.png' },
  { title: 'Larmes et biff', file: '/music/larmes et biff.mp3', cover: '/covers/larmes_et_biff.png' },
  { title: 'Sur le bitume', file: '/music/Sur le bitume.mp3', cover: '/covers/Sur_le_bitume.png' },
  { title: 'Tout ce que on voit pas', file: '/music/Tout ce que on voit pas.mp3', cover: '/covers/pas.png' },
  { title: 'Modo Fantasma', file: '/music/Modo Fantasma.mp3', cover: '/covers/modo_fantasma.png' },
  { title: 'No Me Llama', file: '/music/No Me Llama.mp3', cover: '/covers/no_me_llama.png' },
  { title: 'Noche de Locura', file: '/music/Noche de Locura.mp3', cover: '/covers/noche_de_locura.png' },
  { title: 'noches Contigo', file: '/music/noches Contigo.mp3', cover: '/covers/noches_contigo.png' },
  { title: 'toi et moi', file: '/music/toi et moi.mp3', cover: '/covers/toi_et_moi.png' },
  { title: 'Tú no’ ta', file: '/music/Tú no’ ta.mp3', cover: '/covers/tú_no_ta.png' },
  { title: 'Tamo Loco Loco', file: '/music/Tamo Loco Loco.mp3', cover: '/covers/Tamo_Loco_Loco.png' },
  { title: 'Pégate Mami', file: '/music/Pégate Mami.mp3', cover: '/covers/Pégate_Mami.png' },
  { title: 'Tú y Yo No Éramos Eso', file: '/music/Tú y Yo No Éramos Eso.mp3', cover: '/covers/tú_y_yo_no_éramos_eso.png' }
]

export default function App() {
  const [currentTrack, setCurrentTrack] = useState(tracks[0])
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const audioRef = useRef(new Audio(currentTrack.file))

  return (
    <div className={`app-container ${isPlaying && !isFullScreen ? 'animated-bg' : ''}`}>
      <Visualizer audioRef={audioRef} isPlaying={isPlaying} />
      <main style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>🎶 Danny I Ai Generated 🎶</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '20px' }}>
          {tracks.map((track, index) => (
            <div
              key={index}
              onClick={() => {
                setCurrentTrack(track)
                setIsFullScreen(true)
                setIsPlaying(true)
              }}
              style={{
                backgroundColor: '#1e1e1e',
                padding: '15px',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: '0.3s'
              }}
            >
              <img src={track.cover} alt='cover' style={{ width: '100%', height: '240px', objectFit: 'cover', borderRadius: '4px', marginBottom: '10px' }} />
              <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>{track.title}</div>
            </div>
          ))}
        </div>
      </main>
      <Player
        currentTrack={currentTrack}
        setCurrentTrack={setCurrentTrack}
        tracks={tracks}
        isFullScreen={isFullScreen}
        setIsFullScreen={setIsFullScreen}
        setIsPlaying={setIsPlaying}
        audioRef={audioRef}
      />
    </div>
  )
}
