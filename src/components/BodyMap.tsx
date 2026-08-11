import { useMemo, useState } from 'react'
import type { MuscleId } from '../data/muscles'
import { MUSCLES } from '../data/muscles'

export type Gender = 'male' | 'female'
export type View = 'front' | 'back'

interface Dims {
  neckHalf: number
  shoulderHalf: number
  chestHalf: number
  waistHalf: number
  hipHalf: number
  armW: number
  forearmW: number
  thighW: number
  calfW: number
}

function dimsFor(gender: Gender): Dims {
  return gender === 'male'
    ? { neckHalf: 13, shoulderHalf: 54, chestHalf: 44, waistHalf: 30, hipHalf: 33, armW: 17, forearmW: 14, thighW: 27, calfW: 16 }
    : { neckHalf: 11, shoulderHalf: 40, chestHalf: 35, waistHalf: 24, hipHalf: 41, armW: 13, forearmW: 11, thighW: 25, calfW: 13 }
}

const CX = 120

interface RegionProps {
  active: MuscleId | null
  hovered: MuscleId | null
  onSelect: (m: MuscleId) => void
  onHover: (m: MuscleId | null) => void
}

function Head({ shoulderHalf }: { shoulderHalf: number }) {
  return (
    <>
      <ellipse cx={CX} cy={34} rx={22} ry={25} className="body-outline" />
      <path
        d={`M ${CX - 20} 78 Q ${CX} 60 ${CX + 20} 78 L ${CX + shoulderHalf} 96 Q ${CX} 84 ${CX - shoulderHalf} 96 Z`}
        className="body-outline"
      />
    </>
  )
}

function FrontBody({ dims, active, onSelect, onHover }: RegionProps & { dims: Dims }) {
  const { neckHalf, shoulderHalf, chestHalf, waistHalf, armW, forearmW, thighW, calfW } = dims
  const isSel = (id: MuscleId) => (active === id ? 'muscle-path is-active' : 'muscle-path')

  return (
    <g>
      <Head shoulderHalf={shoulderHalf} />

      {/* neck */}
      <rect x={CX - neckHalf} y={54} width={neckHalf * 2} height={24} rx={6} className={isSel('neck')} onClick={() => onSelect('neck')} onMouseEnter={() => onHover('neck')} onMouseLeave={() => onHover(null)} />

      {/* torso backdrop */}
      <path
        d={`M ${CX - shoulderHalf} 96 L ${CX - chestHalf} 150 L ${CX - waistHalf} 222 L ${CX - dims.hipHalf} 236 L ${CX + dims.hipHalf} 236 L ${CX + waistHalf} 222 L ${CX + chestHalf} 150 L ${CX + shoulderHalf} 96 Z`}
        className="body-outline"
      />

      {/* shoulders (deltoid caps) */}
      <ellipse cx={CX - shoulderHalf + 14} cy={100} rx={18} ry={21} className={isSel('shoulders')} onClick={() => onSelect('shoulders')} onMouseEnter={() => onHover('shoulders')} onMouseLeave={() => onHover(null)} />
      <ellipse cx={CX + shoulderHalf - 14} cy={100} rx={18} ry={21} className={isSel('shoulders')} onClick={() => onSelect('shoulders')} onMouseEnter={() => onHover('shoulders')} onMouseLeave={() => onHover(null)} />

      {/* chest */}
      <path
        d={`M ${CX - chestHalf + 8} 96 Q ${CX} 88 ${CX + chestHalf - 8} 96 L ${CX + chestHalf - 12} 150 Q ${CX} 162 ${CX - chestHalf + 12} 150 Z`}
        className={isSel('chest')}
        onClick={() => onSelect('chest')}
        onMouseEnter={() => onHover('chest')}
        onMouseLeave={() => onHover(null)}
      />

      {/* abs */}
      <rect x={CX - 20} y={152} width={40} height={70} rx={12} className={isSel('abs')} onClick={() => onSelect('abs')} onMouseEnter={() => onHover('abs')} onMouseLeave={() => onHover(null)} />

      {/* obliques */}
      <path d={`M ${CX - waistHalf - 6} 154 L ${CX - 22} 152 L ${CX - 22} 220 L ${CX - waistHalf + 4} 220 Z`} className={isSel('obliques')} onClick={() => onSelect('obliques')} onMouseEnter={() => onHover('obliques')} onMouseLeave={() => onHover(null)} />
      <path d={`M ${CX + waistHalf + 6} 154 L ${CX + 22} 152 L ${CX + 22} 220 L ${CX + waistHalf - 4} 220 Z`} className={isSel('obliques')} onClick={() => onSelect('obliques')} onMouseEnter={() => onHover('obliques')} onMouseLeave={() => onHover(null)} />

      {/* biceps (upper arm) */}
      {[-1, 1].map((s) => (
        <path
          key={s}
          d={`M ${CX + s * (shoulderHalf - 6)} 108 L ${CX + s * (shoulderHalf + armW - 6)} 112 L ${CX + s * (shoulderHalf + armW - 14)} 206 L ${CX + s * (shoulderHalf - 14)} 202 Z`}
          className={isSel('biceps')}
          onClick={() => onSelect('biceps')}
          onMouseEnter={() => onHover('biceps')}
          onMouseLeave={() => onHover(null)}
        />
      ))}

      {/* forearms */}
      {[-1, 1].map((s) => (
        <path
          key={s}
          d={`M ${CX + s * (shoulderHalf - 14)} 208 L ${CX + s * (shoulderHalf + armW - 16)} 210 L ${CX + s * (shoulderHalf + forearmW - 22)} 300 L ${CX + s * (shoulderHalf - 20)} 298 Z`}
          className={isSel('forearms')}
          onClick={() => onSelect('forearms')}
          onMouseEnter={() => onHover('forearms')}
          onMouseLeave={() => onHover(null)}
        />
      ))}

      {/* quads */}
      {[-1, 1].map((s) => (
        <path
          key={s}
          d={`M ${CX + s * 4} 238 L ${CX + s * (thighW + 4)} 240 L ${CX + s * (thighW - 6)} 366 L ${CX + s * 6} 366 Z`}
          className={isSel('quads')}
          onClick={() => onSelect('quads')}
          onMouseEnter={() => onHover('quads')}
          onMouseLeave={() => onHover(null)}
        />
      ))}

      {/* calves front */}
      {[-1, 1].map((s) => (
        <path
          key={s}
          d={`M ${CX + s * 8} 372 L ${CX + s * (calfW + 6)} 374 L ${CX + s * calfW} 470 L ${CX + s * 10} 470 Z`}
          className={isSel('calves')}
          onClick={() => onSelect('calves')}
          onMouseEnter={() => onHover('calves')}
          onMouseLeave={() => onHover(null)}
        />
      ))}

      {/* feet */}
      <ellipse cx={CX - 14} cy={486} rx={13} ry={9} className="body-outline" />
      <ellipse cx={CX + 14} cy={486} rx={13} ry={9} className="body-outline" />
    </g>
  )
}

function BackBody({ dims, active, onSelect, onHover }: RegionProps & { dims: Dims }) {
  const { neckHalf, shoulderHalf, chestHalf, waistHalf, hipHalf, armW, forearmW, thighW, calfW } = dims
  const isSel = (id: MuscleId) => (active === id ? 'muscle-path is-active' : 'muscle-path')

  return (
    <g>
      <Head shoulderHalf={shoulderHalf} />

      <rect x={CX - neckHalf} y={54} width={neckHalf * 2} height={24} rx={6} className={isSel('neck')} onClick={() => onSelect('neck')} onMouseEnter={() => onHover('neck')} onMouseLeave={() => onHover(null)} />

      <path
        d={`M ${CX - shoulderHalf} 96 L ${CX - chestHalf} 150 L ${CX - waistHalf} 222 L ${CX - hipHalf} 236 L ${CX + hipHalf} 236 L ${CX + waistHalf} 222 L ${CX + chestHalf} 150 L ${CX + shoulderHalf} 96 Z`}
        className="body-outline"
      />

      {/* shoulders (rear delts) */}
      <ellipse cx={CX - shoulderHalf + 14} cy={100} rx={18} ry={21} className={isSel('shoulders')} onClick={() => onSelect('shoulders')} onMouseEnter={() => onHover('shoulders')} onMouseLeave={() => onHover(null)} />
      <ellipse cx={CX + shoulderHalf - 14} cy={100} rx={18} ry={21} className={isSel('shoulders')} onClick={() => onSelect('shoulders')} onMouseEnter={() => onHover('shoulders')} onMouseLeave={() => onHover(null)} />

      {/* traps */}
      <path d={`M ${CX - shoulderHalf + 16} 92 L ${CX} 78 L ${CX + shoulderHalf - 16} 92 L ${CX + 18} 140 L ${CX - 18} 140 Z`} className={isSel('traps')} onClick={() => onSelect('traps')} onMouseEnter={() => onHover('traps')} onMouseLeave={() => onHover(null)} />

      {/* back / lats */}
      <path d={`M ${CX - chestHalf + 10} 142 L ${CX - 18} 140 L ${CX - 16} 210 L ${CX - waistHalf + 6} 216 Z`} className={isSel('back')} onClick={() => onSelect('back')} onMouseEnter={() => onHover('back')} onMouseLeave={() => onHover(null)} />
      <path d={`M ${CX + chestHalf - 10} 142 L ${CX + 18} 140 L ${CX + 16} 210 L ${CX + waistHalf - 6} 216 Z`} className={isSel('back')} onClick={() => onSelect('back')} onMouseEnter={() => onHover('back')} onMouseLeave={() => onHover(null)} />

      {/* lower back */}
      <rect x={CX - 16} y={212} width={32} height={24} rx={8} className={isSel('lower_back')} onClick={() => onSelect('lower_back')} onMouseEnter={() => onHover('lower_back')} onMouseLeave={() => onHover(null)} />

      {/* glutes */}
      <path d={`M ${CX - hipHalf + 2} 238 Q ${CX} 226 ${CX + hipHalf - 2} 238 L ${CX + hipHalf - 6} 284 Q ${CX} 296 ${CX - hipHalf + 6} 284 Z`} className={isSel('glutes')} onClick={() => onSelect('glutes')} onMouseEnter={() => onHover('glutes')} onMouseLeave={() => onHover(null)} />

      {/* triceps */}
      {[-1, 1].map((s) => (
        <path
          key={s}
          d={`M ${CX + s * (shoulderHalf - 6)} 108 L ${CX + s * (shoulderHalf + armW - 6)} 112 L ${CX + s * (shoulderHalf + armW - 14)} 206 L ${CX + s * (shoulderHalf - 14)} 202 Z`}
          className={isSel('triceps')}
          onClick={() => onSelect('triceps')}
          onMouseEnter={() => onHover('triceps')}
          onMouseLeave={() => onHover(null)}
        />
      ))}

      {/* forearms */}
      {[-1, 1].map((s) => (
        <path
          key={s}
          d={`M ${CX + s * (shoulderHalf - 14)} 208 L ${CX + s * (shoulderHalf + armW - 16)} 210 L ${CX + s * (shoulderHalf + forearmW - 22)} 300 L ${CX + s * (shoulderHalf - 20)} 298 Z`}
          className={isSel('forearms')}
          onClick={() => onSelect('forearms')}
          onMouseEnter={() => onHover('forearms')}
          onMouseLeave={() => onHover(null)}
        />
      ))}

      {/* hamstrings */}
      {[-1, 1].map((s) => (
        <path
          key={s}
          d={`M ${CX + s * 4} 288 L ${CX + s * (thighW + 4)} 290 L ${CX + s * (thighW - 6)} 366 L ${CX + s * 6} 366 Z`}
          className={isSel('hamstrings')}
          onClick={() => onSelect('hamstrings')}
          onMouseEnter={() => onHover('hamstrings')}
          onMouseLeave={() => onHover(null)}
        />
      ))}

      {/* calves back */}
      {[-1, 1].map((s) => (
        <path
          key={s}
          d={`M ${CX + s * 8} 372 L ${CX + s * (calfW + 6)} 374 L ${CX + s * calfW} 470 L ${CX + s * 10} 470 Z`}
          className={isSel('calves')}
          onClick={() => onSelect('calves')}
          onMouseEnter={() => onHover('calves')}
          onMouseLeave={() => onHover(null)}
        />
      ))}

      <ellipse cx={CX - 14} cy={486} rx={13} ry={9} className="body-outline" />
      <ellipse cx={CX + 14} cy={486} rx={13} ry={9} className="body-outline" />
    </g>
  )
}

interface BodyMapProps {
  gender: Gender
  view: View
  active: MuscleId | null
  onSelect: (m: MuscleId) => void
}

export default function BodyMap({ gender, view, active, onSelect }: BodyMapProps) {
  const dims = useMemo(() => dimsFor(gender), [gender])
  const [hovered, setHovered] = useState<MuscleId | null>(null)
  const label = hovered ? MUSCLES[hovered].label : active ? MUSCLES[active].label : null

  return (
    <div className="relative flex flex-col items-center">
      <svg viewBox="0 0 240 560" className="w-full max-w-[280px] select-none" role="img" aria-label={`${gender} body, ${view} view`}>
        {view === 'front' ? (
          <FrontBody dims={dims} active={active} hovered={hovered} onSelect={onSelect} onHover={setHovered} />
        ) : (
          <BackBody dims={dims} active={active} hovered={hovered} onSelect={onSelect} onHover={setHovered} />
        )}
      </svg>
      <div className="h-6 text-sm font-medium text-[var(--color-clay)] tracking-wide">
        {label ?? ' '}
      </div>
    </div>
  )
}
