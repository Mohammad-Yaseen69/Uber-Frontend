import { motion } from 'framer-motion';

const SmileyFace = ({ input, currentInput, isCorrect, verification }) => {
  const offset = currentInput * 3.8;

  const mouthStart = 37 + offset;
  const mouthEnd = 47 + offset;
  const mouthControl = verification
    ? isCorrect
      ? 70
      : 60
    : 65;

  const mouthPath = `M${mouthStart} 65 Q ${50 + offset} ${mouthControl}, ${mouthEnd} 65`;

  return (
    <div className="flex justify-center items-center">
      <motion.svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        animate={{
          rotateY: -12 + (currentInput * 2), // Adjusted initial rotation to look more to the left
          skewX: 4 - (currentInput * 4),
          transition: { duration: 0.5, ease: "easeInOut" }
        }}
        style={{
          transform: `scaleX(1) scaleY(1) scaleZ(1) rotateX(-13deg) rotateZ(0deg) translateX(-10px) translateY(0px) translateZ(0px)`, // Adjusted face position to the left
          perspective: "998px",
          perspectiveOrigin: "50% 50%",
        }}
      >
        <rect x="22" y="3" width="75" height="75" rx="15" ry="15" fill="black" />
        <motion.circle
          cx={33 + offset} // Adjusted initial eye position to look more to the left
          cy="50"
          r="8"
          fill="white"
          animate={{
            cx: 33 + offset,
            transition: { duration: 0.5, ease: "easeInOut" },
          }}
        />
        <motion.circle
          cx={31 + offset * 1.4} // Adjusted initial eye position to look more to the left
          cy="53"
          r="2"
          fill="black"
          animate={{
            cx: 31 + offset * 1.4,
            transition: { duration: 0.5, ease: "easeInOut" },
          }}
        />
        <motion.circle
          cx={53 + offset} // Adjusted initial eye position to look more to the left
          cy="50"
          r="8"
          fill="white"
          animate={{
            cx: 53 + offset,
            transition: { duration: 0.5, ease: "easeInOut" },
          }}
        />
        <motion.circle
          cx={51 + offset * 1.4} // Adjusted initial eye position to look more to the left
          cy="53"
          r="2"
          fill="black"
          animate={{
            cx: 51 + offset * 1.4,
            transition: { duration: 0.5, ease: "easeInOut" },
          }}
        />
        <motion.line
          x1={29 + offset} // Adjusted initial eyebrow position to look more to the left
          y1="38"
          x2={37 + offset} // Adjusted initial eyebrow position to look more to the left
          y2="38"
          stroke="#363336"
          strokeWidth="2"
          strokeLinecap="round"
          animate={{
            x1: 29 + offset,
            x2: 37 + offset,
            transition: { duration: 0.5, ease: "easeInOut" },
          }}
        />
        <motion.line
          x1={49 + offset} // Adjusted initial eyebrow position to look more to the left
          y1="38"
          x2={57 + offset} // Adjusted initial eyebrow position to look more to the left
          y2="38"
          stroke="#363336"
          strokeWidth="2"
          strokeLinecap="round"
          animate={{
            x1: 49 + offset,
            x2: 57 + offset,
            transition: { duration: 0.5, ease: "easeInOut" },
          }}
        />
        
        <motion.path
          d={mouthPath}
          fill="transparent"
          stroke="white"
          strokeWidth="2"
          animate={{
            d: mouthPath,
            transition: {
              type: "keyframes",
              values: [
                `M${mouthStart} 65 Q ${50 + offset} 65, ${mouthEnd} 65`,
                `M${mouthStart} 65 Q ${50 + offset} 70, ${mouthEnd} 65`,
                `M${mouthStart} 65 Q ${50 + offset} 60, ${mouthEnd} 65`,
              ],
              duration: 0.5,
              ease: "easeInOut",
            },
          }}
        />
      </motion.svg>
    </div>
  );
};

export default SmileyFace;