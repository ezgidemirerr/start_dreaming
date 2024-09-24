import * as THREE from 'three'
import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useRoute, useLocation } from 'wouter'
import { easing } from 'maath'
import getUuid from 'uuid-by-string'
import { Dream } from './Dream'

const GOLDENRATIO = 1.61803398875

export function Dreams({ images, q = new THREE.Quaternion(), p = new THREE.Vector3() }) {
  const ref = useRef()
  const clicked = useRef()
  const [, params] = useRoute('/item/:id')
  const [, setLocation] = useLocation()

  useEffect(() => {
    clicked.current = ref.current.getObjectByName(params?.id)
    if (clicked.current) {
      clicked.current.parent.updateWorldMatrix(true, true)
      clicked.current.parent.localToWorld(p.set(0, GOLDENRATIO / 2, 1.25))
      clicked.current.parent.getWorldQuaternion(q)
    } else {
      p.set(0, 0, 5.5)
      q.identity()
    }
  })

  useFrame((state, dt) => {
    easing.damp3(state.camera.position, p, 0.4, dt)
    easing.dampQ(state.camera.quaternion, q, 0.4, dt)
  })

  const handleFrameClick = (frameName) => {
    setLocation(frameName ? `/item/${frameName}` : '/')
  }

  return (
    <group ref={ref} onPointerMissed={() => setLocation('/')}>
      {images.map((props) => {
        const isActive = params?.id === getUuid(props.url)
        return <Dream key={props.url} {...props} isActive={isActive} onClick={handleFrameClick} />
      })}
    </group>
  )
}
