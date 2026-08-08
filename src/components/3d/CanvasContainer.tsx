/**
 * @file CanvasContainer.tsx
 * @description Container Three.js / React Three Fiber fixo em tela cheia que responde ao scroll e interações de mouse.
 */

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Float, Grid } from '@react-three/drei';
import * as THREE from 'three';
import { Theme3DMode } from '../../types';

interface CanvasContainerProps {
  currentSection: string;
  themeMode: Theme3DMode;
}

// Subcomponente para gerenciar a câmera e efeitos de scroll
function SceneManager({ currentSection, themeMode }: { currentSection: string; themeMode: Theme3DMode }) {
  const { camera } = useThree();
  const targetCamPos = useRef(new THREE.Vector3(0, 0, 7));
  const targetCamRot = useRef(new THREE.Euler(0, 0, 0));

  // Ajusta a posição da câmera com base na seção visível no scroll
  React.useEffect(() => {
    switch (currentSection) {
      case 'hero':
        targetCamPos.current.set(0, 0, 7);
        targetCamRot.current.set(0, 0, 0);
        break;
      case 'about':
        targetCamPos.current.set(-2, 1, 6);
        targetCamRot.current.set(0.1, -0.2, 0);
        break;
      case 'skills':
        targetCamPos.current.set(0, 0, 8);
        targetCamRot.current.set(0, 0, 0);
        break;
      case 'experience':
        targetCamPos.current.set(2, -1, 6.5);
        targetCamRot.current.set(-0.1, 0.2, 0);
        break;
      case 'projects':
        targetCamPos.current.set(0, 0.5, 7.5);
        targetCamRot.current.set(0.05, 0, 0);
        break;
      case 'contact':
        targetCamPos.current.set(0, -0.5, 6);
        targetCamRot.current.set(-0.05, 0, 0);
        break;
      default:
        targetCamPos.current.set(0, 0, 7);
        targetCamRot.current.set(0, 0, 0);
    }
  }, [currentSection]);

  // Transição suave da câmera (lerp) a 60 FPS
  useFrame((state, delta) => {
    camera.position.lerp(targetCamPos.current, delta * 2.5);
    camera.rotation.x = THREE.MathUtils.lerp(camera.rotation.x, targetCamRot.current.x, delta * 2.5);
    camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, targetCamRot.current.y, delta * 2.5);
    camera.rotation.z = THREE.MathUtils.lerp(camera.rotation.z, targetCamRot.current.z, delta * 2.5);
    
    // Suave movimento com o movimento do mouse
    camera.position.x += (state.pointer.x * 0.3 - camera.position.x) * 0.02;
    camera.position.y += (state.pointer.y * 0.3 - camera.position.y) * 0.02;
  });

  // Cores dinâmicas de acordo com o tema
  const mainColor = useMemo(() => {
    switch (themeMode) {
      case 'cyber-cyan': return '#00E5FF';
      case 'matrix-green': return '#00FF88';
      case 'neon-purple': return '#6C63FF';
      case 'deep-void': return '#38BDF8';
      default: return '#00E5FF';
    }
  }, [themeMode]);

  return (
    <>
      {/* Iluminação de fundo cinemática */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} color={mainColor} />
      <pointLight position={[-10, -10, -5]} intensity={0.8} color="#6C63FF" />
      <pointLight position={[0, 5, 2]} intensity={1.5} color={mainColor} />

      {/* Nevoeiro volúmico cibernético */}
      <fog attach="fog" args={['#030712', 4, 22]} />

      {/* Campo de Estrelas e Partículas Flutuantes */}
      <Stars radius={100} depth={50} count={3500} factor={4} saturation={1} fade speed={1.2} />

      {/* Grid de Piso Futurista */}
      <group position={[0, -4, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <Grid
          infiniteGrid
          cellSize={1}
          cellThickness={1}
          cellColor={mainColor}
          sectionSize={5}
          sectionThickness={1.5}
          sectionColor="#6C63FF"
          fadeDistance={25}
          fadeStrength={1.5}
        />
      </group>

      {/* Geometrias Abstratas Flutuantes em Segundo Plano */}
      <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
        <mesh position={[-5, 3, -4]} rotation={[0.4, 0.2, 0]}>
          <octahedronGeometry args={[1.2, 0]} />
          <meshStandardMaterial color={mainColor} wireframe transparent opacity={0.25} />
        </mesh>
      </Float>

      <Float speed={1.5} rotationIntensity={2} floatIntensity={1.5}>
        <mesh position={[5, -2, -5]} rotation={[0.2, 0.8, 0]}>
          <icosahedronGeometry args={[1.5, 0]} />
          <meshStandardMaterial color="#6C63FF" wireframe transparent opacity={0.3} />
        </mesh>
      </Float>
    </>
  );
}

export default function CanvasContainer({ currentSection, themeMode }: CanvasContainerProps) {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ width: '100vw', height: '100vh' }}
      >
        <SceneManager currentSection={currentSection} themeMode={themeMode} />
      </Canvas>
    </div>
  );
}
