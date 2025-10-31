import React, { useEffect, useState } from 'react'

export default function App() {
  const [tools, setTools] = useState([])

  // 👇 Add this line
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000"

  useEffect(() => {
    // 👇 Update the fetch line
    fetch(`${API_URL}/api/tools`)
      .then(res => res.json())
      .then(setTools)
      .catch(() => setTools([]))
  }, [])

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', padding: 24 }}>
      <h1>Useful Tools Dashboard</h1>
      <p>A tiny list of quick utilities (demo app).</p>
      <div style={{ display: 'grid', gap: 12 }}>
        {tools.length === 0 && <div>No tools loaded — backend might be down.</div>}
        {tools.map(t => (
          <div key={t.id} style={{ padding: 12, border: '1px solid #eee', borderRadius: 8 }}>
            <strong>{t.name}</strong>
            <div style={{ fontSize: 13, color: '#555' }}>{t.desc}</div>
            <div style={{ marginTop: 8 }}>
              <a href={t.link} target="_blank">Open</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}