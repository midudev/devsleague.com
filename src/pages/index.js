import { Inter, Inter_Tight } from 'next/font/google'

import { TwitchIcon } from '@/components/TwitchIcon'
import { PruebasMarquee } from '@/components/Pruebas'
import { RadialGradient } from '@/components/magicui/RadialGradient'
import { supabase } from '../lib/supabase'
import { useStore } from '@/store'
import html2canvas from 'html2canvas'

export const inter = Inter({ weight: ['400', '700'], subsets: ['latin'] })
export const interTight = Inter_Tight({ weight: ['800'], subsets: ['latin'] })

const PREFIX_CDN = 'https://uqfzwvabnygcbokitxqs.supabase.co/storage/v1/object/public/tickets'

import Head from 'next/head'
import Ticket from '@/components/Ticket'
import { SelectFighter } from '@/components/SelectFighter'
import { useState, useEffect } from 'react'
import { DEVS } from '../components/SelectFighter'
import { HeaderCountdown } from '../components/HeaderCountdown'
import { LinearCard } from '../components/LinearCard'
import { TwitchBlock } from '../components/TwitchBlock'
import { Leaderboard } from '../components/Leaderboard'
import { Logo } from '../components/Logo'

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

            if (error.statusCode === '409') {
              const filename = `ticket-${crypto.randomUUID()}.jpg`

              const { data: reData, error } = await supabase.storage.from('tickets').upload(filename, file, {
                cacheControl: '3600',
                upsert: false,
              })

              data = reData

              console.error(error)
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

      <RadialGradient />

      <header className="relative w-full mb-10 overflow-hidden">
        <HeaderCountdown />
      </header>

      <main className={`${inter.className} max-w-5xl m-auto pb-20`}>
        <div>
          <div className="block w-full h-full">
            <div className="flex items-center justify-center w-full h-full mb-24">
              <div className="relative">
                <Logo className="h-auto w-[500px]" />
                <div className="absolute inset-0 opacity-80 contrast-125 blur-2xl animate-pulse">
                  <Logo className="h-auto w-[500px]" />
                </div>
              </div>
            </div>

            <section className="grid grid-cols-6 gap-8 px-4 mx-auto gap-y-16">
              <LinearCard
                className="[grid-column:auto_/_span_6] md:[grid-column:auto_/_span_4]"
                title="¿Qué es la Devs League?"
              >
                <h1 className={`${interTight.className} text-white text-5xl text-center font-extrabold py-14`}>
                  La competición de <br />
                  <span className="text-transparent bg-gradient-to-r from-midu-secondary to-midu-primary bg-clip-text">
                    creadores de contenido
                  </span>
                  <br />
                  <span className="text-transparent bg-gradient-to-r from-yellow-200 to-yellow-300 bg-clip-text">
                    de programación.
                  </span>
                </h1>
              </LinearCard>

              <LinearCard
                title="Dónde verlo"
                className="[grid-column:auto_/_span_6] md:[grid-column:auto_/_span_2] uppercase"
              >
                <TwitchBlock />
              </LinearCard>

              <LinearCard
                title="Las pruebas"
                className="[grid-column:auto_/_span_6] md:[grid-column:auto_/_span_2] uppercase"
              >
                <PruebasMarquee />
              </LinearCard>

              <LinearCard title="Clasificación" className="[grid-column:auto_/_span_6] md:[grid-column:auto_/_span_4]">
                <Leaderboard />
              </LinearCard>

              <LinearCard className="[grid-column:auto_/_span_6]" title="Consigue tu ticket">
                <section className="flex flex-col items-center justify-center w-full gap-x-10">
                  <div className="flex items-center justify-center flex-0 w-[900px] scale-[0.5] sm:scale-[0.7] md:scale-[.9] xl:scale-100">
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
              </LinearCard>
            </section>
          </div>
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
