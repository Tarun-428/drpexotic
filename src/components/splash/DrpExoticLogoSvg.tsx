import { useId } from 'react'

const LOGO_SRC = '/branding/drp-exotic-logo.png'

type CropBox = {
  x: number
  y: number
  width: number
  height: number
}

const CROP_BOXES = {
  hero: { x: 575, y: 239, width: 277, height: 295 },
  branch: { x: 567, y: 113, width: 268, height: 116 },
  leafTop: { x: 469, y: 122, width: 94, height: 105 },
  leafBottom: { x: 469, y: 236, width: 81, height: 51 },
  leafRight: { x: 789, y: 397, width: 91, height: 107 },
  tm: { x: 842, y: 314, width: 67, height: 67 },
  d: { x: 153, y: 375, width: 150, height: 232 },
  r: { x: 298, y: 338, width: 152, height: 234 },
  p: { x: 459, y: 328, width: 165, height: 232 },
  exotic: { x: 172, y: 544, width: 637, height: 303 },
  farms: { x: 375, y: 810, width: 262, height: 99 },
} satisfies Record<string, CropBox>

function LogoCrop({
  clipPathId,
  className,
  maskId,
}: {
  clipPathId: string
  className?: string
  maskId?: string
}) {
  return (
    <g className={className} clipPath={`url(#${clipPathId})`} mask={maskId ? `url(#${maskId})` : undefined}>
      <image href={LOGO_SRC} x="0" y="0" width="1015" height="1015" preserveAspectRatio="xMidYMid meet" />
    </g>
  )
}

export function DrpExoticLogoSvg() {
  const id = useId().replace(/:/g, '')

  const clipIds = Object.fromEntries(
    Object.keys(CROP_BOXES).map((key) => [key, `${id}-${key}-clip`]),
  ) as Record<keyof typeof CROP_BOXES, string>

  const exoticMaskId = `${id}-exotic-mask`
  const farmsMaskId = `${id}-farms-mask`

  return (
    <svg
      viewBox="0 0 1015 1015"
      aria-hidden="true"
      className="h-full w-full overflow-visible"
      role="presentation"
    >
      <defs>
        <radialGradient id={`${id}-pulse-gradient`} cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#8ace6f" stopOpacity="0.75" />
          <stop offset="45%" stopColor="#4e9748" stopOpacity="0.26" />
          <stop offset="100%" stopColor="#040905" stopOpacity="0" />
        </radialGradient>

        <filter id={`${id}-soft-shadow`} x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="26" stdDeviation="22" floodColor="#31462d" floodOpacity="0.12" />
          <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#f5f1d8" floodOpacity="0.2" />
        </filter>

        <filter id={`${id}-sun-kiss`} x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="-2" stdDeviation="7" floodColor="#fff9de" floodOpacity="0.3" />
          <feDropShadow dx="0" dy="0" stdDeviation="14" floodColor="#f3ebc2" floodOpacity="0.12" />
        </filter>

        <filter id={`${id}-hero-glow`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="18" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 0.55 0"
          />
        </filter>

        {Object.entries(CROP_BOXES).map(([key, box]) => (
          <clipPath key={key} id={clipIds[key as keyof typeof clipIds]} clipPathUnits="userSpaceOnUse">
            <rect x={box.x} y={box.y} width={box.width} height={box.height} />
          </clipPath>
        ))}

        <mask id={exoticMaskId} maskUnits="userSpaceOnUse">
          <rect x="0" y="0" width="1015" height="1015" fill="black" />
          <rect className="exotic-reveal-mask" x="172" y="847" width="637" height="0" fill="white" />
        </mask>

        <mask id={farmsMaskId} maskUnits="userSpaceOnUse">
          <rect x="0" y="0" width="1015" height="1015" fill="black" />
          <rect className="farms-reveal-mask" x="375" y="909" width="262" height="0" fill="white" />
        </mask>
      </defs>

      <g className="final-pulse" opacity="0">
        <ellipse cx="502" cy="500" rx="325" ry="282" fill={`url(#${id}-pulse-gradient)`} />
      </g>

      <g className="logo-shadow" filter={`url(#${id}-soft-shadow)`}>
        <g className="logo-sunlight" filter={`url(#${id}-sun-kiss)`}>
          <LogoCrop clipPathId={clipIds.hero} />
          <LogoCrop clipPathId={clipIds.branch} />
          <LogoCrop clipPathId={clipIds.leafTop} />
          <LogoCrop clipPathId={clipIds.leafBottom} />
          <LogoCrop clipPathId={clipIds.leafRight} />
          <LogoCrop clipPathId={clipIds.tm} />
          <LogoCrop clipPathId={clipIds.d} />
          <LogoCrop clipPathId={clipIds.r} />
          <LogoCrop clipPathId={clipIds.p} />
          <LogoCrop clipPathId={clipIds.exotic} maskId={exoticMaskId} />
          <LogoCrop clipPathId={clipIds.farms} maskId={farmsMaskId} />
        </g>

        <g className="trace-overlay">
          <path
            className="draw-path"
            d="M578 206C633 171 716 160 822 193"
            fill="none"
            stroke="#6db357"
            strokeLinecap="round"
            strokeWidth="12"
          />
          <path
            className="draw-path"
            d="M510 142C530 170 547 191 553 208"
            fill="none"
            stroke="#84c76a"
            strokeLinecap="round"
            strokeWidth="8"
          />
          <path
            className="draw-path"
            d="M482 264C509 279 531 283 548 279"
            fill="none"
            stroke="#84c76a"
            strokeLinecap="round"
            strokeWidth="7"
          />
          <path
            className="draw-path"
            d="M807 484C824 460 841 437 859 415"
            fill="none"
            stroke="#84c76a"
            strokeLinecap="round"
            strokeWidth="8"
          />
        </g>

        <g className="logo-hero-glow" filter={`url(#${id}-hero-glow)`}>
          <LogoCrop clipPathId={clipIds.hero} />
        </g>

        <LogoCrop clipPathId={clipIds.hero} className="logo-hero" />
        <LogoCrop clipPathId={clipIds.branch} className="logo-branch" />
        <LogoCrop clipPathId={clipIds.leafTop} className="logo-leaf-top" />
        <LogoCrop clipPathId={clipIds.leafBottom} className="logo-leaf-bottom" />
        <LogoCrop clipPathId={clipIds.leafRight} className="logo-leaf-right" />
        <LogoCrop clipPathId={clipIds.tm} className="logo-tm" />

        <LogoCrop clipPathId={clipIds.d} className="drp-letter drp-letter-d" />
        <LogoCrop clipPathId={clipIds.r} className="drp-letter drp-letter-r" />
        <LogoCrop clipPathId={clipIds.p} className="drp-letter drp-letter-p" />

        <LogoCrop clipPathId={clipIds.exotic} className="logo-exotic" maskId={exoticMaskId} />
        <LogoCrop clipPathId={clipIds.farms} className="logo-farms" maskId={farmsMaskId} />
      </g>
    </svg>
  )
}
