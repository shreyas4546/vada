import React, { Suspense, useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';
import { Pillars } from './Pillars';
import { Coins } from './Coins';

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

// Camera rig component to handle subtle mouse parallax
const CameraRig: React.FC<SceneProps> = ({ mouseX, mouseY }) => {
  return (
    <group rotation={[mouseY * 0.05, mouseX * 0.05, 0]}> {/* Reduced rotation intensity for stability */}
       <Pillars />
       <Coins />
    </group>
  )
}

export const Scene: React.FC<SceneProps> = ({ mouseX, mouseY }) => {
  return (
    <div className="absolute inset-0 z-0 h-screen w-full">
      {/* 
        Camera Config:
        - position: [-6, 2, 14] 
          - X = -6: Shifts the camera LEFT, which pushes the scene (at x=0) to the RIGHT side of the viewport.
          - Y = 2: Slight elevation to look down at the steps.
          - Z = 14: Zoomed out enough to see the progression.
        - fov: 45 -> Slightly narrower for a more orthographic/studio feel.
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
          
          {/* Studio Environment - dark city reflections */}
          <Environment preset="city" environmentIntensity={0.5} />
        </Suspense>
      </Canvas>
      
      {/* Gradient Overlay - Left side darker to ensure text legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950 pointer-events-none" />
    </div>
  );
};