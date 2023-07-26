import { IconEyeOff, IconFileDigit, IconSwords, IconBrain, IconBug, IconRun } from '@tabler/icons-react'
import Marquee from 'react-fast-marquee'
import { IconDeviceIpadHorizontalQuestion } from '@tabler/icons-react'

const PRUEBAS = [
  {
    text: 'Trivia',
    icon: <IconDeviceIpadHorizontalQuestion />,
    color: 'text-purple-300',
  },
  {
    text: 'CSS Battle',
    icon: <IconSwords />,
    color: 'text-red-300',
  },
  {
    text: 'Programa a ciegas',
    icon: <IconEyeOff />,
    color: 'text-sky-300',
  },
  {
    text: 'Lógica de programación',
    icon: <IconBrain />,
    color: 'text-pink-300',
  },
  {
    text: 'Encuentra el bug',
    icon: <IconBug />,
    color: 'text-orange-300',
  },
  {
    text: 'Sprint',
    icon: <IconRun />,
    color: 'text-yellow-300',
  },
  {
    text: 'Boolean',
    icon: <IconFileDigit />,
    color: 'text-green-300',
  },
]

function applyOffset(arr, offsetValue) {
  if (offsetValue >= arr.length || offsetValue <= 0) {
    // El offset es igual o mayor que la longitud del array, o negativo o cero, no es necesario hacer cambios
    return arr
  }

  // Copia los últimos 'offsetValue' elementos de 'arr' al principio de 'resultArr'
  const resultArr = arr.slice(-offsetValue)

  // Copia los primeros 'N - offsetValue' elementos de 'arr' al final de 'resultArr'
  resultArr.push(...arr.slice(0, arr.length - offsetValue))

  return resultArr
}

const PruebasMarqueeComponent = ({ direction, jump, speed = 50 }) => (
  <div className="py-1 transition cursor-pointer group-hover:opacity-50 hover:!opacity-100">
    <Marquee speed={speed} direction={direction}>
      <h4 className="flex items-center justify-center mr-4 gap-x-4 md:flex-row shadow-black">
        {applyOffset(PRUEBAS, jump).map(({ text, icon, color }) => (
          <span
            className={`${color} group-hover:opacity-60 hover:!opacity-100 hover:!scale-110 transition flex items-center justify-center gap-x-2`}
            key={text}
          >
            {icon}
            <span className={color}>{text}</span>
          </span>
        ))}
      </h4>
    </Marquee>
  </div>
)

export function PruebasMarquee() {
  return (
    <section className="flex flex-col max-w-3xl -my-20 text-xl rotate-12 group">
      <PruebasMarqueeComponent />
      <PruebasMarqueeComponent jump={1} direction="right" speed={22} />
      <PruebasMarqueeComponent jump={3} speed={33} />
      <PruebasMarqueeComponent jump={5} speed={23} direction="right" />
      <PruebasMarqueeComponent jump={2} speed={40} />
      <PruebasMarqueeComponent jump={4} speed={24} direction="right" />
      <PruebasMarqueeComponent jump={1} speed={41} />
      <PruebasMarqueeComponent jump={3} speed={37} direction="right" />
      <PruebasMarqueeComponent jump={5} speed={41} />
      <PruebasMarqueeComponent jump={2} speed={28} direction="right" />
      <PruebasMarqueeComponent jump={4} />
      <PruebasMarqueeComponent direction="right" />
    </section>
  )
}
