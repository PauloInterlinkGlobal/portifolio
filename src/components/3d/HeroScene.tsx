/**
 * @file HeroScene.tsx
 * @description Elemento 3D interativo para a seção Hero (Núcleo holográfico, anéis orbitais e silhueta cibernética).
 */

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Ring } from '@react-three/drei';
import * as THREE from 'three';

function HologramCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4;
      meshRef.current.rotation.x += delta * 0.2;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.6;
      ring1Ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.8) * 0.5;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.8;
      ring2Ref.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.8) * 0.5;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z += delta * 0.3;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Esfera Núcleo Futurista com Distorção Orgânica */}
      <Float speed={3} rotationIntensity={1} floatIntensity={1.5}>
        <Sphere ref={meshRef} args={[1.3, 64, 64]}>
          <MeshDistortMaterial
            color="#00E5FF"
            emissive="#00E5FF"
            emissiveIntensity={0.6}
            roughness={0.1}
            metalness={0.8}
            distort={0.35}
            speed={2}
            wireframe={false}
          />
        </Sphere>
      </Float>

      {/* Anel Orbital 1 - Cobre Interno */}
      <mesh ref={ring1Ref}>
        <Ring args={[1.7, 1.76, 64]}>
          <meshBasicMaterial color="#00E5FF" side={THREE.DoubleSide} transparent opacity={0.8} />
        </Ring>
      </mesh>

      {/* Anel Orbital 2 - Neon Roxo */}
      <mesh ref={ring2Ref}>
        <Ring args={[2.2, 2.25, 64]}>
          <meshBasicMaterial color="#6C63FF" side={THREE.DoubleSide} transparent opacity={0.6} />
        </Ring>
      </mesh>

      {/* Anel Orbital 3 - Verde Accent */}
      <mesh ref={ring3Ref} rotation={[Math.PI / 3, 0, 0]}>
        <Ring args={[2.7, 2.73, 64]}>
          <meshBasicMaterial color="#00FF88" side={THREE.DoubleSide} transparent opacity={0.5} />
        </Ring>
      </mesh>
    </group>
  );
}

export default function HeroScene() {
  return (
    <div className="w-full h-[380px] sm:h-[480px] lg:h-[550px] relative pointer-events-auto">
      <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} color="#00E5FF" />
        <pointLight position={[-5, -5, -2]} intensity={1} color="#6C63FF" />
        <HologramCore />
      </Canvas>
    </div>
  );
}
