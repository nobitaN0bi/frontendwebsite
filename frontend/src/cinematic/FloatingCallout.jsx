import { motion, useTransform } from 'framer-motion';

export const FloatingCallout = ({ progress, reduced, item, index }) => {
  const start = 0.42 + index * 0.07;
  const opacity = useTransform(progress, [start, start + 0.08], [0, 1]);
  const y = useTransform(progress, [start, start + 0.1], [28, 0]);
  const lineScale = useTransform(progress, [start + 0.02, start + 0.13], [0, 1]);

  return (
    <motion.article
      className={`demo-float-callout demo-float-${item.position}`}
      style={{ opacity: reduced ? 1 : opacity, y: reduced ? 0 : y }}
      data-testid={`demo-callout-${item.id}`}
    >
      <span className="demo-callout-index">0{index + 1}</span>
      <div>
        <strong>{item.label}</strong>
        <p>{item.copy}</p>
      </div>
      <motion.i style={{ scaleX: reduced ? 1 : lineScale }} aria-hidden="true" />
    </motion.article>
  );
};