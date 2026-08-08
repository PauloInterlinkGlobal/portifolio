/**
 * @file TechSphere.tsx
 * @description Esfera 3D rotativa interativa com ícones/tecnologias orbitando e efeito de brilho em hover.
 */

import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, Float, Sphere as ThreeSphere } from '@react-three/drei';
import * as THREE from 'three';
import { SKILLS_DATA } from '../../data/portfolioData';
import { TechSkill } from '../../types';
import * as Icons from 'lucide-react';

interface TechSphereProps {
  selectedCategory: string;
  onSelectSkill: (skill: TechSkill) => void;
}

function TechItemNode({ skill, position, isHovered, onHover, onClick }: {
  skill: TechSkill;
  position: [number, number, number];
  isHovered: boolean;
  onHover: (hovered: boolean) => void;
  onClick: () => void;
}) {
  const nodeRef = useRef<THREE.Group>(null);

  // Seleciona o ícone dinamicamente do lucide-react
  const IconComponent = useMemo(() => {
    const Icon = (Icons as unknown as Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>>)[skill.icon];
    return Icon || Icons.Code;
  }, [skill.icon]);

  return (
    <group position={position} ref={nodeRef}>
      <mesh
        onPointerOver={() => onHover(true)}
        onPointerOut={() => onHover(false)}
        onClick={onClick}
      >
        <sphereGeometry args={[isHovered ? 0.35 : 0.22, 16, 16]} />
        <meshStandardMaterial
          color={isHovered ? skill.color : '#0f172a'}
          emissive={skill.color}
          emissiveIntensity={isHovered ? 1.5 : 0.3}
          metalness={0.8}
          roughness={0.2}
          wireframe={!isHovered}
        />
      </mesh>

      <Html distanceFactor={10} zIndexRange={[100, 0]}>
        <div
          onMouseEnter={() => onHover(true)}
          onMouseLeave={() => onHover(false)}
          onClick={onClick}
          className={`cursor-pointer transition-all duration-300 flex items-center gap-1.5 px-2.5 py-1 rounded-full whitespace-nowrap border select-none ${
            isHovered
              ? 'bg-slate-900/90 border-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.6)] scale-125 z-50 text-white'
              : 'bg-slate-950/70 border-slate-700/60 text-slate-300 hover:border-slate-400'
          }`}
          style={{
            borderColor: isHovered ? skill.color : undefined,
          }}
        >
          <IconComponent className="w-3.5 h-3.5" style={{ color: skill.color }} />
          <span className="text-xs font-semibold tracking-wider font-mono">{skill.name}</span>
        </div>
      </Html>
    </group>
  );
}

function RotatingTechSphere({ selectedCategory, onSelectSkill }: { selectedCategory: string; onSelectSkill: (skill: TechSkill) => void }) {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const filteredSkills = useMemo(() => {
    if (selectedCategory === 'all') return SKILLS_DATA;
    return SKILLS_DATA.filter((s) => s.category === selectedCategory);
  }, [selectedCategory]);

  // Calcula a posição uniforme dos nós na superfície de uma esfera (Distribuição de Fibonacci)
  const skillPositions = useMemo(() => {
    const posList: [number, number, number][] = [];
    const count = filteredSkills.length;
    const radius = 2.8;
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden ratio angle

    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2; // y vai de 1 a -1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY * radius;
      const z = Math.sin(theta) * radiusAtY * radius;

      posList.push([x, y * radius, z]);
    }
    return posList;
  }, [filteredSkills]);

  useFrame((_, delta) => {
    if (groupRef.current && hoveredIndex === null) {
      groupRef.current.rotation.y += delta * 0.25;
      groupRef.current.rotation.x += delta * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Esfera aramada central holográfica */}
      <ThreeSphere args={[2.5, 24, 24]}>
        <meshBasicMaterial color="#6C63FF" wireframe transparent opacity={0.12} />
      </ThreeSphere>

      {filteredSkills.map((skill, idx) => (
        <TechItemNode
          key={skill.name}
          skill={skill}
          position={skillPositions[idx] || [0, 0, 0]}
          isHovered={hoveredIndex === idx}
          onHover={(hovered) => setHoveredIndex(hovered ? idx : null)}
          onClick={() => onSelectSkill(skill)}
        />
      ))}
    </group>
  );
}

export default function TechSphere({ selectedCategory, onSelectSkill }: TechSphereProps) {
  return (
    <div className="w-full h-[400px] sm:h-[500px] relative pointer-events-auto">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={1.2} color="#00E5FF" />
        <pointLight position={[-5, -5, -5]} intensity={1} color="#6C63FF" />
        <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
          <RotatingTechSphere selectedCategory={selectedCategory} onSelectSkill={onSelectSkill} />
        </Float>
      </Canvas>
    </div>
  );
}
