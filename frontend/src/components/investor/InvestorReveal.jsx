import { motion, useReducedMotion } from 'framer-motion';

export const InvestorReveal = ({ children, className = '', delay = 0, testId, as = 'div' }) => {
  const reduced = useReducedMotion();
  const Component = motion[as] || motion.div;

  return (
    <Component
      className={className}
      initial={reduced ? false : { opacity: 0, y: 28 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.72, delay, ease: [0.16, 1, 0.3, 1] }}
      data-testid={testId}
    >
      {children}
    </Component>
  );
};