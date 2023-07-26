import { useStore } from '@/store'
import { MagicCard, MagicContainer } from './magicui/MagicCard'
import { useEffect } from 'react'

export const DEVS = [
  {
    id: 'hector',
    name: 'Héctor',
    img: 'hector.png',
    background: 'rgba(98,255,0,0.08)',
    color: 'rgba(98,255,0,1)',
    hash: '#teamHector',
    points: 15,
  },
  {
    id: 'goncy',
    name: 'Goncy',
    img: 'goncy.png',
    background: 'rgb(0,255,247,0.08)',
    color: 'rgb(0,255,247,1)',
    hash: '#teamGoncy',
    points: 15,
  },
  {
    id: 'noe',
    name: 'Noe',
    img: 'noe.png',
    background: 'rgba(179,0,255,0.08)',
    color: 'rgb(179,0,255,1)',
    hash: '#teamNoe',
    points: 15,
  },
  {
    id: 'carmen',
    name: 'Carmen',
    img: 'carmen.png',
    background: 'rgb(255,0,0,0.08)',
    color: 'rgb(255,0,0,1)',
    hash: '#teamCarmen',
    points: 15,
  },
]

export const SelectFighter = () => {
  const { team, selectTeam } = useStore((state) => state)

  const handleClick = (team) => () => {
    selectTeam(team)
  }

  useEffect(() => {
    // read query params from url
    const urlParams = new URLSearchParams(window.location.search)
    const team = urlParams.get('team')
    if (Boolean(team)) {
      selectTeam(team)
    }
  }, [])

  return (
    <>
      {DEVS.map((dev, index) => (
        <MagicContainer
          key={index}
          className={`border-2 ${
            team === dev.id ? `pointer-events-none` : 'cursor-pointer'
          } w-full h-auto aspect-[3/1] md:aspect-[2/1] lg:aspect-[85/90] flex flex-col gap-4 group`}
          style={{ borderColor: team === dev.id ? dev.color : 'white' }}
        >
          <MagicCard
            borderRadius={0}
            background={dev.background}
            borderColor={dev.color}
            className="flex flex-col items-center justify-center h-full overflow-hidden shadow-2xl cursor-pointer bg-background"
          >
            <button onClick={handleClick(dev.id)}>
              <img
                className="object-cover saturate-0 object-top w-40 scale-110 group-hover:scale-[140%] group-hover:saturate-100 transition transform-gpu origin-top group-hover:contrast-125"
                src={`/img/capitanes-tr/${dev.img}`}
                alt={dev.name}
                style={{ filter: team === dev.id ? 'saturate(1)' : undefined }}
              />
            </button>
          </MagicCard>
        </MagicContainer>
      ))}
    </>
  )
}
