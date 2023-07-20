import { Inter, Inter_Tight } from 'next/font/google'

import { TwitchIcon } from '@/components/TwitchIcon'
import MouseEffect from '@/components/Mouse'
import { PruebasMarquee } from '@/components/Pruebas'
import { supabase } from '../lib/supabase'
import { useStore } from '@/store'
import html2canvas from 'html2canvas'

const inter = Inter({ weight: ['400', '700'], subsets: ['latin'] })
const interTight = Inter_Tight({ weight: ['800'], subsets: ['latin'] })

const PREFIX_CDN = 'https://uqfzwvabnygcbokitxqs.supabase.co/storage/v1/object/public/tickets'

import Head from 'next/head'
import Ticket from '@/components/Ticket'
import { SelectFighter } from '@/components/SelectFighter'
import { useState, useEffect } from 'react'
import { DEVS } from '../components/SelectFighter'

async function dataUrlToFile(dataUrl, fileName) {
  const res = await fetch(dataUrl)
  const blob = await res.blob()
  return new File([blob], fileName, { type: 'image/jpg' })
}

const STEPS_LOADING = {
  off: 'Compartir en Twitter',
  generate: 'Generando ticket...',
  uploading: 'Subiendo ticket...',
  share: 'Compartiendo ticket...',
}

export default function Home({ ticketImg, support }) {
  const [loading, setLoading] = useState(STEPS_LOADING.off)
  const [number, setNumber] = useState()
  const { team } = useStore((state) => state)

  const devInfo = DEVS.find((dev) => dev.id === team)

  const title = support
    ? `¡Apoya a ${support.name} en la DevsLeague!`
    : 'DevsLeague - Competición de creadores de contenido de programación'

  const description = support
    ? `Voy con ${support.name} en la DevsLeague! ¿Y tú con quién vas?`
    : 'Donde programadores y creadores de contenido compiten'

  const url = support ? `https://devsleague.com/?team=${support.id}&ticket=${support.ticket}` : 'https://devsleague.com'

  const ogImage = support ? `${PREFIX_CDN}/${ticketImg}` : 'https://devsleague.com/img/og-image.jpg'

  useEffect(() => {
    fetch('/api/number')
      .then((res) => res.json())
      .then((response) => {
        setNumber(response.number)
      })
  })

  const handleClick = async () => {
    if (!team) {
      const intent = 'https://twitter.com/intent/tweet'
      const text = `¡Arranca la DevsLeague!
Competición de creadores de contenido de programación:

⚔️ 4 equipos, 4 capitanes
⌨️ Pruebas de código 
📈 Liga con puntos
🎁 ¡Un montón de premios!
😱 Y muchas sorpresas

No te lo pierdas:
https://devsleague.com/

#devsleague`

      window.open(`${intent}?text=${encodeURIComponent(text)}`)

      return
    }

    setLoading(STEPS_LOADING.generate)

    fetch('/api/number', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((response) => {
        const { number } = response
        setNumber(number)

        setTimeout(async () => {
          setLoading(STEPS_LOADING.uploading)
          const canvasRecord = await html2canvas(document.querySelector('#ticket'), {
            backgroundColor: '#000000',
            windowWidth: 1200,
            windowHeight: 1200,
          })

          const dataURL = canvasRecord.toDataURL('image/jpeg', 0.8)
          const file = await dataUrlToFile(dataURL, 'ticket.jpg')

          // read _az cookie
          const ticketId =
            document.cookie
              .split('; ')
              .find((row) => row.startsWith('_az'))
              ?.split('=')[1] ?? crypto.randomUUID()

          const filename = `ticket-${ticketId}.jpg`

          setLoading(STEPS_LOADING.share)

          let { data, error } = await supabase.storage.from('tickets').upload(filename, file, {
            cacheControl: '3600',
            upsert: false,
          })

          if (error) {
            setLoading(STEPS_LOADING.off)
            console.error(error)

            if (error.statusCode === 409) {
              const force = confirm('¡Ya apoyaste a un equipo! ¿Quieres sobreescribir tu ticket?')

              if (force) {
                const { data: reData, error } = await supabase.storage.from('tickets').upload(filename, file, {
                  cacheControl: '3600',
                  upsert: force,
                })
                data = reData
              }
            }
          }

          if (data) {
            setLoading(STEPS_LOADING.off)

            const intent = 'https://twitter.com/intent/tweet'
            const text = `¡Apoyo a ${devInfo.name} en la DevsLeague!
¿Y tú con quién vas?

⚔️ 4 equipos, 4 capitanes
⌨️ Pruebas de código 
📈 Liga con puntos
🎁 ¡Un montón de premios!
😱 Y muchas sorpresas

No te lo pierdas:
https://devsleague.com/?team=${devInfo.id}&ticket=${ticketId}

#devsleague ${devInfo.hash}`

            window.open(`${intent}?text=${encodeURIComponent(text)}`)
          }
        }, 250)
      })
  }

  return (
    <>
      <MouseEffect />

      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="twitter:image" content={ogImage} />
        <meta property="og:title" content={title} />
        <meta property="twitter:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="twitter:url" content={url} />
        <meta property="og:type" content="website" />
        <meta property="twitter:card" content="summary_large_image" />
      </Head>
      <div className={`${inter.className} fixed flex items-center justify-center w-screen uppercase opacity-50 top-2`}>
        <PruebasMarquee />
      </div>

      <main className={`${inter.className} max-w-5xl m-auto pb-20`}>
        <div>
          <div className="block w-full h-full mt-24">
            <section className="flex flex-col items-center justify-center w-full gap-x-10">
              <div className="flex items-center justify-center flex-0 w-[900px] scale-[0.4] sm:scale-[0.7] md:scale-[.9] xl:scale-100">
                <Ticket number={number} />
              </div>
              <aside className="flex flex-col w-full h-full max-w-3xl mt-4">
                <div className="m-auto text-center">
                  <img className="w-64" src="/img/elige.png" alt="Elige tu equipo" />
                </div>
                <div className="grid items-center justify-center w-full grid-cols-1 gap-4 p-8 pb-0 md:grid-cols-2 lg:grid-cols-4 md:justify-between">
                  <SelectFighter />
                </div>
                <button
                  onClick={handleClick}
                  type="button"
                  className="mt-4 w-full text-center font-semibold text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 rounded-lg text-sm px-5 py-2.5 justify-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 mr-2 mb-2"
                >
                  {loading === STEPS_LOADING.off ? (
                    <svg className="w-4 h-4 mr-2" aria-hidden="true" fill="currentColor" viewBox="0 0 20 17">
                      <path
                        fillRule="evenodd"
                        d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="inline w-4 h-4 mr-3 text-white animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                      />
                    </svg>
                  )}
                  {loading}
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

            <div className="flex flex-col items-center justify-center flex-1 mt-8 mb-10 text-center">
              <h3 className="text-2xl md:text-5xl font-bold text-[#ffff06]">1ª jornada - 25 Julio 2023</h3>
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

              <h3 className="mt-10 text-2xl md:text-5xl font-bold text-[#ffff06]">2ª jornada - 1 Agosto 2023</h3>
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

              <h3 className="mt-10 text-2xl md:text-5xl font-bold text-[#ffff06]">2ª jornada - 8 Agosto 2023</h3>
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

        <div className="flex flex-col hidden block max-w-3xl gap-16 px-8">
          <article className="w-full relative p-8 overflow-hidden text-center rounded-lg  [text-wrap:balance]">
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
              <svg className="opacity-60 backdrop-blur-lg" width="100%" height="100%" viewBox="0 0 400 400" fill="none">
                <g clipPath="url(#clip0_17_62)">
                  <g filter="url(#filter0_f_17_62)">
                    <path d="M128.6 0H0V322.2L81 310L128.6 0Z" fill="#4D008A"></path>
                    <path d="M0 322.2V400H240H320L81 310L0 322.2Z" fill="#CD03FF"></path>
                    <path d="M320 400H400V78.75L81 310L320 400Z" fill="#B5BFF1"></path>
                    <path d="M400 0H128.6L81 310L400 78.75V0Z" fill="#611A9A"></path>
                  </g>
                </g>
                <defs>
                  <filter
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
          <article className="w-full relative p-8 overflow-hidden rounded-lg text-center [text-wrap:balance]">
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
            >
              <g clipPath="url(#clip0_17_17)">
                <g filter="url(#filter0_f_17_17)">
                  <path d="M128.6 0H0V322.2L51.5 67.5L128.6 0Z" fill="#EB03FF"></path>
                  <path d="M0 322.2V400H240H320L51.5 67.5L0 322.2Z" fill="#FF0F9F"></path>
                  <path d="M320 400H400V78.75L51.5 67.5L320 400Z" fill="#3A0D84"></path>
                  <path d="M400 0H128.6L51.5 67.5L400 78.75V0Z" fill="#FAD8F4"></path>
                </g>
              </g>
              <defs>
                <filter
                  x="-160.333"
                  y="-160.333"
                  width="720.666"
                  height="720.666"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
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

export async function getServerSideProps({ query }) {
  const { team, ticket } = query

  if (team && ticket) {
    const dev = DEVS.find((dev) => dev.id === team)

    // no hemos encontrado el div
    if (!dev) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    }

    // revisamos si existe el ticket
    const url = await supabase.storage.from('tickets').createSignedUrl(`ticket-${ticket}.jpg`, 1)

    if (!url) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    }

    // read query string

    return {
      props: {
        ticketImg: `ticket-${ticket}.jpg`,
        support: dev,
      },
    }
  }

  return {
    props: {
      ticketImg: null,
      support: null,
    },
  }
}
