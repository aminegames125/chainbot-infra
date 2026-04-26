// FILE: app/(landing)/layout.tsx
import '../globals.css'
import AuroraBackground from '@/components/layout/AuroraBackground'
import Header from '@/components/layout/Header'
import CustomScrollbar from '@/components/ui/CustomScrollbar'
import SmoothScroll from '@/components/ui/SmoothScroll'

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <div className="bg-bg text-text font-body min-h-screen">
        <div className="grain" />
        <CustomScrollbar />
        <AuroraBackground />
        <Header />
        <main className="relative z-10">{children}</main>
      </div>
    </SmoothScroll>
  )
}
