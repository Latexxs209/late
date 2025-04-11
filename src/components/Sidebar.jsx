
import React from 'react'

export default function Sidebar() {
  return (
    <aside style={{ width: '220px', backgroundColor: '#000000', padding: '20px' }}>
      <img src='/cover.png' alt='logo' style={{ width: '100%', marginBottom: '20px', borderRadius: '8px' }} />
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <a href='#' style={{ color: 'white', textDecoration: 'none' }}>🏠 Accueil</a>
        <a href='#' style={{ color: 'white', textDecoration: 'none' }}>📁 Playlist</a>
      </nav>
    </aside>
  )
}
