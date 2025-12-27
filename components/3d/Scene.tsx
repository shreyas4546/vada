import React, { Suspense, useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';
import { PortalRing } from './PortalRing';

// Fix for JSX element type errors in strict environments
// Augmenting both global JSX and React.JSX to ensure compatibility
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
  const targetZ = useRef(9);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Adjust zoom target based on scroll direction
      // Sensitivity factor for scroll to zoom mapping
      const sensitivity = 0.005;
      
      // Calculate new Z position
      // e.deltaY > 0 (Scroll Down) -> Increases Z (Move Camera Back / Zoom Out)
      // e.deltaY < 0 (Scroll Up) -> Decreases Z (Move Camera Forward / Zoom In)
      // This creates a "receding" effect as you scroll down the page, providing more context.
      const newZ = targetZ.current + (e.deltaY * sensitivity);
      
      // Clamp constraints:
      // Min: 6 (Close up view)
      // Max: 15 (Wide view)
      targetZ.current = THREE.MathUtils.clamp(newZ, 6, 15);
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  useFrame((state, delta) => {
    // Smoothly interpolate camera position using damp
    // This creates a premium, weighted feel to the zoom
    state.camera.position.z = THREE.MathUtils.damp(
      state.camera.position.z,
      targetZ.current,
      2.5, // Damping factor (smoothness)
      delta
    );
  });

  return null;
};

// Camera rig component to handle subtle mouse parallax
const CameraRig: React.FC<SceneProps> = ({ mouseX, mouseY }) => {
  return (
    <group rotation={[mouseY * 0.1, mouseX * 0.1, 0]}>
       <PortalRing />
    </group>
  )
}

export const Scene: React.FC<SceneProps> = ({ mouseX, mouseY }) => {
  return (
    <div className="absolute inset-0 z-0 h-screen w-full">
      {/* 
        Camera Config:
        - position: [0, -2, 9] -> Initial Hero Setup
        - fov: 55 -> Cinematic Field of View
        - rotation: [0.2, 0, 0] -> Tilted upwards
      */}
      <Canvas camera={{ position: [0, -2, 9], fov: 55, rotation: [0.2, 0, 0] }}>
        <Suspense fallback={null}>
          <ZoomHandler />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#c084fc" />
          <pointLight position={[-10, -10, -10]} intensity={1} color="#22d3ee" />
          
          <CameraRig mouseX={mouseX} mouseY={mouseY} />
          
          {/* Subtle studio environment reflection */}
          <Environment preset="city" />
        </Suspense>
      </Canvas>
      
      {/* Gradient Overlay to blend canvas with background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/20 to-slate-950 pointer-events-none" />
    </div>
  );
};