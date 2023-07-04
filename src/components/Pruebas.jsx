import { IconEyeOff, IconSwords } from '@tabler/icons-react'
import { IconBrain } from '@tabler/icons-react'
import { IconBug } from '@tabler/icons-react'
import { IconRocket } from '@tabler/icons-react'
import Marquee from 'react-fast-marquee'
import { IconDeviceIpadHorizontalQuestion } from '@tabler/icons-react'

export function PruebasMarquee() {
  return (
    <Marquee gradientWidth={'300px'} gradientColor={[0, 0, 0]} speed={50}>
      <h4 className="flex items-center justify-center opacity-80 md:flex-row gap-x-4 shadow-black">
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
  )
}
