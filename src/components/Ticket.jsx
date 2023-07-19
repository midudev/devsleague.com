import 'atropos/css'
import Atropos from 'atropos/react'
import { Logo } from './Logo'
import { CohereLogo } from './CohereLogo'

const BackgroundPattern = () => (
  <svg id="patternId" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="a" patternUnits="userSpaceOnUse" width="70" height="8" patternTransform="scale(2) rotate(20)">
        <rect x="0" y="0" width="100%" height="100%" fill="hsla(0, 100%, 0%, 1)" />
        <path
          d="M-.02 22c8.373 0 11.938-4.695 16.32-9.662C20.785 7.258 25.728 2 35 2c9.272 0 14.215 5.258 18.7 10.338C58.082 17.305 61.647 22 70.02 22M-.02 14.002C8.353 14 11.918 9.306 16.3 4.339 20.785-.742 25.728-6 35-6 44.272-6 49.215-.742 53.7 4.339c4.382 4.967 7.947 9.661 16.32 9.664M70 6.004c-8.373-.001-11.918-4.698-16.3-9.665C49.215-8.742 44.272-14 35-14c-9.272 0-14.215 5.258-18.7 10.339C11.918 1.306 8.353 6-.02 6.002"
          stroke-width="1"
          stroke="hsla(54, 100%, 62%, .2)"
          fill="none"
        />
      </pattern>
    </defs>
    <rect width="800%" height="800%" transform="translate(-154,0)" fill="url(#a)" />
  </svg>
)

export default function Ticket() {
  return (
    <div className="relative z-10 w-full h-full mx-auto aspect-video">
      <div className="h-full isolate" style={{ opacity: 1, transform: 'none' }}>
        <div className="h-full sm:px-12 sm:pt-12">
          <Atropos className="w-full h-full mx-auto aspect-video rounded-2xl">
            <div
              className="h-full overflow-hidden border-2 border-yellow-300 rounded-2xl"
              style={{ opacity: 1, transform: 'none' }}
            >
              <div className="relative flex flex-col items-center h-full overflow-hidden">
                <div className="absolute inset-0 flex items-start justify-center">
                  <div className="h-full w-full [mask-image:linear-gradient(black_10%,transparent)]">
                    <BackgroundPattern />
                  </div>
                </div>
                <div className="mt-0">
                  <span className="sr-only">Devs League</span>
                  <div className="relative">
                    <Logo className="h-auto w-[500px]" />
                    <div className="absolute inset-0 opacity-80 contrast-125 blur-2xl animate-pulse">
                      <Logo className="h-auto w-[500px]" />
                    </div>
                  </div>
                </div>
                <div className="relative mt-10 text-center font-display font-semibold uppercase tracking-[0.2em]">
                  <h1 className="sr-only">devsleague</h1>
                  <time dateTime="2023-06-20T18:00-04:00" className="flex items-center text-1rem/6 text-zinc-200">
                    25 de julio, 2023
                    <svg viewBox="0 0 2 2" className="mx-3 h-[0.1875rem] w-[0.1875rem] flex-none fill-yellow-300">
                      <circle cx={1} cy={1} r={1} />
                    </svg>
                    6PM
                  </time>
                  <div className="mt-1 text-xl leading-6 text-purple-400">TWITCH.TV/MIDUDEV</div>
                </div>
              </div>
              <div className="absolute items-center p-4 overflow-hidden font-mono text-white md:p-6 left-2 top-2">
                <span className="block text-zinc-200">Nº Ticket</span>
                <strong className="text-3xl font-extrabold">#0001</strong>
              </div>
              <div className="absolute items-center p-4 overflow-hidden font-mono text-white md:p-6 right-2 bottom-2">
                <span className="block mb-2 text-xs text-right text-zinc-300">Gracias a:</span>
                <CohereLogo className="w-32" />
              </div>
            </div>
          </Atropos>
        </div>
      </div>
    </div>
  )
}
