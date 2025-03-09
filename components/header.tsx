import Link from "next/link"
import { Instagram, Heart } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between mx-auto">
        <Link href="/" className="text-2xl font-semibold text-rose-400">
          Relaq
        </Link>
        <div className="flex items-center gap-4">
          <Link href="https://www.instagram.com/relaq88" className="hover:opacity-80" target="_blank" >
            <Instagram className="h-5 w-5" />
          </Link>
          <Link href="/favorites" className="hover:opacity-80">
            <Heart className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </header>
  )
}

