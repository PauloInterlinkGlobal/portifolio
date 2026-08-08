/**
 * @file CustomCursor.tsx
 * @description Cursor magnético futurista com aura suave, rastro de neon e feedback tátil ao clicar.
 */

import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Verifica se está sob elemento interativo
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.closest('button') ||
          target.closest('a') ||
          target.getAttribute('role') === 'button' ||
          target.classList.contains('cursor-pointer'))
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  // Animação suave para o rastro do cursor (lerp)
  useEffect(() => {
    let animationFrameId: number;
    const updateTrailingPos = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.18,
        y: prev.y + (position.y - prev.y) * 0.18,
      }));
      animationFrameId = requestAnimationFrame(updateTrailingPos);
    };
    animationFrameId = requestAnimationFrame(updateTrailingPos);
    return () => cancelAnimationFrame(animationFrameId);
  }, [position]);

  if (!isVisible) return null;

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-50">
      {/* Ponto Central do Cursor */}
      <div
        className={`fixed top-0 left-0 w-3 h-3 rounded-full bg-[#00E5FF] -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 shadow-[0_0_12px_#00E5FF] ${
          isClicked ? 'scale-75' : isHovered ? 'scale-150 bg-[#00FF88]' : 'scale-100'
        }`}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        }}
      />

      {/* Aura / Anel Orbital Externo */}
      <div
        className={`fixed top-0 left-0 rounded-full border transition-all duration-300 ease-out -translate-x-1/2 -translate-y-1/2 ${
          isHovered
            ? 'w-14 h-14 border-[#00E5FF] bg-[#00E5FF]/10 backdrop-blur-[2px] shadow-[0_0_20px_rgba(0,229,255,0.4)]'
            : isClicked
            ? 'w-6 h-6 border-[#6C63FF]'
            : 'w-9 h-9 border-white/30'
        }`}
        style={{
          transform: `translate3d(${trailingPos.x}px, ${trailingPos.y}px, 0)`,
        }}
      />
    </div>
  );
}
