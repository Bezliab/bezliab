import { useRef } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import './BrowserMock.css'

/**
 * The developer hero visual — a floating browser window showing a small
 * product surface, drifting slowly as the page scrolls.
 *
 * Deliberately restrained (spec §15): no 3D, no parallax layers, no spinning.
 * The copy beside it is the focus; this is texture.
 *
 * On the chart inside: the three headline numbers are a KPI row of stat tiles,
 * not a bar chart — a handful of current values is not a comparison. The one
 * plotted series is a trend over time, so it's a single-series area chart:
 * one hue, no legend (the caption names it), hairline recessive gridlines,
 * a 2px line and a single labelled endpoint rather than a value on every point.
 * There is no tooltip layer because there is no real data to inspect — the
 * whole mock is decorative and hidden from assistive tech.
 */

/* ---------- the plotted series (invented; this is a mock) ---------- */
const SERIES = [28, 31, 30, 36, 34, 41, 39, 46, 49, 47, 53, 57]
const DOMAIN_MAX = 60
const TICKS = [60, 40, 20]

/* plot geometry, in viewBox units */
const VIEW = { w: 340, h: 100 }
const PLOT = { left: 26, right: 300, top: 18, bottom: 88 }

const stepX = (PLOT.right - PLOT.left) / (SERIES.length - 1)
const toX = (i) => PLOT.left + i * stepX
const toY = (v) => PLOT.bottom - (v / DOMAIN_MAX) * (PLOT.bottom - PLOT.top)

const points = SERIES.map((v, i) => [toX(i), toY(v)])
const linePath = points.map(([x, y], i) => `${i ? 'L' : 'M'}${x} ${y}`).join(' ')
const areaPath = `${linePath} L${PLOT.right} ${PLOT.bottom} L${PLOT.left} ${PLOT.bottom} Z`
const last = points[points.length - 1]

const STATS = [
  { label: 'Revenue', value: '$48.2K', delta: '12.4%' },
  { label: 'Users', value: '12.9K', delta: '8.1%' },
  { label: 'Orders', value: '1,284', delta: '3.6%' },
]

export function BrowserMock() {
  const reduceMotion = useReducedMotion()
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const drift = useSpring(useTransform(scrollYProgress, [0, 1], [34, -46]), {
    stiffness: 60,
    damping: 20,
    restDelta: 0.4,
  })

  return (
    <div className="browser-mock" ref={ref} aria-hidden="true">
      <motion.div
        className="browser-mock__drift"
        style={reduceMotion ? undefined : { y: drift }}
      >
        <div className={`browser-mock__window${reduceMotion ? '' : ' is-floating'}`}>
          {/* ---------- chrome ---------- */}
          <div className="browser-mock__chrome">
            <span className="browser-mock__dots">
              <i />
              <i />
              <i />
            </span>
            <span className="browser-mock__url">bezliab.dev/dashboard</span>
          </div>

          {/* ---------- surface ---------- */}
          <div className="browser-mock__surface">
            <div className="browser-mock__head">
              <span className="browser-mock__title">Overview</span>
              <span className="browser-mock__range">Last 12 weeks</span>
            </div>

            <div className="browser-mock__stats">
              {STATS.map((stat) => (
                <div className="mock-stat" key={stat.label}>
                  <span className="mock-stat__label">{stat.label}</span>
                  <span className="mock-stat__value">{stat.value}</span>
                  <span className="mock-stat__delta">
                    <ArrowUpRight size={11} strokeWidth={2.5} />
                    {stat.delta}
                  </span>
                </div>
              ))}
            </div>

            <div className="browser-mock__chart">
              <div className="browser-mock__chart-head">
                <span className="browser-mock__chart-title">Revenue</span>
                <span className="browser-mock__chart-note">$000</span>
              </div>

              <svg
                className="mock-chart"
                viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
                role="presentation"
                focusable="false"
              >
                {/* gridlines + ticks — hairline, one step off the surface */}
                {TICKS.map((t) => (
                  <g key={t}>
                    <line
                      className="mock-chart__grid"
                      x1={PLOT.left}
                      x2={PLOT.right}
                      y1={toY(t)}
                      y2={toY(t)}
                    />
                    <text
                      className="mock-chart__tick"
                      x={PLOT.left - 8}
                      y={toY(t)}
                      textAnchor="end"
                      dominantBaseline="middle"
                    >
                      {t}
                    </text>
                  </g>
                ))}

                {/* the series: a wash, then a 2px line */}
                <path className="mock-chart__area" d={areaPath} />
                <path className="mock-chart__line" d={linePath} />

                {/* one endpoint, labelled once */}
                <circle
                  className="mock-chart__dot"
                  cx={last[0]}
                  cy={last[1]}
                  r={4}
                />
                <text
                  className="mock-chart__value"
                  x={last[0]}
                  y={last[1] - 11}
                  textAnchor="middle"
                >
                  57.4
                </text>
              </svg>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default BrowserMock
