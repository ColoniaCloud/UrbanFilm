import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import MotionProvider from '@/components/MotionProvider'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <MotionProvider>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </MotionProvider>
  )
}
