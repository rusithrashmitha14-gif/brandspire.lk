'use client';
import { useState, useRef, MouseEvent } from 'react';
import { motion, useSpring } from 'framer-motion';
import styles from './HoverCursor.module.css';

export default function HoverCursor({ children }: { children: React.ReactNode }) {
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Framer motion springs for smooth following
  const mouseX = useSpring(0, { stiffness: 500, damping: 28 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 28 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if(!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <div 
      className={styles.container} 
      ref={containerRef}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
    >
      {children}
      
      <motion.div 
        className={styles.cursor}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ 
          opacity: isHovering ? 1 : 0, 
          scale: isHovering ? 1 : 0.5 
        }}
        transition={{ duration: 0.2 }}
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%'
        }}
      >
        VIEW
      </motion.div>
    </div>
  );
}
