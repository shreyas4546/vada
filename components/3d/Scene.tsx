import React, { Suspense, useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, ContactShadows, Sparkles } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { Pillars } from './Pillars';
import { Coins } from './Coins';
import { PortalRing } from './PortalRing';

// Fix for JSX element type errors in strict environments
declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      ambientLight: any;
      pointLight: any;
    }
  }
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        group: any;
        ambientLight: any;
        pointLight: any;
      }
    }
  }
}

interface SceneProps {
  mouseX: number;
  mouseY: number;
}

// Handle smooth camera zoom based on scroll wheel
const ZoomHandler: React.FC = () => {
  const { camera } = useThree();
  // Initial target matches the camera's starting Z position
  const targetZ = useRef(14); // Started further back to fit the offset view

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const sensitivity = 0.01;
      const newZ = targetZ.current + (e.deltaY * sensitivity);
      // Clamp constraints adjusted for the new camera angle
      targetZ.current = THREE.MathUtils.clamp(newZ, 10, 20);
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  useFrame((state, delta) => {
    state.camera.position.z = THREE.MathUtils.damp(
      state.camera.position.z,
      targetZ.current,
      2.5,
      delta
    );
  });

  return null;
};

// Component to smoothly scale in children elements
const ScaleIn: React.FC<{ children: React.ReactNode; delay?: number; duration?: number }> = ({ 
  children, 
  delay = 0, 
  duration = 1.0 
}) => {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (group.current) {
      const t = state.clock.getElapsedTime();
      
      if (t < delay) {
        group.current.scale.setScalar(0);
        return;
      }
      
      // Calculate progress (0 to 1)
      const progress = Math.min((t - delay) / duration, 1);
      
      // Easing function (Cubic Out)
      const ease = 1 - Math.pow(1 - progress, 3);
      
      group.current.scale.setScalar(ease);
    }
  });

  return <group ref={group} scale={0}>{children}</group>;
};

// Camera rig component to handle subtle mouse parallax
const CameraRig: React.FC<SceneProps> = ({ mouseX, mouseY }) => {
  return (
    <group rotation={[mouseY * 0.05, mouseX * 0.05, 0]}>
       <Pillars />
       <Coins />
       
       {/* Portal floating above the highest pillar (which is at x:4.6, y:3.5, z:0) */}
       {/* Placing it slightly higher and behind to act as a destination "Sun" */}
       <ScaleIn delay={0.5} duration={1.5}>
         <group position={[4.6, 6.5, -2]} rotation={[0, -0.4, 0]} scale={1.5}>
           <PortalRing />
         </group>
       </ScaleIn>
    </group>
  )
}

export const Scene: React.FC<SceneProps> = ({ mouseX, mouseY }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="absolute inset-0 z-0 h-screen w-full"
    >
      {/* 
        Camera Config:
        - position: [-6, 2, 14] -> Left-offset camera looking right
      */}
      <Canvas camera={{ position: [-6, 2, 14], fov: 45, rotation: [0, 0, 0] }}>
        <Suspense fallback={null}>
          <ZoomHandler />
          
          {/* Lighting - Darker ambient for high contrast */}
          <ambientLight intensity={0.2} />
          
          {/* Main Key Light (Cyan) - From bottom left relative to objects */}
          <pointLight position={[-5, -5, 5]} intensity={2} color="#22d3ee" distance={20} />
          
          {/* Rim Light (Violet) - From top right back */}
          <pointLight position={[10, 10, -5]} intensity={2.5} color="#c084fc" distance={30} />
          
          {/* Top Fill - subtle white */}
          <pointLight position={[0, 10, 5]} intensity={0.5} color="#ffffff" />
          
          <CameraRig mouseX={mouseX} mouseY={mouseY} />
          
          {/* Atmospheric Sparkles */}
          <Sparkles 
            count={80} 
            scale={[20, 20, 20]} 
            size={4} 
            speed={0.4} 
            opacity={0.5} 
            color="#e2e8f0" 
          />

          {/* Contact Shadows to ground the pillars */}
          <ContactShadows 
            opacity={0.4} 
            scale={40} 
            blur={2.5} 
            far={10} 
            resolution={256} 
            color="#000000" 
            position={[0, -10, 0]} // Positioned well below visible area to simulate deep floor
          />
          
          {/* Studio Environment - dark city reflections */}
          <Environment preset="city" environmentIntensity={0.5} />
        </Suspense>
      </Canvas>
      
      {/* Gradient Overlay - Left side darker to ensure text legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950 pointer-events-none" />
    </motion.div>
  );
};