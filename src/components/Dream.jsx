import { Text, useCursor } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import { useRef, useState } from 'react'
import * as THREE from 'three'
import getUuid from 'uuid-by-string'
import { AudioImage } from './AudioImage'

const GOLDENRATIO = 1.61803398875

export function Dream({ url, c = new THREE.Color(), isActive, isStill, audioUrl, onClick, ...props }) {
  const frameRef = useRef()
  const contentRef = useRef()
  const [hovered, hover] = useState(false)
  const name = getUuid(url)
  useCursor(hovered)

  const handlePointerOver = (e) => {
    e.stopPropagation()
    hover(true)
  }

  const handlePointerOut = () => hover(false)

  const handleClick = (e) => {
    e.stopPropagation()
    onClick(name)
  }

  useFrame((state, dt) => {
    if (contentRef.current) {
      easing.damp3(contentRef.current.scale, [0.9, 0.93, 1], 0.1, dt)
    }
  })

  return (
    <group {...props} ref={frameRef}>
      <mesh
        name={name}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
        scale={[1, GOLDENRATIO, 0.05]}
        position={[0, GOLDENRATIO / 2, 0]}
      >
        <boxGeometry />
        <meshStandardMaterial
          color={hovered ? 'aqua' : '#151515'}
          metalness={0.5}
          roughness={0.5}
          envMapIntensity={2}
        />
        <AudioImage
          ref={contentRef}
          url={url}
          audioUrl={audioUrl}
          isActive={isActive}
          position={[0, 0, 0.7]}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          onClick={handleClick}
        />
      </mesh>
      <Text fontSize={0.028} maxWidth={0.3} anchorX='left' anchorY='top' position={[0.55, GOLDENRATIO, 0]}>
        {props.name}
      </Text>
      <Text fontSize={0.028} maxWidth={0.3} anchorX='left' anchorY='top' position={[0.55, GOLDENRATIO - 0.05, 0]}>
        {props.type}
      </Text>
    </group>
  )
}
