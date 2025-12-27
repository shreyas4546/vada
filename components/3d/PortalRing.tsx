import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float, Stars, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// Fix for JSX element type errors in strict environments
// Augmenting both global JSX and React.JSX to ensure compatibility
declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      mesh: any;
      torusGeometry: any;
      sphereGeometry: any;
      meshBasicMaterial: any;
      meshStandardMaterial: any;
      pointLight: any;
    }
  }
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        group: any;
        mesh: any;
        torusGeometry: any;
        sphereGeometry: any;
        meshBasicMaterial: any;
        meshStandardMaterial: any;
        pointLight: any;
      }
    }
  }
}

export const PortalRing: React.FC = () => {
  const mainRingRef = useRef<THREE.Mesh>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Rotate main liquid ring slowly
    if (mainRingRef.current) {
      mainRingRef.current.rotation.x = t * 0.15;
      mainRingRef.current.rotation.y = t * 0.1;
    }

    // Rotate outer gyroscope ring on complex axes
    if (outerRingRef.current) {
      outerRingRef.current.rotation.x = Math.sin(t * 0.2) * 0.5;
      outerRingRef.current.rotation.y = t * 0.05;
      outerRingRef.current.rotation.z = Math.cos(t * 0.1) * 0.2;
    }
  });

  return (
    <group scale={0.9}>
      <Stars radius={100} depth={50} count={7000} factor={4} saturation={0} fade speed={1} />
      
      {/* Main Liquid Metal Portal Ring */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh ref={mainRingRef}>
          <torusGeometry args={[3.8, 0.7, 128, 128]} />
          <MeshDistortMaterial 
            color="#0f172a" // slate-900
            emissive="#312e81" // indigo-900
            emissiveIntensity={0.8}
            roughness={0.1}
            metalness={1}
            distort={0.4}
            speed={2}
          />
        </mesh>
      </Float>

      {/* Outer Gyroscope Tech Ring (Ghostly) */}
      <Float speed={1.5} rotationIntensity={1.5} floatIntensity={0.5}>
        <mesh ref={outerRingRef}>
            <torusGeometry args={[5.2, 0.02, 16, 100]} />
            <meshStandardMaterial 
                color="#ffffff"
                emissive="#ffffff"
                emissiveIntensity={0.5}
                transparent
                opacity={0.3}
            />
        </mesh>
      </Float>

      {/* Floating Debris / Data Particles */}
      <Sparkles 
        count={300} 
        scale={10} 
        size={3} 
        speed={0.4} 
        opacity={0.6} 
        color="#a78bfa" // violet-400
      />
      <Sparkles 
        count={200} 
        scale={15} 
        size={1.5} 
        speed={0.2} 
        opacity={0.4} 
        color="#22d3ee" // cyan-400
      />
      
      {/* Inner Light Source to illuminate the rings from the inside */}
      <pointLight position={[0, 0, 0]} intensity={5} distance={10} color="#6366f1" />
    </group>
  );
};