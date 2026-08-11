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
    ? { neckHalf: 16, shoulderHalf: 66, chestHalf: 48, waistHalf: 29, hipHalf: 33, armW: 24, forearmW: 17, thighW: 31, calfW: 19 }
    : { neckHalf: 12, shoulderHalf: 44, chestHalf: 35, waistHalf: 22, hipHalf: 40, armW: 16, forearmW: 12, thighW: 27, calfW: 14 }
}

const CX = 140
const VIEW_BOX = '0 0 280 580'

interface RegionProps {
  dims: Dims
  active: MuscleId | null
  onSelect: (m: MuscleId) => void
  onHover: (m: MuscleId | null) => void
}

/** x(s, offset) mirrors a distance from center; s is -1 (left) or 1 (right) */
function X(s: number, offset: number) {
  return CX + s * offset
}

function Head({ shoulderHalf }: { shoulderHalf: number }) {
  return (
    <>
      <ellipse cx={CX} cy={34} rx={21} ry={25} className="body-outline" />
      <path
        d={`M ${CX - 17} 76 Q ${CX} 62 ${CX + 17} 76 L ${CX + shoulderHalf * 0.55} 98 Q ${CX} 88 ${CX - shoulderHalf * 0.55} 98 Z`}
        className="body-outline"
      />
    </>
  )
}

function DefLines({ d, opacity = 0.16 }: { d: string; opacity?: number }) {
  return <path d={d} fill="none" stroke="#1f2328" strokeOpacity={opacity} strokeWidth={1.4} strokeLinecap="round" pointerEvents="none" />
}

function torsoOutline(dims: Dims) {
  const { shoulderHalf, chestHalf, waistHalf, hipHalf } = dims
  return `M ${X(-1, shoulderHalf)} 98
    C ${X(-1, shoulderHalf - 8)} 122 ${X(-1, chestHalf + 4)} 132 ${X(-1, chestHalf - 6)} 158
    C ${X(-1, waistHalf + 14)} 182 ${X(-1, waistHalf - 2)} 200 ${X(-1, waistHalf + 4)} 222
    C ${X(-1, hipHalf + 6)} 232 ${X(-1, hipHalf)} 236 ${X(-1, hipHalf - 2)} 240
    L ${X(1, hipHalf - 2)} 240
    C ${X(1, hipHalf)} 236 ${X(1, hipHalf + 6)} 232 ${X(1, waistHalf + 4)} 222
    C ${X(1, waistHalf - 2)} 200 ${X(1, waistHalf + 14)} 182 ${X(1, chestHalf - 6)} 158
    C ${X(1, chestHalf + 4)} 132 ${X(1, shoulderHalf - 8)} 122 ${X(1, shoulderHalf)} 98
    Z`
}

function pecPath(s: number, dims: Dims) {
  const { shoulderHalf, chestHalf } = dims
  return `M ${X(s, 6)} 100
    C ${X(s, 10)} 88 ${X(s, chestHalf - 18)} 82 ${X(s, shoulderHalf - 20)} 100
    C ${X(s, shoulderHalf - 14)} 118 ${X(s, chestHalf - 2)} 134 ${X(s, chestHalf - 10)} 155
    C ${X(s, chestHalf - 24)} 172 ${X(s, 26)} 172 ${X(s, 12)} 160
    C ${X(s, 4)} 145 ${X(s, 2)} 118 ${X(s, 6)} 100
    Z`
}

function deltoidPath(s: number, dims: Dims) {
  const { shoulderHalf } = dims
  return `M ${X(s, shoulderHalf - 46)} 84
    C ${X(s, shoulderHalf - 20)} 70 ${X(s, shoulderHalf + 14)} 84 ${X(s, shoulderHalf + 8)} 112
    C ${X(s, shoulderHalf + 2)} 132 ${X(s, shoulderHalf - 34)} 134 ${X(s, shoulderHalf - 48)} 116
    C ${X(s, shoulderHalf - 54)} 104 ${X(s, shoulderHalf - 54)} 92 ${X(s, shoulderHalf - 46)} 84
    Z`
}

function bicepPath(s: number, dims: Dims) {
  const { shoulderHalf, armW } = dims
  return `M ${X(s, shoulderHalf - 30)} 114
    C ${X(s, shoulderHalf + armW - 26)} 118 ${X(s, shoulderHalf + armW - 10)} 148 ${X(s, shoulderHalf + armW - 16)} 178
    C ${X(s, shoulderHalf + armW - 20)} 198 ${X(s, shoulderHalf - 6)} 208 ${X(s, shoulderHalf - 16)} 204
    C ${X(s, shoulderHalf - 26)} 184 ${X(s, shoulderHalf - 28)} 140 ${X(s, shoulderHalf - 30)} 114
    Z`
}

function tricepPath(s: number, dims: Dims) {
  const { shoulderHalf, armW } = dims
  return `M ${X(s, shoulderHalf - 30)} 114
    C ${X(s, shoulderHalf + armW - 22)} 120 ${X(s, shoulderHalf + armW - 12)} 150 ${X(s, shoulderHalf + armW - 18)} 176
    C ${X(s, shoulderHalf + armW - 24)} 194 ${X(s, shoulderHalf - 8)} 206 ${X(s, shoulderHalf - 16)} 202
    C ${X(s, shoulderHalf - 26)} 182 ${X(s, shoulderHalf - 28)} 140 ${X(s, shoulderHalf - 30)} 114
    Z`
}

function forearmPath(s: number, dims: Dims) {
  const { shoulderHalf, forearmW } = dims
  return `M ${X(s, shoulderHalf - 16)} 206
    C ${X(s, shoulderHalf + forearmW - 4)} 210 ${X(s, shoulderHalf + forearmW - 2)} 230 ${X(s, shoulderHalf + forearmW - 12)} 254
    C ${X(s, shoulderHalf + forearmW - 18)} 275 ${X(s, shoulderHalf - 2)} 298 ${X(s, shoulderHalf - 6)} 302
    L ${X(s, shoulderHalf - 20)} 300
    C ${X(s, shoulderHalf - 28)} 270 ${X(s, shoulderHalf - 26)} 230 ${X(s, shoulderHalf - 16)} 206
    Z`
}

function quadPath(s: number, dims: Dims) {
  const { thighW } = dims
  return `M ${X(s, 3)} 242
    C ${X(s, thighW - 2)} 246 ${X(s, thighW + 10)} 290 ${X(s, thighW + 2)} 330
    C ${X(s, thighW - 6)} 356 ${X(s, thighW - 16)} 368 ${X(s, 10)} 372
    C ${X(s, 5)} 330 ${X(s, 3)} 285 ${X(s, 3)} 242
    Z`
}

function hamstringPath(s: number, dims: Dims) {
  const { thighW } = dims
  return `M ${X(s, 4)} 292
    C ${X(s, thighW - 2)} 296 ${X(s, thighW + 4)} 322 ${X(s, thighW - 2)} 348
    C ${X(s, thighW - 10)} 364 ${X(s, 12)} 372 ${X(s, 8)} 370
    C ${X(s, 4)} 344 ${X(s, 3)} 316 ${X(s, 4)} 292
    Z`
}

function calfPath(s: number, dims: Dims) {
  const { calfW } = dims
  return `M ${X(s, 8)} 378
    C ${X(s, calfW + 8)} 384 ${X(s, calfW + 16)} 412 ${X(s, calfW + 4)} 442
    C ${X(s, calfW - 4)} 464 ${X(s, 8)} 476 ${X(s, 11)} 474
    C ${X(s, 5)} 444 ${X(s, 4)} 408 ${X(s, 8)} 378
    Z`
}

function Region({
  d,
  muscle,
  active,
  onSelect,
  onHover,
}: {
  d: string
  muscle: MuscleId
  active: MuscleId | null
  onSelect: (m: MuscleId) => void
  onHover: (m: MuscleId | null) => void
}) {
  return (
    <path
      d={d}
      className={active === muscle ? 'muscle-path is-active' : 'muscle-path'}
      onClick={() => onSelect(muscle)}
      onMouseEnter={() => onHover(muscle)}
      onMouseLeave={() => onHover(null)}
    />
  )
}

function Feet() {
  return (
    <>
      <ellipse cx={CX - 15} cy={492} rx={13} ry={9} className="body-outline" />
      <ellipse cx={CX + 15} cy={492} rx={13} ry={9} className="body-outline" />
    </>
  )
}

function FrontBody({ dims, active, onSelect, onHover }: RegionProps) {
  const isSel = (id: MuscleId) => (active === id ? 'muscle-path is-active' : 'muscle-path')
  const { neckHalf, waistHalf } = dims

  // ab blocks: 3 rows x 2 columns, forming a defined six-pack
  const abCols = [-1, 1]
  const abRows = [0, 1, 2]
  const abColW = 17
  const abGap = 5
  const abRowH = 21
  const abRowGap = 4
  const abTop = 160

  return (
    <g>
      <Head shoulderHalf={dims.shoulderHalf} />

      <rect
        x={CX - neckHalf} y={56} width={neckHalf * 2} height={26} rx={7}
        className={isSel('neck')}
        onClick={() => onSelect('neck')} onMouseEnter={() => onHover('neck')} onMouseLeave={() => onHover(null)}
      />

      <path d={torsoOutline(dims)} className="body-outline" />

      {[-1, 1].map((s) => <Region key={`sh${s}`} d={deltoidPath(s, dims)} muscle="shoulders" active={active} onSelect={onSelect} onHover={onHover} />)}
      {[-1, 1].map((s) => <Region key={`ch${s}`} d={pecPath(s, dims)} muscle="chest" active={active} onSelect={onSelect} onHover={onHover} />)}

      {abRows.map((row) =>
        abCols.map((s) => (
          <rect
            key={`ab-${row}-${s}`}
            x={s === -1 ? CX - abGap / 2 - abColW : CX + abGap / 2}
            y={abTop + row * (abRowH + abRowGap)}
            width={abColW}
            height={abRowH}
            rx={6}
            className={isSel('abs')}
            onClick={() => onSelect('abs')}
            onMouseEnter={() => onHover('abs')}
            onMouseLeave={() => onHover(null)}
          />
        )),
      )}

      {[-1, 1].map((s) => (
        <path
          key={`obl${s}`}
          d={`M ${X(s, waistHalf - 2)} 160 C ${X(s, waistHalf + 4)} 185 ${X(s, waistHalf - 2)} 210 ${X(s, 26)} 226 L ${X(s, 22)} 164 Z`}
          className={isSel('obliques')}
          onClick={() => onSelect('obliques')}
          onMouseEnter={() => onHover('obliques')}
          onMouseLeave={() => onHover(null)}
        />
      ))}

      {[-1, 1].map((s) => <Region key={`bi${s}`} d={bicepPath(s, dims)} muscle="biceps" active={active} onSelect={onSelect} onHover={onHover} />)}
      {[-1, 1].map((s) => <Region key={`fa${s}`} d={forearmPath(s, dims)} muscle="forearms" active={active} onSelect={onSelect} onHover={onHover} />)}
      {[-1, 1].map((s) => <Region key={`qu${s}`} d={quadPath(s, dims)} muscle="quads" active={active} onSelect={onSelect} onHover={onHover} />)}
      {[-1, 1].map((s) => <Region key={`ca${s}`} d={calfPath(s, dims)} muscle="calves" active={active} onSelect={onSelect} onHover={onHover} />)}

      {/* definition lines */}
      <DefLines d={`M ${CX} 96 C ${CX} 118 ${CX} 138 ${CX} 160`} />
      {[-1, 1].map((s) => (
        <DefLines key={`bidef${s}`} d={`M ${X(s, dims.shoulderHalf - 14)} 140 C ${X(s, dims.shoulderHalf + dims.armW - 20)} 148 ${X(s, dims.shoulderHalf + dims.armW - 20)} 158 ${X(s, dims.shoulderHalf - 12)} 168`} />
      ))}
      {[-1, 1].map((s) => (
        <DefLines key={`qudef${s}`} d={`M ${X(s, 14)} 258 C ${X(s, dims.thighW - 8)} 290 ${X(s, dims.thighW - 10)} 320 ${X(s, 16)} 356`} opacity={0.12} />
      ))}
      {[-1, 1].map((s) => (
        <DefLines key={`cadef${s}`} d={`M ${X(s, dims.calfW - 4)} 388 C ${X(s, dims.calfW + 2)} 410 ${X(s, dims.calfW)} 432 ${X(s, dims.calfW - 6)} 456`} opacity={0.12} />
      ))}

      <Feet />
    </g>
  )
}

function BackBody({ dims, active, onSelect, onHover }: RegionProps) {
  const isSel = (id: MuscleId) => (active === id ? 'muscle-path is-active' : 'muscle-path')
  const { neckHalf, shoulderHalf, chestHalf, waistHalf, hipHalf } = dims

  return (
    <g>
      <Head shoulderHalf={shoulderHalf} />

      <rect
        x={CX - neckHalf} y={56} width={neckHalf * 2} height={26} rx={7}
        className={isSel('neck')}
        onClick={() => onSelect('neck')} onMouseEnter={() => onHover('neck')} onMouseLeave={() => onHover(null)}
      />

      <path d={torsoOutline(dims)} className="body-outline" />

      {[-1, 1].map((s) => <Region key={`sh${s}`} d={deltoidPath(s, dims)} muscle="shoulders" active={active} onSelect={onSelect} onHover={onHover} />)}

      <path
        d={`M ${X(-1, shoulderHalf - 30)} 96 Q ${CX} 78 ${X(1, shoulderHalf - 30)} 96
            C ${X(1, 26)} 118 ${X(1, 14)} 140 ${CX} 148
            C ${X(-1, 14)} 140 ${X(-1, 26)} 118 ${X(-1, shoulderHalf - 30)} 96 Z`}
        className={isSel('traps')}
        onClick={() => onSelect('traps')} onMouseEnter={() => onHover('traps')} onMouseLeave={() => onHover(null)}
      />

      {[-1, 1].map((s) => (
        <path
          key={`lat${s}`}
          d={`M ${X(s, chestHalf - 12)} 142
              C ${X(s, chestHalf + 2)} 164 ${X(s, chestHalf - 4)} 192 ${X(s, waistHalf + 8)} 218
              C ${X(s, waistHalf - 8)} 212 ${X(s, 14)} 198 ${X(s, 13)} 172
              C ${X(s, 12)} 156 ${X(s, 16)} 148 ${X(s, chestHalf - 12)} 142 Z`}
          className={isSel('back')}
          onClick={() => onSelect('back')} onMouseEnter={() => onHover('back')} onMouseLeave={() => onHover(null)}
        />
      ))}

      <rect x={CX - 17} y={216} width={34} height={26} rx={9} className={isSel('lower_back')} onClick={() => onSelect('lower_back')} onMouseEnter={() => onHover('lower_back')} onMouseLeave={() => onHover(null)} />

      <path
        d={`M ${X(-1, hipHalf - 2)} 240 Q ${CX} 224 ${X(1, hipHalf - 2)} 240
            C ${X(1, hipHalf - 4)} 268 ${X(1, hipHalf - 14)} 290 ${CX} 296
            C ${X(-1, hipHalf - 14)} 290 ${X(-1, hipHalf - 4)} 268 ${X(-1, hipHalf - 2)} 240 Z`}
        className={isSel('glutes')}
        onClick={() => onSelect('glutes')} onMouseEnter={() => onHover('glutes')} onMouseLeave={() => onHover(null)}
      />

      {[-1, 1].map((s) => <Region key={`tr${s}`} d={tricepPath(s, dims)} muscle="triceps" active={active} onSelect={onSelect} onHover={onHover} />)}
      {[-1, 1].map((s) => <Region key={`fa${s}`} d={forearmPath(s, dims)} muscle="forearms" active={active} onSelect={onSelect} onHover={onHover} />)}
      {[-1, 1].map((s) => <Region key={`ha${s}`} d={hamstringPath(s, dims)} muscle="hamstrings" active={active} onSelect={onSelect} onHover={onHover} />)}
      {[-1, 1].map((s) => <Region key={`ca${s}`} d={calfPath(s, dims)} muscle="calves" active={active} onSelect={onSelect} onHover={onHover} />)}

      {/* definition lines */}
      <DefLines d={`M ${CX} 232 C ${CX} 252 ${CX} 270 ${CX} 288`} opacity={0.14} />
      <DefLines d={`M ${CX} 84 C ${CX} 106 ${CX} 124 ${CX} 144`} opacity={0.14} />
      {[-1, 1].map((s) => (
        <DefLines key={`tridef${s}`} d={`M ${X(s, shoulderHalf - 14)} 140 C ${X(s, shoulderHalf + dims.armW - 20)} 148 ${X(s, shoulderHalf + dims.armW - 20)} 158 ${X(s, shoulderHalf - 12)} 168`} />
      ))}
      {[-1, 1].map((s) => (
        <DefLines key={`hadef${s}`} d={`M ${X(s, 16)} 300 C ${X(s, dims.thighW - 8)} 320 ${X(s, dims.thighW - 10)} 340 ${X(s, 16)} 360`} opacity={0.12} />
      ))}
      {[-1, 1].map((s) => (
        <DefLines key={`cadef${s}`} d={`M ${X(s, dims.calfW - 4)} 392 C ${X(s, dims.calfW + 2)} 414 ${X(s, dims.calfW)} 436 ${X(s, dims.calfW - 6)} 458`} opacity={0.12} />
      ))}

      <Feet />
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
      <svg viewBox={VIEW_BOX} className="w-full max-w-[300px] select-none" role="img" aria-label={`${gender} body, ${view} view`}>
        {view === 'front' ? (
          <FrontBody dims={dims} active={active} onSelect={onSelect} onHover={setHovered} />
        ) : (
          <BackBody dims={dims} active={active} onSelect={onSelect} onHover={setHovered} />
        )}
      </svg>
      <div className="h-6 text-sm font-medium text-[var(--color-clay)] tracking-wide">
        {label ?? ' '}
      </div>
    </div>
  )
}
