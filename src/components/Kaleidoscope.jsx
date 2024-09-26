import React, { useRef, useMemo, forwardRef, useEffect } from 'react'
import { useFrame, extend } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'
import * as THREE from 'three'
import vertexShader from '@/helpers/shaders/kaleidoscope.vert'
import fragmentShader from '@/helpers/shaders/kaleidoscope.frag'

const KaleidoscopeMaterial = shaderMaterial(
  {
    uTime: 0,
    uTexture: null,
    uSegments: 8,
    uCameraPosition: new THREE.Vector3(),
    uRotation: new THREE.Vector3(),
  },
  vertexShader,
  fragmentShader,
)

// Extend the KaleidoscopeMaterial to make it available in the THREE namespace
extend({ KaleidoscopeMaterial })

export const Kaleidoscope = forwardRef(function Kaleidoscope({ url, audioUrl, isActive, ...props }, ref) {
  const materialRef = useRef()
  const texture = useMemo(() => new THREE.TextureLoader().load(url), [url])
  const cameraPosition = useRef(new THREE.Vector3(0, 0, 5))
  const rotation = useRef(new THREE.Vector3(0, 0, 0))
  const audioRef = useRef(new Audio(audioUrl)) // Initialize audioRef

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.elapsedTime

      // Update camera position with z-axis motion
      const time = state.clock.elapsedTime
      cameraPosition.current.set(Math.sin(time * 0.5) * 2, Math.cos(time * 0.3) * 2, 5 + Math.sin(time * 0.2) * 3)
      materialRef.current.uCameraPosition = cameraPosition.current

      // Update rotation
      rotation.current.x = (Math.sin(time * 0.5) * Math.PI) / 4 // Rotate on x-axis
      rotation.current.y = time * 0.5 // Continuous rotation on y-axis
      rotation.current.z = (Math.sin(time * 0.3) * Math.PI) / 6 // Rotate on z-axis
      materialRef.current.uRotation = rotation.current
    }
  })

  useEffect(() => {
    const audio = audioRef.current
    audio.loop = true

    if (isActive) {
      audio.play().catch((e) => console.error('Error playing audio:', e))
    } else {
      audio.pause()
    }

    return () => {
      audio.pause()
      audio.currentTime = 0
    }
  }, [isActive, audioUrl])

  return (
    <mesh {...props} raycast={() => null} ref={ref}>
      <planeGeometry args={[1, 1]} />
      <kaleidoscopeMaterial ref={materialRef} uTexture={texture} uSegments={8} />
    </mesh>
  )
})
