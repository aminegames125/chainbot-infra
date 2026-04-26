'use client'
import { useEffect, useState } from 'react'
import Lottie from 'lottie-react'

interface LottieAnimationProps {
  url: string
  className?: string
}

export default function LottieAnimation({ url, className }: LottieAnimationProps) {
  const [animationData, setAnimationData] = useState<any>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`Lottie Load Failed: ${res.status}`)
        const contentType = res.headers.get('content-type')
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Response is not JSON')
        }
        return res.json()
      })
      .then(data => setAnimationData(data))
      .catch(err => console.error('Lottie Load Error:', err))
  }, [url])

  if (!mounted || !animationData) return <div className={className} />

  return (
    <div className={className}>
      <Lottie animationData={animationData} loop={true} />
    </div>
  )
}
