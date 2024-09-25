'use client'

import { forwardRef, useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

export const VideoBox = forwardRef(function VideoBox(
  { url, isActive, onPointerOver, onPointerOut, onClick, ...props },
  ref,
) {
  const localRef = useRef()
  const [video, setVideo] = useState(null)
  const [texture, setTexture] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const vid = document.createElement('video')
    vid.crossOrigin = 'anonymous'
    vid.loop = true
    vid.muted = false // Unmute the video
    vid.playsInline = true // Needed for autoplay on some mobile devices

    vid.onloadedmetadata = () => {
      console.log('Video metadata loaded successfully')
      setVideo(vid)
      setTexture(new THREE.VideoTexture(vid))
    }

    vid.onerror = (e) => {
      console.error('Error loading video:', e)
      setError('Failed to load video')
    }

    vid.src = url
    vid.load()

    return () => {
      vid.pause()
      vid.src = ''
      vid.load()
    }
  }, [url])

  useEffect(() => {
    if (!video) return

    if (isActive) {
      video.play().catch((e) => console.error('Error playing video:', e))
    } else {
      video.pause()
    }
  }, [isActive, video])

  useFrame(() => {
    if (video && video.readyState === video.HAVE_ENOUGH_DATA) {
      texture.needsUpdate = true
    }
  })

  if (error) {
    console.error(error)
    return null // or render some fallback UI
  }

  if (!video || !texture) {
    return null // or render a loading state
  }

  return (
    <mesh
      ref={ref || localRef}
      {...props}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    >
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  )
})
