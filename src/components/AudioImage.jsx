import { forwardRef, useRef, useEffect } from 'react'
import { Image, useTexture } from '@react-three/drei'

export const AudioImage = forwardRef(function AudioImage({ url, audioUrl, isActive, ...props }, ref) {
  const audioRef = useRef(new Audio(audioUrl))
  const texture = useTexture(url)

  useEffect(() => {
    const audio = audioRef.current
    audio.loop = true

    if (isActive) {
      audio
        .play()
        .then(() => {
          console.log('Audio started playing')
        })
        .catch((e) => console.error('Error playing audio:', e))
    } else {
      audio.pause()
    }

    return () => {
      audio.pause()
      audio.currentTime = 0
    }
  }, [isActive, audioUrl])

  return <Image scale={[0.55, 0.9, 1]} alt={props.name} ref={ref} raycast={() => null} texture={texture} {...props} />
})
