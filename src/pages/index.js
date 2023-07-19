import { Inter, Inter_Tight } from 'next/font/google'
import { Logo } from '@/components/Logo'
import { IconRocket } from '@tabler/icons-react'

import { TwitchIcon } from '@/components/TwitchIcon'
import MouseEffect from '@/components/Mouse'
import { PruebasMarquee } from '@/components/Pruebas'
import { MagicCard, MagicContainer } from '@/components/magicui/MagicCard'

const inter = Inter({ weight: ['400', '700'], subsets: ['latin'] })
const interTight = Inter_Tight({ weight: ['800'], subsets: ['latin'] })

import Head from 'next/head'
import Ticket from '@/components/Ticket'

const DEVS = [
  {
    name: 'Héctor',
    img: 'hector.png',
  },
  {
    name: 'Goncy',
    img: 'goncy.png',
  },
  {
    name: 'Noe',
    img: 'noe.png',
  },
  {
    name: 'Carmen',
    img: 'carmen.png',
  },
]

export default function Home() {
  return (
    <>
      <MouseEffect />

      <Head>
        <title>devsleague.com - Competición de creadores de contenido de programación</title>
        <meta name="description" content="Donde programadores y creadores de contenido compiten" />
        <meta property="og:image" content="https://devsleague.com/img/og-image.jpg" />
        <meta property="twitter:image" content="https://devsleague.com/img/og-image.jpg" />
        <meta property="og:title" content="devsleague.com - Competición de creadores de contenido de programación" />
        <meta
          property="twitter:title"
          content="devsleague.com - Competición de creadores de contenido de programación"
        />
        <meta property="og:description" content="Donde programadores y creadores de contenido compiten" />
        <meta property="twitter:description" content="Donde programadores y creadores de contenido compiten" />
        <meta property="og:url" content="https://devsleague.com" />
        <meta property="twitter:url" content="https://devsleague.com" />
        <meta property="og:type" content="website" />
        <meta property="twitter:card" content="summary_large_image" />
      </Head>
      <div className={`${inter.className} fixed flex items-center justify-center w-screen uppercase opacity-50 top-2`}>
        <PruebasMarquee />
      </div>

      <main className={`${inter.className} max-w-7xl m-auto pb-20`}>
        <div>
          <div className="block w-full h-full mt-24">
            <section class="flex gap-x-10 justify-center items-center w-full">
              <div className="flex items-center justify-center flex-1">
                <Ticket />
              </div>
              <aside className="flex flex-col items-center justify-center h-full">
                <h2 className="text-white">¡Selecciona tu dev!</h2>
                <div class="grid grid-cols-2 justify-between flex-wrap pb-0 gap-4">
                  {DEVS.map((dev, index) => (
                    <MagicContainer
                      key={index}
                      className={'flex flex-col gap-4 h-[500px] lg:h-[250px] w-full lg:flex-row'}
                    >
                      <MagicCard className="flex flex-col items-center justify-center p-6 overflow-hidden shadow-2xl cursor-pointer bg-background">
                        <button class="col-span-1">
                          <img
                            class="object-cover aspect-square object-top w-40 bg-white"
                            src={`/img/capitanes/${dev.img}`}
                            alt={dev.name}
                          />
                        </button>
                      </MagicCard>
                    </MagicContainer>
                  ))}
                </div>
                <button
                  type="button"
                  class="mt-4 w-full text-center font-semibold text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 rounded-lg text-sm px-5 py-2.5 justify-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 mr-2 mb-2"
                >
                  <svg
                    class="w-4 h-4 mr-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 17"
                  >
                    <path
                      fillRule="evenodd"
                      d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Compartir en Twitter
                </button>
              </aside>
            </section>

            <header className="flex flex-col items-center justify-center m-auto mb-20">
              <div className="mt-32 mb-48">
                <h1 className={`${interTight.className} text-white text-3xl md:text-6xl text-center font-extrabold`}>
                  Donde programadores y <br />
                  <span className="text-transparent bg-gradient-to-r from-midu-secondary to-midu-primary bg-clip-text">
                    creadores de contenido
                  </span>
                  <br />
                  <span className="text-transparent bg-gradient-to-r from-yellow-200 to-yellow-300 bg-clip-text">
                    compiten.
                  </span>
                </h1>
              </div>
            </header>

            <div className="flex flex-col items-center justify-center flex-1 mt-8 text-center">
              <h3 className="text-2xl md:text-5xl font-bold text-[#ffff06]">25 Julio 2023</h3>
              <div className="flex justify-center mt-2">
                <h4 className="flex items-center gap-x-2">
                  <a
                    className="flex items-center text-lg font-semibold text-purple-400 transition md:text-2xl gap-x-2 hover:scale-110 hover:underline"
                    href="https://twitch.tv/midudev"
                    target="_blank"
                  >
                    <TwitchIcon className="w-8" />
                    twitch.tv/midudev
                  </a>
                </h4>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-16 px-8 md:grid-cols-2">
          <article className="relative p-8 overflow-hidden text-center rounded-lg aspect-square [text-wrap:balance]">
            <h2 className={`${interTight.className} text-white text-6xl mb-10`}>
              Pruebas y
              <br />
              competición
            </h2>

            <p className="mb-8 text-xl text-yellow-100 opacity-85">
              Los equipos se enfrentarán en pruebas de programación a ciegas, lógica de programación, preguntas técnicas
              y mucho más.
            </p>

            <div className="absolute bottom-0 left-0 right-0 w-full px-12 m-auto -mb-10">
              <div className="absolute bottom-0 left-0 z-10 w-full h-full bg-gradient-to-b from-transparent from-0% via-black to-black"></div>
              <img className="shadow-lg " alt="Captura de pantalla de CSS Battle" src="/img/css-battle.jpg" />
            </div>

            <div className="absolute bottom-0 left-0 w-full h-full -z-10 bg-gradient-to-b from-transparent via-black/30 to-black"></div>

            <div className="absolute inset-0 -z-20">
              <svg
                className="opacity-60 backdrop-blur-lg"
                width="100%"
                height="100%"
                viewBox="0 0 400 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_17_62)">
                  <g filter="url(#filter0_f_17_62)">
                    <path d="M128.6 0H0V322.2L81 310L128.6 0Z" fill="#4D008A"></path>
                    <path d="M0 322.2V400H240H320L81 310L0 322.2Z" fill="#CD03FF"></path>
                    <path d="M320 400H400V78.75L81 310L320 400Z" fill="#B5BFF1"></path>
                    <path d="M400 0H128.6L81 310L400 78.75V0Z" fill="#611A9A"></path>
                  </g>
                </g>
                <defs>
                  <filter
                    id="filter0_f_17_62"
                    x="-159.933"
                    y="-159.933"
                    width="719.867"
                    height="719.867"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
                    <feGaussianBlur stdDeviation="79.9667" result="effect1_foregroundBlur_17_62"></feGaussianBlur>
                  </filter>
                </defs>
              </svg>
            </div>
          </article>
          <article className="relative p-8 overflow-hidden rounded-lg aspect-square text-center [text-wrap:balance]">
            <h2 className={`${interTight.className} text-white text-6xl mb-10`}>
              4 equipos,
              <br />4 capitanes
            </h2>

            <p className="mb-8 text-xl text-yellow-100 opacity-85">
              4 creadores de contenido serán los capitanes de los equipos y competirán por ser los mejores.
            </p>

            <div className="absolute bottom-0 left-0 right-0 w-full px-12 m-auto -mb-10">
              <div className="absolute bottom-0 left-0 z-10 w-full h-full bg-gradient-to-b from-transparent from-10% via-black to-black"></div>
              <img className="shadow-lg " alt="Captura de pantalla de CSS Battle" src="/img/capitanes.png" />
            </div>

            <div className="absolute bottom-0 left-0 w-full h-full -z-10 bg-gradient-to-b from-transparent via-black/30 to-black"></div>

            <svg
              className="absolute inset-0 w-full opacity-60 backdrop-blur-lg -z-20"
              width="100%"
              height="100%"
              viewBox="0 0 400 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_17_17)">
                <g filter="url(#filter0_f_17_17)">
                  <path d="M128.6 0H0V322.2L51.5 67.5L128.6 0Z" fill="#EB03FF"></path>
                  <path d="M0 322.2V400H240H320L51.5 67.5L0 322.2Z" fill="#FF0F9F"></path>
                  <path d="M320 400H400V78.75L51.5 67.5L320 400Z" fill="#3A0D84"></path>
                  <path d="M400 0H128.6L51.5 67.5L400 78.75V0Z" fill="#FAD8F4"></path>
                </g>
              </g>
              <defs>
                <filter
                  id="filter0_f_17_17"
                  x="-160.333"
                  y="-160.333"
                  width="720.666"
                  height="720.666"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                  <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
                  <feGaussianBlur stdDeviation="80.1666" result="effect1_foregroundBlur_17_17"></feGaussianBlur>
                </filter>
              </defs>
            </svg>
          </article>
        </div>
      </main>
    </>
  )
}
