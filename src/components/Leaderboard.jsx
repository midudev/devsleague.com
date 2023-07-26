import { DEVS } from './SelectFighter'

export function Leaderboard() {
  // sort leaderboard by points
  const sortedLeaderboard = DEVS.sort((a, b) => b.points - a.points)

  return (
    <table class="w-full text-xs text-left text-black">
      <tbody>
        {sortedLeaderboard.map((info, index) => {
          const { img, id, background, name, color, points } = info

          return (
            <tr key={id} class={'group cursor-crosshair text-base overflow-hidden hover:bg-white/10 transition'}>
              <th
                scope="row"
                className={'text-center px-3 py-4 font-black text-white whitespace-nowrap relative text-xl'}
              >
                {index === 0 && <span class="text-yellow-300">🥇 1</span>}
                {index === 1 && <span class="text-zinc-300">🥈 2</span>}
                {index === 2 && <span class="text-orange-500">🥉 3</span>}
                {index === 3 && <span class="text-white">4</span>}
              </th>
              <td class="px-6 py-4 font-black">
                <a class="flex items-center gap-x-4 transition group-hover:scale-[120%] text-white">
                  <img
                    src={`/img/capitanes-tr/${img}`}
                    alt={'Logo de ' + name}
                    class={'w-20 border-2 rounded-full aspect-square'}
                    style={{ borderColor: color, backgroundColor: background }}
                    fetchpriority="high"
                  />
                  <span class="text-3xl pl-2">{name}</span>
                </a>
              </td>
              <td class="text-yellow-300 text-center text-3xl px-4 py-4 font-bold relative">
                <span>{points}</span>
                <span className="opacity-0 transition text-[10px] text-white left-0 right-0 mx-auto absolute bottom-4 group-hover:opacity-100">
                  PUNTOS
                </span>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
