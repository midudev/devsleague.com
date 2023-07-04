import Image from 'next/image'
import { Montserrat } from 'next/font/google'
import Link from 'next/link'
import { Logo } from '@/components/Logo'
import { IconEyeOff, IconSwords } from '@tabler/icons-react'
import { IconBrain } from '@tabler/icons-react'
import { IconBug } from '@tabler/icons-react'
import { IconRocket } from '@tabler/icons-react'
import Marquee from 'react-fast-marquee'
import { IconDeviceIpadHorizontalQuestion } from '@tabler/icons-react'
import { TwitchIcon } from '@/components/TwitchIcon'
import MouseEffect from '@/components/Mouse'
import { Card } from '@/components/Card'

const montserrat = Montserrat({ weight: ['500', '700'], subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <div className="absolute inset-0 bg-[url(/img/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <MouseEffect />
      <div className={`${montserrat.className} min-h-screen`}>
        <main className="flex flex-col items-center justify-center min-full-screen">
          <div className="grid min-h-screen grid-cols-2 pt-8">
            <div className="flex flex-col justify-between h-full max-w-md col-span-1">
              <header className="relative">
                <Logo />
                <div className="absolute top-0 blur-2xl animate-pulse">
                  <Logo />
                </div>

                <div className="mt-12">
                  <h1 className="text-xl font-medium [text-wrap:balance] m-auto tracking-tight leading-tight text-center text-white max-w-xs">
                    ¡Batallas de
                    <span className=""> creadores de contenido </span>
                    de programación!
                  </h1>
                </div>
              </header>

              <div className="flex flex-col items-center justify-center flex-1 text-center">
                <h3 className="text-3xl font-bold text-[#ffff06]">25 Julio 2023</h3>
                <div className="flex justify-center mt-2">
                  <h4 className="flex items-center gap-x-2">
                    <a
                      className="flex items-center text-lg text-purple-400 transition gap-x-2 hover:scale-110 hover:underline"
                      href="https://twitch.tv/midudev"
                      target="_blank"
                    >
                      <TwitchIcon className="w-8" />
                      twitch.tv/midudev
                    </a>
                  </h4>
                </div>
              </div>

              <footer className="flex flex-col w-full max-w-xs px-12 pb-32 m-auto mt-12 md:px-4 justify-evenly gap-y-4">
                <a
                  className="flex items-center justify-center px-4 py-2 text-sm text-white transition font-sm gap-x-1 hover:scale-110 hover:underline"
                  href="mailto:miduga@gmail.com"
                  target="_blank"
                  rel="noopener"
                >
                  <IconRocket className="w-6 h-6" />
                  Patrocinar como empresa
                </a>
              </footer>
            </div>

            <div className="col-span-1">
              <article className="p-4 border rounded-lg bg-white/10 bg-gradient-to-br from-indigo-950 to-red-950">
                A ver
              </article>
            </div>
          </div>
        </main>

        <footer className="fixed flex items-center justify-center w-screen uppercase bottom-2">
          <Marquee gradientWidth={'300px'} gradientColor={[0, 0, 0]} speed={50}>
            <h4 className="flex items-center justify-center mt-8 opacity-80 md:flex-row gap-x-4 shadow-black">
              <span className="flex items-center text-purple-300 gap-x-1">
                <IconDeviceIpadHorizontalQuestion /> Trivia
              </span>
              <span className="flex items-center text-red-300 gap-x-1">
                <IconSwords /> CSS Battle
              </span>
              <span className="flex items-center text-sky-300 gap-x-1">
                <IconEyeOff /> Programa a ciegas
              </span>
              <span className="flex items-center text-pink-300 gap-x-1">
                <IconBrain /> Lógica de programación
              </span>
              <span className="flex items-center text-orange-300 gap-x-1">
                <IconBug /> Encuentra el bug
              </span>
              <span className="flex items-center text-purple-300 gap-x-1">
                <IconDeviceIpadHorizontalQuestion /> Trivia
              </span>
              <span className="flex items-center text-red-300 gap-x-1">
                <IconSwords /> CSS Battle
              </span>
              <span className="flex items-center text-sky-300 gap-x-1">
                <IconEyeOff /> Programa a ciegas
              </span>
              <span className="flex items-center text-pink-300 gap-x-1">
                <IconBrain /> Lógica de programación
              </span>
              <span className="flex items-center text-orange-300 gap-x-1">
                <IconBug /> Encuentra el bug
              </span>
              <span className="flex items-center text-purple-300 gap-x-1">
                <IconDeviceIpadHorizontalQuestion /> Trivia
              </span>
              <span className="flex items-center text-red-300 gap-x-1">
                <IconSwords /> CSS Battle
              </span>
              <span className="flex items-center text-sky-300 gap-x-1">
                <IconEyeOff /> Programa a ciegas
              </span>
              <span className="flex items-center text-pink-300 gap-x-1">
                <IconBrain /> Lógica de programación
              </span>
              <span className="flex items-center text-orange-300 gap-x-1">
                <IconBug /> Encuentra el bug
              </span>
              <span className="flex items-center text-purple-300 gap-x-1">
                <IconDeviceIpadHorizontalQuestion /> Trivia
              </span>
              <span className="flex items-center text-red-300 gap-x-1">
                <IconSwords /> CSS Battle
              </span>
              <span className="flex items-center text-sky-300 gap-x-1">
                <IconEyeOff /> Programa a ciegas
              </span>
              <span className="flex items-center text-pink-300 gap-x-1">
                <IconBrain /> Lógica de programación
              </span>
              <span className="flex items-center pr-3 text-orange-300 gap-x-1">
                <IconBug /> Encuentra el bug
              </span>
            </h4>
          </Marquee>
        </footer>
      </div>
    </>
  )
}
