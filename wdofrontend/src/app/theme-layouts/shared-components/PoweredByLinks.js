import { motion } from 'framer-motion';

function PoweredByLinks() {
  const container = {
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, scale: 0.6 },
    show: { opacity: 1, scale: 1 },
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="flex items-center">
    </motion.div>
  );
}

export default PoweredByLinks;
