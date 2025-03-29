import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export function BookModel({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  // Simple book geometry since we don't have an actual GLTF model
  return (
    <mesh ref={meshRef} position={position} rotation={rotation}>
      <boxGeometry args={[1, 1.5, 0.2]} />
      <meshStandardMaterial 
        color="#C6A969"
        roughness={0.7}
        metalness={0.3}
      />
    </mesh>
  );
}