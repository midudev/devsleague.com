import { Meteors } from './Meteor'
import { useRemainingTime } from '../hooks/useRemainingTime'
import { useEffect } from 'react'
import { useState } from 'react'

export function HeaderCountdown() {
  const { seconds, minutes, hours, days } = useRemainingTime(new Date(1691517600000), {
    fillingZeros: false,
  })
  const [show, setShow] = useState(false)

  useEffect(() => {
    setShow(true)
  }, [])

  return (
    <>
      <Meteors />
      <div
        className="relative w-full h-14 p-2 flex items-center justify-center text-white !bg-cover !bg-center overflow-hidden"
        style={{
          background: 'linear-gradient(to right, #020405 10%, #1D0B31 40%, #1B113B 50%, #122029 70%, #020405 90%)',
        }}
      >
        <div className="relative z-10 flex items-center justify-center">
          <div className="w-full flex gap-3 md:gap-6 items-center md:justify-center text-sm md:text-base !justify-center">
            <p>
              <span className="hidden font-semibold text-yellow-300 md:inline">Próxima</span>{' '}
              <span className="font-semibold text-yellow-300">GRAN FINAL</span>
            </p>
            <div className="flex items-center gap-1">
              <div className="flex items-center gap-1">
                <div className="rounded-md p-[1px] overflow-hidden bg-gradient-to-b from-[#514b6130] to-[#514b6100]">
                  <div className="py-1 px-2 rounded-md w-11 leading-4 flex items-center justify-center bg-gradient-to-b from-[#51269c40] to-[#DBB8BF10] backdrop-blur-md">
                    <span className="m-0">{show && days}</span>
                    <span>d</span>
                  </div>
                </div>
                :
                <div className="rounded-md p-[1px] overflow-hidden bg-gradient-to-b from-[#514b6130] to-[#514b6100]">
                  <div className="py-1 px-2 rounded-md w-11 leading-4 flex items-center justify-center bg-gradient-to-b from-[#51269c40] to-[#DBB8BF10] backdrop-blur-md">
                    <span className="m-0">{show && hours}</span>
                    <span>h</span>
                  </div>
                </div>
                :
                <div className="rounded-md p-[1px] overflow-hidden bg-gradient-to-b from-[#514b6130] to-[#514b6100]">
                  <div className="py-1 px-2 rounded-md w-11 leading-4 flex items-center justify-center bg-gradient-to-b from-[#51269c40] to-[#DBB8BF10] backdrop-blur-md">
                    <span className="m-0">{show && minutes}</span>
                    <span>m</span>
                  </div>
                </div>
                :
                <div className="rounded-md p-[1px] overflow-hidden bg-gradient-to-b from-[#514b6130] to-[#514b6100]">
                  <div className="py-1 px-2 rounded-md w-11 leading-4 flex items-center justify-center bg-gradient-to-b from-[#51269c40] to-[#DBB8BF10] backdrop-blur-md">
                    <span className="m-0">{show && seconds}</span>
                    <span>s</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <a
                href="#ticket"
                className="relative inline-flex h-8 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
              >
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <span className="inline-flex items-center justify-center w-full h-full px-3 py-1 text-sm font-medium text-white rounded-full cursor-pointer bg-slate-950 backdrop-blur-3xl">
                  Compartir Ticket
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
