export const MOTION_TOKENS = {
  spring: {
    snappy: { type: "spring", stiffness: 420, damping: 28, mass: 0.6 },
    spatial: { type: "spring", stiffness: 280, damping: 24, mass: 0.8 },
    smooth: { type: "spring", stiffness: 200, damping: 22, mass: 1.0 },
    magnetic: { type: "spring", stiffness: 350, damping: 24, mass: 0.8 },
  },
  ease: {
    cinematic: [0.16, 1, 0.3, 1] as const,
    editorial: [0.25, 1, 0.5, 1] as const,
    sharp: [0.4, 0, 0.2, 1] as const,
  },
  duration: {
    reveal: 0.85,
    transition: 0.65,
    micro: 0.22,
  },
  tilt: {
    maxDegrees: 3.5,
  },
};

export const MASKED_REVEAL_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

export const MASKED_REVEAL_ITEM = {
  hidden: { y: "110%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};
