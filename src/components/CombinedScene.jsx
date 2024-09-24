import { Canvas, useFrame } from '@react-three/fiber'
import { MeshReflectorMaterial, Environment, Cloud, Clouds } from '@react-three/drei'
import { Dreams } from './Dreams'
import * as THREE from 'three'
import { useRef } from 'react'

const SceneContent = ({ images, currentScene }) => {
  const cloudRef = useRef()
  const framesRef = useRef()

  useFrame((state, delta) => {
    if (currentScene === 'clouds') {
      cloudRef.current.position.z = THREE.MathUtils.lerp(cloudRef.current.position.z, 3, 0.05)
      cloudRef.current.position.y = THREE.MathUtils.lerp(cloudRef.current.position.y, 0, 0.05)
      cloudRef.current.rotation.y += delta * 0.2
      cloudRef.current.rotation.z += delta * 0.2
      framesRef.current.position.y = -100
    } else {
      cloudRef.current.position.z = THREE.MathUtils.lerp(cloudRef.current.position.z, 5, 0.01)
      cloudRef.current.position.y = THREE.MathUtils.lerp(cloudRef.current.position.y, 5, 0.01)
      cloudRef.current.rotation.y = THREE.MathUtils.lerp(cloudRef.current.rotation.y, 0, 0.01)
      cloudRef.current.rotation.z = THREE.MathUtils.lerp(cloudRef.current.rotation.z, 0, 0.01)
      framesRef.current.position.y = THREE.MathUtils.lerp(framesRef.current.position.y, -0.5, 0.05)
    }
  })

  return (
    <>
      <color attach='background' args={['#191920']} />
      <fog attach='fog' args={['#191920', 0, 15]} />

      <group ref={framesRef} position={[0, -0.5, 0.5]}>
        <Dreams images={images} />
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[50, 50]} />
          <MeshReflectorMaterial
            blur={[300, 100]}
            resolution={2048}
            mixBlur={1}
            mixStrength={80}
            roughness={1}
            depthScale={1.2}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            color='#050505'
            metalness={0.5}
          />
        </mesh>
      </group>
      <Clouds material={THREE.MeshBasicMaterial}>
        <Cloud ref={cloudRef} position={[0, 0, 0]} seed={10} color='aqua' opacity={0.8} transparent />
      </Clouds>

      <Environment preset='city' />
    </>
  )
}

const CombinedScene = ({ images, currentScene }) => {
  return (
    <Canvas dpr={[1, 1.5]}>
      <SceneContent images={images} currentScene={currentScene} />
    </Canvas>
  )
}

export default CombinedScene
