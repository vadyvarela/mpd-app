import Image from 'next/image'

export default function OfflinePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 text-center">
      <Image src="/mpd1.svg" alt="MpD" width={120} height={120} className="mb-8 opacity-70" />
      <h1 className="text-2xl font-bold text-gray-800 mb-3">Sem ligação à internet</h1>
      <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
        Verifique a sua ligação à internet e tente novamente.
      </p>
    </div>
  )
}
