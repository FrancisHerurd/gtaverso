import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="space-y-3">
      <h1 className="text-3xl font-bold">404 - No encontrado</h1>
      <p className="text-gray-600">Ese post o página no existe.</p>
      <Link href="/" className="font-semibold text-primary">Volver al inicio</Link>
    </div>
  )
}