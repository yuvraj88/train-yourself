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
    ? { neckHalf: 22, shoulderHalf: 100, chestHalf: 76, waistHalf: 45, hipHalf: 58, armW: 36, forearmW: 25, thighW: 47, calfW: 29 }
    : { neckHalf: 17, shoulderHalf: 70, chestHalf: 55, waistHalf: 35, hipHalf: 65, armW: 23, forearmW: 18, thighW: 41, calfW: 21 }
}

const CX = 210
const VIEW_BOX = '0 0 420 900'

interface RegionProps {
  dims: Dims
  active: MuscleId | null
  onSelect: (m: MuscleId) => void
  onHover: (m: MuscleId | null) => void
}

/** Mirrors a distance from the centerline; s is -1 (viewer-left) or 1 (viewer-right) */
function X(s: number, offset: number) {
  return CX + s * offset
}

function Head() {
  return (
    <>
      <ellipse cx={CX} cy={62} rx={46} ry={52} className="body-outline" />
      <path d={`M ${CX - 24} 104 C ${CX - 23} 124 ${CX - 21} 140 ${CX - 19} 152 L ${CX + 19} 152 C ${CX + 21} 140 ${CX + 23} 124 ${CX + 24} 104 Z`} className="body-outline" />
    </>
  )
}

function JointDot({ cx, cy, r = 7 }: { cx: number; cy: number; r?: number }) {
  return (
    <g pointerEvents="none">
      <circle cx={cx} cy={cy} r={r * 2.4} fill="url(#jointGlow)" opacity={0.55} />
      <circle cx={cx} cy={cy} r={r * 0.4} fill="var(--color-ink)" opacity={0.28} />
    </g>
  )
}

function DefLines({ d, opacity = 0.32 }: { d: string; opacity?: number }) {
  return <path d={d} fill="none" stroke="#1f2328" strokeOpacity={opacity} strokeWidth={1.4} strokeLinecap="round" pointerEvents="none" />
}

function torsoOutline(dims: Dims) {
  const { shoulderHalf, chestHalf, waistHalf, hipHalf } = dims
  return `M ${X(-1, shoulderHalf)} 158
    C ${X(-1, shoulderHalf - 10)} 202 ${X(-1, chestHalf + 12)} 222 ${X(-1, chestHalf - 4)} 260
    C ${X(-1, waistHalf + 20)} 292 ${X(-1, waistHalf - 6)} 312 ${X(-1, waistHalf + 2)} 336
    C ${X(-1, hipHalf + 12)} 352 ${X(-1, hipHalf)} 362 ${X(-1, hipHalf - 4)} 374
    L ${X(1, hipHalf - 4)} 374
    C ${X(1, hipHalf)} 362 ${X(1, hipHalf + 12)} 352 ${X(1, waistHalf + 2)} 336
    C ${X(1, waistHalf - 6)} 312 ${X(1, waistHalf + 20)} 292 ${X(1, chestHalf - 4)} 260
    C ${X(1, chestHalf + 12)} 222 ${X(1, shoulderHalf - 10)} 202 ${X(1, shoulderHalf)} 158
    Z`
}

function pecPath(s: number, dims: Dims) {
  const { shoulderHalf, chestHalf } = dims
  return `M ${X(s, 8)} 168
    C ${X(s, 16)} 148 ${X(s, chestHalf - 26)} 140 ${X(s, shoulderHalf - 32)} 164
    C ${X(s, shoulderHalf - 20)} 188 ${X(s, chestHalf + 2)} 214 ${X(s, chestHalf - 10)} 248
    C ${X(s, chestHalf - 24)} 272 ${X(s, 42)} 276 ${X(s, 20)} 258
    C ${X(s, 9)} 238 ${X(s, 5)} 198 ${X(s, 8)} 168
    Z`
}

function deltoidPath(s: number, dims: Dims) {
  const { shoulderHalf } = dims
  return `M ${X(s, shoulderHalf - 58)} 146
    C ${X(s, shoulderHalf - 26)} 124 ${X(s, shoulderHalf + 24)} 146 ${X(s, shoulderHalf + 15)} 186
    C ${X(s, shoulderHalf + 4)} 216 ${X(s, shoulderHalf - 42)} 220 ${X(s, shoulderHalf - 60)} 194
    C ${X(s, shoulderHalf - 70)} 178 ${X(s, shoulderHalf - 70)} 160 ${X(s, shoulderHalf - 58)} 146
    Z`
}

function bicepPath(s: number, dims: Dims) {
  const { shoulderHalf, armW } = dims
  return `M ${X(s, shoulderHalf - 40)} 192
    C ${X(s, shoulderHalf + armW - 34)} 202 ${X(s, shoulderHalf + armW - 30)} 232 ${X(s, shoulderHalf + armW - 34)} 258
    C ${X(s, shoulderHalf + armW - 40)} 292 ${X(s, shoulderHalf - 10)} 318 ${X(s, shoulderHalf - 22)} 328
    C ${X(s, shoulderHalf - 40)} 296 ${X(s, shoulderHalf - 48)} 246 ${X(s, shoulderHalf - 46)} 200
    C ${X(s, shoulderHalf - 44)} 195 ${X(s, shoulderHalf - 42)} 192 ${X(s, shoulderHalf - 40)} 192
    Z`
}

function tricepPath(s: number, dims: Dims) {
  const { shoulderHalf, armW } = dims
  return `M ${X(s, shoulderHalf - 40)} 192
    C ${X(s, shoulderHalf + armW - 32)} 204 ${X(s, shoulderHalf + armW - 28)} 234 ${X(s, shoulderHalf + armW - 32)} 256
    C ${X(s, shoulderHalf + armW - 38)} 290 ${X(s, shoulderHalf - 12)} 316 ${X(s, shoulderHalf - 22)} 326
    C ${X(s, shoulderHalf - 40)} 294 ${X(s, shoulderHalf - 48)} 244 ${X(s, shoulderHalf - 46)} 200
    C ${X(s, shoulderHalf - 44)} 195 ${X(s, shoulderHalf - 42)} 192 ${X(s, shoulderHalf - 40)} 192
    Z`
}

function forearmPath(s: number, dims: Dims) {
  const { shoulderHalf, forearmW } = dims
  const base = shoulderHalf - 22
  const bulge = base + forearmW * 0.4
  const wrist = base - forearmW * 1.3
  const innerMid = base - forearmW * 0.6
  return `M ${X(s, base)} 328
    C ${X(s, bulge)} 342 ${X(s, bulge - 2)} 366 ${X(s, innerMid + forearmW * 0.5)} 394
    C ${X(s, innerMid)} 428 ${X(s, wrist + 10)} 464 ${X(s, wrist)} 486
    C ${X(s, wrist - 6)} 458 ${X(s, wrist + 2)} 418 ${X(s, innerMid - 4)} 386
    C ${X(s, base - 8)} 358 ${X(s, base - 2)} 336 ${X(s, base)} 328
    Z`
}

function quadPath(s: number, dims: Dims) {
  const { thighW } = dims
  return `M ${X(s, 6)} 380
    C ${X(s, thighW - 2)} 388 ${X(s, thighW + 18)} 466 ${X(s, thighW + 4)} 542
    C ${X(s, thighW - 6)} 590 ${X(s, thighW - 22)} 610 ${X(s, 16)} 616
    C ${X(s, 8)} 546 ${X(s, 5)} 462 ${X(s, 6)} 380
    Z`
}

function hamstringPath(s: number, dims: Dims) {
  const { thighW } = dims
  return `M ${X(s, 8)} 388
    C ${X(s, thighW - 4)} 396 ${X(s, thighW + 6)} 468 ${X(s, thighW - 2)} 536
    C ${X(s, thighW - 14)} 584 ${X(s, thighW - 28)} 606 ${X(s, 14)} 614
    C ${X(s, 8)} 548 ${X(s, 6)} 462 ${X(s, 8)} 388
    Z`
}

function calfPath(s: number, dims: Dims) {
  const { calfW } = dims
  return `M ${X(s, 10)} 638
    C ${X(s, calfW + 16)} 646 ${X(s, calfW + 28)} 692 ${X(s, calfW + 6)} 742
    C ${X(s, calfW - 8)} 778 ${X(s, 10)} 802 ${X(s, 15)} 798
    C ${X(s, 6)} 746 ${X(s, 4)} 690 ${X(s, 10)} 638
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
      <path d={`M ${CX - 34} 812 C ${CX - 40} 828 ${CX - 40} 842 ${CX - 30} 848 L ${CX - 2} 848 C ${CX - 2} 848 ${CX - 4} 818 ${CX - 12} 810 Z`} className="body-outline" />
      <path d={`M ${CX + 34} 812 C ${CX + 40} 828 ${CX + 40} 842 ${CX + 30} 848 L ${CX + 2} 848 C ${CX + 2} 848 ${CX + 4} 818 ${CX + 12} 810 Z`} className="body-outline" />
    </>
  )
}

function FrontBody({ dims, active, onSelect, onHover }: RegionProps) {
  const isSel = (id: MuscleId) => (active === id ? 'muscle-path is-active' : 'muscle-path')
  const { neckHalf, shoulderHalf, waistHalf, armW, calfW, thighW } = dims

  const abCols = [-1, 1]
  const abRows = [0, 1, 2]
  const abColW = 28
  const abGap = 8
  const abRowH = 32
  const abRowGap = 7
  const abTop = 278

  return (
    <g>
      <Head />

      <path
        d={`M ${CX - neckHalf} 118 C ${CX - neckHalf - 2} 132 ${CX - neckHalf} 144 ${CX - neckHalf + 4} 154 L ${CX + neckHalf - 4} 154 C ${CX + neckHalf} 144 ${CX + neckHalf + 2} 132 ${CX + neckHalf} 118 Z`}
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
            rx={9}
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
          d={`M ${X(s, waistHalf - 2)} 276 C ${X(s, waistHalf + 8)} 306 ${X(s, waistHalf - 2)} 328 ${X(s, 40)} 350 L ${X(s, 34)} 282 Z`}
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
      <DefLines d={`M ${CX} 162 C ${CX} 200 ${CX} 240 ${CX} 278`} />
      {[-1, 1].map((s) => (
        <DefLines key={`deltdef${s}`} d={`M ${X(s, shoulderHalf - 50)} 158 C ${X(s, shoulderHalf - 22)} 168 ${X(s, shoulderHalf)} 182 ${X(s, shoulderHalf + 6)} 198`} />
      ))}
      {[-1, 1].map((s) => (
        <DefLines key={`pecdef1-${s}`} d={`M ${X(s, 10)} 180 C ${X(s, 30)} 190 ${X(s, 50)} 205 ${X(s, 60)} 220`} />
      ))}
      {[-1, 1].map((s) => (
        <DefLines key={`pecdef2-${s}`} d={`M ${X(s, 14)} 212 C ${X(s, 34)} 224 ${X(s, 50)} 238 ${X(s, 58)} 252`} opacity={0.24} />
      ))}
      {[-1, 1].map((s) => (
        <DefLines key={`obldef${s}`} d={`M ${X(s, waistHalf - 4)} 286 C ${X(s, waistHalf + 2)} 306 ${X(s, 32)} 320 ${X(s, 28)} 340`} opacity={0.24} />
      ))}
      {[-1, 1].map((s) => (
        <DefLines key={`bidef${s}`} d={`M ${X(s, shoulderHalf - 22)} 232 C ${X(s, shoulderHalf + armW - 32)} 244 ${X(s, shoulderHalf + armW - 32)} 258 ${X(s, shoulderHalf - 18)} 270`} />
      ))}
      {[-1, 1].map((s) => (
        <DefLines key={`qudef${s}`} d={`M ${X(s, 22)} 420 C ${X(s, thighW - 10)} 470 ${X(s, thighW - 16)} 520 ${X(s, 24)} 588`} opacity={0.22} />
      ))}
      {[-1, 1].map((s) => (
        <DefLines key={`qudef2-${s}`} d={`M ${X(s, thighW - 20)} 400 C ${X(s, thighW + 4)} 460 ${X(s, thighW - 4)} 520 ${X(s, thighW - 24)} 580`} opacity={0.16} />
      ))}
      {[-1, 1].map((s) => (
        <DefLines key={`cadef${s}`} d={`M ${X(s, calfW - 4)} 660 C ${X(s, calfW + 4)} 692 ${X(s, calfW)} 724 ${X(s, calfW - 8)} 764`} opacity={0.22} />
      ))}

      <JointDot cx={X(-1, shoulderHalf - 20)} cy={172} />
      <JointDot cx={X(1, shoulderHalf - 20)} cy={172} />
      <JointDot cx={X(-1, shoulderHalf - 40)} cy={330} r={6} />
      <JointDot cx={X(1, shoulderHalf - 40)} cy={330} r={6} />
      <JointDot cx={X(-1, waistHalf + 6)} cy={378} r={6} />
      <JointDot cx={X(1, waistHalf + 6)} cy={378} r={6} />
      <JointDot cx={X(-1, 16)} cy={614} r={6} />
      <JointDot cx={X(1, 16)} cy={614} r={6} />

      <Feet />
    </g>
  )
}

function BackBody({ dims, active, onSelect, onHover }: RegionProps) {
  const isSel = (id: MuscleId) => (active === id ? 'muscle-path is-active' : 'muscle-path')
  const { neckHalf, shoulderHalf, chestHalf, waistHalf, hipHalf, armW, calfW, thighW } = dims

  return (
    <g>
      <Head />

      <path
        d={`M ${CX - neckHalf} 118 C ${CX - neckHalf - 2} 132 ${CX - neckHalf} 144 ${CX - neckHalf + 4} 154 L ${CX + neckHalf - 4} 154 C ${CX + neckHalf} 144 ${CX + neckHalf + 2} 132 ${CX + neckHalf} 118 Z`}
        className={isSel('neck')}
        onClick={() => onSelect('neck')} onMouseEnter={() => onHover('neck')} onMouseLeave={() => onHover(null)}
      />

      <path d={torsoOutline(dims)} className="body-outline" />

      {[-1, 1].map((s) => <Region key={`sh${s}`} d={deltoidPath(s, dims)} muscle="shoulders" active={active} onSelect={onSelect} onHover={onHover} />)}

      <path
        d={`M ${X(-1, shoulderHalf - 34)} 156 Q ${CX} 130 ${X(1, shoulderHalf - 34)} 156
            C ${X(1, 30)} 190 ${X(1, 16)} 224 ${CX} 236
            C ${X(-1, 16)} 224 ${X(-1, 30)} 190 ${X(-1, shoulderHalf - 34)} 156 Z`}
        className={isSel('traps')}
        onClick={() => onSelect('traps')} onMouseEnter={() => onHover('traps')} onMouseLeave={() => onHover(null)}
      />

      {[-1, 1].map((s) => (
        <path
          key={`lat${s}`}
          d={`M ${X(s, chestHalf - 16)} 226
              C ${X(s, chestHalf + 2)} 256 ${X(s, chestHalf - 6)} 296 ${X(s, waistHalf + 10)} 332
              C ${X(s, waistHalf - 10)} 324 ${X(s, 18)} 304 ${X(s, 16)} 268
              C ${X(s, 15)} 246 ${X(s, 20)} 234 ${X(s, chestHalf - 16)} 226 Z`}
          className={isSel('back')}
          onClick={() => onSelect('back')} onMouseEnter={() => onHover('back')} onMouseLeave={() => onHover(null)}
        />
      ))}

      <path
        d={`M ${CX - 24} 336 C ${CX - 26} 350 ${CX - 24} 364 ${CX - 18} 374 L ${CX + 18} 374 C ${CX + 24} 364 ${CX + 26} 350 ${CX + 24} 336 Z`}
        className={isSel('lower_back')}
        onClick={() => onSelect('lower_back')} onMouseEnter={() => onHover('lower_back')} onMouseLeave={() => onHover(null)}
      />

      <path
        d={`M ${X(-1, hipHalf - 4)} 374 Q ${CX} 350 ${X(1, hipHalf - 4)} 374
            C ${X(1, hipHalf - 6)} 412 ${X(1, hipHalf - 20)} 442 ${CX} 452
            C ${X(-1, hipHalf - 20)} 442 ${X(-1, hipHalf - 6)} 412 ${X(-1, hipHalf - 4)} 374 Z`}
        className={isSel('glutes')}
        onClick={() => onSelect('glutes')} onMouseEnter={() => onHover('glutes')} onMouseLeave={() => onHover(null)}
      />

      {[-1, 1].map((s) => <Region key={`tr${s}`} d={tricepPath(s, dims)} muscle="triceps" active={active} onSelect={onSelect} onHover={onHover} />)}
      {[-1, 1].map((s) => <Region key={`fa${s}`} d={forearmPath(s, dims)} muscle="forearms" active={active} onSelect={onSelect} onHover={onHover} />)}
      {[-1, 1].map((s) => <Region key={`ha${s}`} d={hamstringPath(s, dims)} muscle="hamstrings" active={active} onSelect={onSelect} onHover={onHover} />)}
      {[-1, 1].map((s) => <Region key={`ca${s}`} d={calfPath(s, dims)} muscle="calves" active={active} onSelect={onSelect} onHover={onHover} />)}

      {/* definition lines */}
      <DefLines d={`M ${CX} 380 C ${CX} 404 ${CX} 424 ${CX} 448`} opacity={0.24} />
      <DefLines d={`M ${CX} 140 C ${CX} 168 ${CX} 190 ${CX} 232`} opacity={0.24} />
      {[-1, 1].map((s) => (
        <DefLines key={`deltdef${s}`} d={`M ${X(s, shoulderHalf - 50)} 158 C ${X(s, shoulderHalf - 22)} 168 ${X(s, shoulderHalf)} 182 ${X(s, shoulderHalf + 6)} 198`} />
      ))}
      {[-1, 1].map((s) => (
        <DefLines key={`trapdef${s}`} d={`M ${X(s, shoulderHalf - 40)} 168 C ${X(s, 30)} 190 ${X(s, 20)} 210 ${X(s, 10)} 228`} opacity={0.24} />
      ))}
      {[-1, 1].map((s) => (
        <DefLines key={`latdef1-${s}`} d={`M ${X(s, chestHalf - 20)} 236 C ${X(s, chestHalf - 10)} 264 ${X(s, waistHalf + 20)} 296 ${X(s, waistHalf + 6)} 322`} />
      ))}
      {[-1, 1].map((s) => (
        <DefLines key={`latdef2-${s}`} d={`M ${X(s, 22)} 250 C ${X(s, 18)} 276 ${X(s, 20)} 300 ${X(s, 26)} 318`} opacity={0.2} />
      ))}
      {[-1, 1].map((s) => (
        <DefLines key={`tridef${s}`} d={`M ${X(s, shoulderHalf - 22)} 232 C ${X(s, shoulderHalf + armW - 32)} 244 ${X(s, shoulderHalf + armW - 32)} 258 ${X(s, shoulderHalf - 18)} 270`} />
      ))}
      {[-1, 1].map((s) => (
        <DefLines key={`glutdef${s}`} d={`M ${X(s, hipHalf - 14)} 386 C ${X(s, hipHalf - 20)} 408 ${X(s, 20)} 428 ${X(s, 14)} 444`} opacity={0.2} />
      ))}
      {[-1, 1].map((s) => (
        <DefLines key={`hadef${s}`} d={`M ${X(s, 24)} 460 C ${X(s, thighW - 10)} 490 ${X(s, thighW - 16)} 520 ${X(s, 24)} 580`} opacity={0.22} />
      ))}
      {[-1, 1].map((s) => (
        <DefLines key={`cadef${s}`} d={`M ${X(s, calfW - 4)} 664 C ${X(s, calfW + 4)} 696 ${X(s, calfW)} 728 ${X(s, calfW - 8)} 768`} opacity={0.22} />
      ))}

      <JointDot cx={X(-1, shoulderHalf - 20)} cy={172} />
      <JointDot cx={X(1, shoulderHalf - 20)} cy={172} />
      <JointDot cx={X(-1, shoulderHalf - 40)} cy={330} r={6} />
      <JointDot cx={X(1, shoulderHalf - 40)} cy={330} r={6} />
      <JointDot cx={X(-1, hipHalf - 24)} cy={382} r={6} />
      <JointDot cx={X(1, hipHalf - 24)} cy={382} r={6} />
      <JointDot cx={X(-1, 16)} cy={612} r={6} />
      <JointDot cx={X(1, 16)} cy={612} r={6} />

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
      <svg viewBox={VIEW_BOX} className="w-full max-w-[320px] select-none" role="img" aria-label={`${gender} body, ${view} view`}>
        <defs>
          <radialGradient id="jointGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-clay)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="var(--color-clay)" stopOpacity="0" />
          </radialGradient>
        </defs>
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
