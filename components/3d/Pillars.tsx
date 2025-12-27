import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Edges } from '@react-three/drei';
import * as THREE from 'three';

// Fix for JSX element type errors in strict environments
declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      mesh: any;
      boxGeometry: any;
      meshStandardMaterial: any;
      meshPhysicalMaterial: any; // Added for PBR
      lineSegments: any;
      edgesGeometry: any;
      lineBasicMaterial: any;
    }
  }
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        group: any;
        mesh: any;
        boxGeometry: any;
        meshStandardMaterial: any;
        meshPhysicalMaterial: any; // Added for PBR
        lineSegments: any;
        edgesGeometry: any;
        lineBasicMaterial: any;
      }
    }
  }
}

interface PillarProps {
  targetY: number;
  targetZ: number;
  height: number;
  position: [number, number, number];
  delay: number;
}

const Pillar: React.FC<PillarProps> = ({ targetY, targetZ, height, position, delay }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Start position: same x, but y is much lower
  const startY = targetY - 20; 
  
  const started = useRef(false);

  useFrame((state, delta) => {
    // Check delay
    if (!started.current) {
        if (state.clock.getElapsedTime() > delay) {
            started.current = true;
        }
        if (meshRef.current) {
            meshRef.current.position.y = startY;
            meshRef.current.position.z = targetZ; // Ensure Z is set
        }
        return;
    }

    // Animate
    if (meshRef.current) {
      // Smoothly damp the Y position to the target
      meshRef.current.position.y = THREE.MathUtils.damp(
        meshRef.current.position.y,
        targetY,
        2.5,
        delta
      );
    }
  });

  return (
    <mesh ref={meshRef} position={[position[0], startY, targetZ]}>
      <boxGeometry args={[3, height, 3]} />
      {/* Premium PBR Material */}
      <meshPhysicalMaterial 
        color="#0f172a"        // slate-900 base
        roughness={0.2}        // Smooth but not perfect mirror
        metalness={0.6}        // Metallic feel
        clearcoat={1.0}        // Lacquered top coat
        clearcoatRoughness={0.1}
        reflectivity={1}
        emissive="#1e1b4b"     // Deep indigo glow in shadows
        emissiveIntensity={0.2}
      />
      {/* Edges for definition - slightly brighter to catch the eye */}
      <Edges color="#64748b" threshold={15} /> 
    </mesh>
  );
};

export const Pillars: React.FC = () => {
    // Configuration for the staircase pillars
    // Rising Left -> Right AND Back -> Front (Z increases)
    const columns = [
        { x: -5,   topOffset: -2.5, z: -6, delay: 0.2 },
        { x: -1.8, topOffset: -0.5, z: -4, delay: 0.4 },
        { x: 1.4,  topOffset: 1.5,  z: -2, delay: 0.6 },
        { x: 4.6,  topOffset: 3.5,  z: 0,  delay: 0.8 },
    ];
    
    const height = 14;

    return (
        <group>
            {columns.map((col, i) => {
                // CenterY = DesiredTopY - (Height / 2)
                const targetCenterY = col.topOffset - (height / 2);
                
                return (
                    <Pillar 
                        key={i}
                        targetY={targetCenterY}
                        targetZ={col.z}
                        height={height}
                        position={[col.x, 0, col.z]} // Initial Y ignored
                        delay={col.delay}
                    />
                );
            })}
        </group>
    );
};