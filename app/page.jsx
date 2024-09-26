'use client'

import { useState } from 'react'
import CombinedScene from '@/components/CombinedScene'
import { dream_sources } from '@/resources'

export default function Page() {
  const [currentScene, setCurrentScene] = useState('clouds')
  const [hover, setHover] = useState(false)

  const transitionScene = (newScene) => {
    setCurrentScene(newScene)
  }

  const getStartedButtonStyle = {
    padding: '20px 30px',
    fontSize: '24px',
    backgroundColor: 'transparent',
    color: 'white',
    fontWeight: 'bold',
    border: '2px solid aqua',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '20px', // Add margin for spacing
    transition: 'background-color 0.3s', // Smooth transition
  }

  const hoverStyle = {
    ...getStartedButtonStyle,
    border: '2px solid gold', // Change background color on hover
  }

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1000 }}>
        {currentScene === 'clouds' && (
          <div style={{ textAlign: 'center' }}>
            <style>
              {`
                @keyframes lights {
                  0% {
                    color: white;
                    text-shadow:
                      0 0 1em hsla(320, 100%, 50%, 0.2),
                      0 0 0.125em hsla(320, 100%, 60%, 0.3),
                      -1em -0.125em 0.5em hsla(40, 100%, 60%, 0),
                      1em 0.125em 0.5em hsla(200, 100%, 60%, 0);
                  }
                  
                  30% { 
                    color: white;
                    text-shadow:
                      0 0 1em hsla(320, 100%, 50%, 0.5),
                      0 0 0.125em hsla(320, 100%, 60%, 0.5),
                      -0.5em -0.125em 0.25em hsla(40, 100%, 60%, 0.2),
                      0.5em 0.125em 0.25em hsla(200, 100%, 60%, 0.4);
                  }
                  40% { 
                    color: white;
                    text-shadow:
                      0 0 1em hsla(320, 100%, 50%, 0.5),
                      0 0 0.125em hsla(320, 100%, 90%, 0.5),
                      -0.25em -0.125em 0.125em hsla(40, 100%, 60%, 0.2),
                      0.25em 0.125em 0.125em hsla(200, 100%, 60%, 0.4);
                  }
                  
                  70% {
                    color: white;
                    text-shadow:
                      0 0 1em hsla(320, 100%, 50%, 0.5),
                      0 0 0.125em hsla(320, 100%, 60%, 0.5),
                      0.5em -0.125em 0.25em hsla(40, 100%, 60%, 0.2),
                      -0.5em 0.125em 0.25em hsla(200, 100%, 60%, 0.4);
                  }
                  
                  100% {
                    color: white;
                    text-shadow:
                      0 0 1em hsla(320, 100%, 50%, 0.2),
                      0 0 0.125em hsla(320, 100%, 60%, 0.3),
                      1em -0.125em 0.5em hsla(40, 100%, 60%, 0),
                      -1em 0.125em 0.5em hsla(200, 100%, 60%, 0);
                  }
                }
                .animated-text {
                  animation: lights 5s infinite;
                }
              `}
            </style>
            <h1 className='animated-text' style={{ fontSize: '120px', textWrap: 'nowrap' }}>
              Not everyone can dream
            </h1>
            <button
              onClick={() => transitionScene('frames')}
              style={hover ? hoverStyle : getStartedButtonStyle}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              Start dreaming
            </button>
          </div>
        )}
      </div>
      <CombinedScene images={dream_sources} currentScene={currentScene} />
    </div>
  )
}
