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
      meshBasicMaterial: any;
    }
  }
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        group: any;
        mesh: any;
        torusGeometry: any;
        meshBasicMaterial: any;
      }
    }
  }
}

export const PortalRing: React.FC = () => {
  const torusRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (torusRef.current) {
      torusRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      torusRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
    if (glowRef.current) {
      glowRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      glowRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
      // Pulse effect
      const scale = 1 + Math.sin(state.clock.getElapsedTime() * 2) * 0.05;
      glowRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group>
      {/* Background Ambience */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      {/* Main Portal Ring */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh ref={torusRef}>
          <torusGeometry args={[3.5, 0.8, 64, 128]} />
          {/* Using MeshDistortMaterial for that liquid/organic futuristic feel */}
          <MeshDistortMaterial 
            color="#1e1b4b" 
            emissive="#4f46e5"
            emissiveIntensity={0.5}
            roughness={0.1}
            metalness={1}
            distort={0.3}
            speed={2}
          />
        </mesh>

        {/* Wireframe Glow Overlay */}
        <mesh ref={glowRef}>
          <torusGeometry args={[3.6, 0.85, 64, 128]} />
          <meshBasicMaterial 
            color="#22d3ee" 
            wireframe 
            transparent 
            opacity={0.1} 
          />
        </mesh>
      </Float>

      {/* Floating Particles */}
      <Sparkles 
        count={200} 
        scale={10} 
        size={4} 
        speed={0.4} 
        opacity={0.5} 
        color="#a78bfa" // violet-400
      />
      <Sparkles 
        count={200} 
        scale={12} 
        size={2} 
        speed={0.3} 
        opacity={0.3} 
        color="#22d3ee" // cyan-400
      />
    </group>
  );
};