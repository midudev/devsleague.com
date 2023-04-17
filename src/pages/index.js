import Image from 'next/image'
import { Montserrat } from 'next/font/google'
import Link from 'next/link'
import { Logo } from '@/components/Logo'
import { IconEyeOff, IconSwords } from '@tabler/icons-react'
import { IconBrain } from '@tabler/icons-react'
import { IconBug } from '@tabler/icons-react'
import { IconBrandTwitch } from '@tabler/icons-react'
import { IconRocket } from '@tabler/icons-react'

const montserrat = Montserrat({ weight: ['500', '700'], subsets: ['latin'] })

export default function Home() {
  return (
    <div
      className={montserrat.className}
      style={{
        minHeight: '100vh',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '50%',
        backgroundPosition: 'center',
        backgroundImage: "url('./bkg.jpg')",
      }}
    >
      <main className="flex flex-col items-center justify-center col-span-1 text-white md:min-h-screen">
        <div className="relative">
          <Logo />
          <div className="absolute top-0 blur-2xl animate-pulse">
            <Logo />
          </div>
        </div>
        <div className="mt-12">
          <h1 className="text-4xl font-bold leading-tight text-center md:leading-relaxed">
            Competición de programadores{' '}
            <span className="block text-xl font-normal text-yellow-200 md:text-3xl">
              con pruebas, clasificación y premios
            </span>
          </h1>
          <h4 className="flex flex-col items-center justify-center gap-3 mt-8 text-sm shadow-xl md:flex-row shadow-black">
            <span className="flex items-center text-red-500 gap-x-1">
              <IconSwords /> CSS Battle
            </span>
            <span className="flex items-center text-sky-400 gap-x-1">
              <IconEyeOff /> Programa a ciegas
            </span>
            <span className="flex items-center text-pink-400 gap-x-1">
              <IconBrain /> Lógica de programación
            </span>
            <span className="flex items-center text-orange-400 gap-x-1">
              <IconBug /> Encuentra el bug
            </span>
          </h4>
        </div>

        <div className="flex items-center pt-12 gap-x-4">
          <h3 className="text-3xl font-bold">Junio 2023</h3>
          <svg className="w-20 h-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2400 2800">
            <path d="m2200 1300-400 400h-400l-350 350v-350H600V200h1600z" style={{ fill: '#fff' }} />
            <path
              d="M500 0 0 500v1800h600v500l500-500h400l900-900V0H500zm1700 1300-400 400h-400l-350 350v-350H600V200h1600v1100z"
              fill="#6441a5"
            />
            <path d="M1700 550h200v600h-200zM1150 550h200v600h-200z" fill="#6441a5" />
          </svg>
        </div>

        <footer className="flex flex-col w-full max-w-2xl px-12 pb-32 mt-12 md:px-4 md:flex-row justify-evenly gap-y-4">
          <a
            className="flex items-center justify-center px-4 py-2 text-white bg-[#6441a5] hover:contrast-150 transition hover:scale-110 rounded-sm font-sm gap-x-2"
            href="https://twitch.tv/midudev"
            target="_blank"
            rel="noopener"
          >
            <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2400 2800">
              <path d="m2200 1300-400 400h-400l-350 350v-350H600V200h1600z" style={{ fill: '#fff' }} />
              <path
                d="M500 0 0 500v1800h600v500l500-500h400l900-900V0H500zm1700 1300-400 400h-400l-350 350v-350H600V200h1600v1100z"
                fill="black"
              />
              <path d="M1700 550h200v600h-200zM1150 550h200v600h-200z" fill="black" />
            </svg>
            Ir al canal de Twitch
          </a>

          <a
            className="flex items-center justify-center px-4 py-2 text-black transition bg-yellow-300 rounded-sm font-sm gap-x-1 hover:contrast-150 hover:scale-110"
            href="https://twitch.tv/midudev"
            target="_blank"
            rel="noopener"
          >
            <IconRocket className="w-8 h-8" />
            Soy empresa y quiero patrocinar
          </a>
        </footer>
      </main>
    </div>
  )
}
