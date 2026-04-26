// FILE: components/ui/ThreeBackground.tsx
'use client'
import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function Points() {
  const pointsRef = useRef<THREE.Points>(null!)
  
  const particlesCount = 2000
  const positions = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3)
    for (let i = 0; i < particlesCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15
    }
    return pos
  }, [])

  useFrame(() => {
    const time = performance.now() * 0.001
    pointsRef.current.rotation.y = time * 0.05
    pointsRef.current.rotation.x = time * 0.02
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#00C9B1"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  )
}

export default function ThreeBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-40">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <Points />
      </Canvas>
    </div>
  )
}
