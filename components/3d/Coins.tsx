import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Trail, Float } from '@react-three/drei';
import * as THREE from 'three';

// Fix for JSX element type errors in strict environments
declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      mesh: any;
      cylinderGeometry: any;
      torusGeometry: any;
      meshStandardMaterial: any;
    }
  }
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        group: any;
        mesh: any;
        cylinderGeometry: any;
        torusGeometry: any;
        meshStandardMaterial: any;
      }
    }
  }
}

const Coin = ({ startDelay }: { startDelay: number }) => {
  const groupRef = useRef<THREE.Group>(null);
  const coinMeshRef = useRef<THREE.Mesh>(null);

  // Path Waypoints corresponding to Pillar Tops (plus offset for radius)
  // Must match Pillars.tsx coordinates:
  // P1: x=-5,   y=-2.5, z=-6
  // P2: x=-1.8, y=-0.5, z=-4
  // P3: x=1.4,  y=1.5,  z=-2
  // P4: x=4.6,  y=3.5,  z=0
  const waypoints = useMemo(() => [
    new THREE.Vector3(-5, -1.9, -6),   // Top of P1 + 0.6
    new THREE.Vector3(-1.8, 0.1, -4),  // Top of P2 + 0.6
    new THREE.Vector3(1.4, 2.1, -2),   // Top of P3 + 0.6
    new THREE.Vector3(4.6, 4.1, 0),    // Top of P4 + 0.6
  ], []);

  useFrame((state) => {
    if (!groupRef.current) return;

    const t = state.clock.getElapsedTime();
    const cycleDuration = 5; // Time to traverse the full path + pause
    const activeDuration = 4; // Time actually moving
    
    // Loop logic - Handle negative start delays correctly
    let timeInCycle = (t + startDelay) % cycleDuration;
    if (timeInCycle < 0) timeInCycle += cycleDuration;
    
    // If we are in the "pause" phase after the last jump, hide or reset
    if (timeInCycle > activeDuration) {
        groupRef.current.scale.setScalar(0);
        return;
    } else {
        // Fade in scale at start
        const scale = Math.min(timeInCycle * 2, 1);
        groupRef.current.scale.setScalar(scale);
    }

    // Calculate progress along the path (0 to 1 over activeDuration)
    const progress = timeInCycle / activeDuration;
    
    // Determine Segment
    const segmentCount = waypoints.length - 1;
    const segmentDuration = 1 / segmentCount;
    
    // Clamp index to ensure we don't exceed array bounds
    const currentSegmentIndex = Math.min(
        Math.floor(progress / segmentDuration), 
        segmentCount - 1
    );
    
    // Safety check for waypoints
    const start = waypoints[currentSegmentIndex];
    const end = waypoints[currentSegmentIndex + 1];

    if (!start || !end) return;

    // Local progress within the segment (0 to 1)
    const segmentProgress = (progress - (currentSegmentIndex * segmentDuration)) / segmentDuration;

    // Linear Move for X and Z
    groupRef.current.position.lerpVectors(start, end, segmentProgress);
    
    // Parabolic Jump for Y
    // Height of jump relative to the linear slope
    const jumpHeight = 2.5; 
    // Sin wave (0 -> 1 -> 0)
    const yJump = Math.sin(segmentProgress * Math.PI) * jumpHeight;
    groupRef.current.position.y += yJump;

    // Rotation Animation
    if (coinMeshRef.current) {
        // Spin fast on its axis (rolling)
        coinMeshRef.current.rotation.x = -timeInCycle * 8; 
        // Slight wobble on Y
        coinMeshRef.current.rotation.y = Math.sin(timeInCycle * 2) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      <Trail 
        width={1.2} 
        length={4} 
        color={new THREE.Color("#22d3ee")} 
        attenuation={(t) => t * t}
      >
        <group ref={coinMeshRef}>
            {/* The Coin Composite */}
            {/* 1. Outer Glowing Rim */}
            <mesh rotation={[0, 0, Math.PI / 2]}>
                <torusGeometry args={[0.6, 0.1, 16, 32]} />
                <meshStandardMaterial 
                    color="#22d3ee" 
                    emissive="#22d3ee"
                    emissiveIntensity={2}
                    toneMapped={false}
                />
            </mesh>
            {/* 2. Inner Dark Core */}
            <mesh rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.55, 0.55, 0.1, 32]} />
                <meshStandardMaterial 
                    color="#020617"
                    metalness={0.9}
                    roughness={0.1}
                />
            </mesh>
        </group>
      </Trail>
    </group>
  );
};

export const Coins: React.FC = () => {
  return (
    <group>
        {/* Render two coins with offset timing for continuous action */}
        {/* Wait 1.5s for pillars to rise before first coin starts */}
        <Coin startDelay={-1.5} /> 
        <Coin startDelay={-4.0} />
    </group>
  );
};