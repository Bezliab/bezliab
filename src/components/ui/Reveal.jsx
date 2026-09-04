import { motion, useReducedMotion } from 'framer-motion'

/**
 * The one entrance animation used site-wide: fade plus a small rise.
 * `as` keeps the semantics right (section, li, h2 …) without extra wrappers.
 */
export function Reveal({
  children,
  as = 'div',
  delay = 0,
  y = 20,
  amount = 0.25,
  className = '',
  ...rest
}) {
  const reduceMotion = useReducedMotion()
  const Component = motion[as] ?? motion.div

  if (reduceMotion) {
    const Plain = as
    return (
      <Plain className={className} {...rest}>
        {children}
      </Plain>
    )
  }

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{
        duration: 0.62,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      {...rest}
    >
      {children}
    </Component>
  )
}

export default Reveal
