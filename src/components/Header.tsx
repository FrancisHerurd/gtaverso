import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/images/logo.svg" alt="GTAVerso" width={36} height={36} />
          <span className="font-bold text-xl">GTAVerso</span>
        </Link>
      </div>
    </header>
  )
}