import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';
import { CLIENT_GALLERY_IMAGES } from '@/constants/assets';

gsap.registerPlugin(ScrollTrigger);

const OrchardArcGallery: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Tween | null>(null);
  const wheelResumeTimerRef = useRef<number | null>(null);
  const rotationOffsetRef = useRef(0);
  const dragStateRef = useRef({ isDragging: false, startX: 0, startOffset: 0, moved: false, pointerType: 'mouse' as PointerEvent['pointerType'] });
  const navigate = useNavigate();
  
  // Keep the exact same number of slots as the full gallery to preserve the arc design
  const totalSlots = CLIENT_GALLERY_IMAGES.length;
  // But only use the most recent 10 unique images to fill those slots
  const recentImages = CLIENT_GALLERY_IMAGES.slice(0, 10);
  const items = Array.from({ length: totalSlots }, (_, i) => recentImages[i % recentImages.length]);

  useEffect(() => {
    if (!containerRef.current || !sectionRef.current) return;

    const cards = containerRef.current.querySelectorAll('.gallery-card');
    const totalItems = cards.length;
    
    const isMobile = window.innerWidth < 768;
    const radiusX = isMobile ? 180 : 480; // Optimized width
    const radiusY = isMobile ? 80 : 140;  // Optimized height for "cute" arc
    const centerX = containerRef.current.offsetWidth / 2;
    const centerY = isMobile ? 180 : 250; 

    const rotationProxy = { angle: 0 };
    // Perfectly calibrated step for 24 images on a semi-circle
    const angleStep = (Math.PI * 2) / totalItems; 

    const updatePositions = () => {
      const currentAngle = rotationProxy.angle + rotationOffsetRef.current;

      cards.forEach((card, i) => {
        const angle = currentAngle + (i * angleStep);
        
        const x = centerX + Math.cos(angle) * radiusX;
        const y = centerY - Math.sin(angle) * radiusY;

        // Visibility check for the 180-degree upper arc
        const sinVal = Math.sin(angle);
        const isVisible = sinVal > -0.15; 
        const normalizedSin = Math.max(0, sinVal);
        
        // Pure 2D Scale and Opacity Focus
        const focusScale = 0.55 + normalizedSin * 0.45;
        const focusOpacity = 0.2 + normalizedSin * 0.8;
        
        gsap.set(card, {
          x: x - (isMobile ? 50 : 80), 
          y: y,
          scale: focusScale,
          opacity: focusOpacity,
          zIndex: Math.round(normalizedSin * 100),
          display: isVisible ? 'block' : 'none',
          rotation: (Math.cos(angle) * (isMobile ? 5 : 8)), // Gentle 2D tilt
          filter: 'none', // Removed blur for pure 2D clarity
        });
      });
    };

    const tl = gsap.to(rotationProxy, {
      angle: Math.PI * 2,
      duration: 30,
      repeat: -1,
      ease: "none",
      onUpdate: updatePositions
    });
    timelineRef.current = tl;

    // Interaction
    const handleMouseEnter = () => {
      if (!dragStateRef.current.isDragging) gsap.to(tl, { timeScale: 0.2, duration: 1 });
    };
    const handleMouseLeave = () => {
      if (!dragStateRef.current.isDragging) gsap.to(tl, { timeScale: 1, duration: 1 });
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!dragStateRef.current.isDragging) return;

      const deltaX = event.clientX - dragStateRef.current.startX;
      if (Math.abs(deltaX) > 4) dragStateRef.current.moved = true;

      const directionMultiplier = dragStateRef.current.pointerType === 'touch' ? -1 : 1;
      rotationOffsetRef.current = dragStateRef.current.startOffset + deltaX * 0.008 * directionMultiplier;
      tl.pause();
      updatePositions();
    };

    const handleWheel = (event: WheelEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target?.closest('.gallery-card')) return;

      const horizontalDelta = Math.abs(event.deltaX) > Math.abs(event.deltaY)
        ? event.deltaX
        : event.shiftKey
          ? event.deltaY
          : 0;

      if (horizontalDelta === 0) return;

      event.preventDefault();
      event.stopPropagation();

      if (wheelResumeTimerRef.current !== null) {
        window.clearTimeout(wheelResumeTimerRef.current);
      }

      timelineRef.current?.pause();
      rotationOffsetRef.current += horizontalDelta * 0.004;
      updatePositions();

      wheelResumeTimerRef.current = window.setTimeout(() => {
        if (!dragStateRef.current.isDragging) {
          timelineRef.current?.play();
          if (timelineRef.current) gsap.to(timelineRef.current, { timeScale: 1, duration: 0.6 });
        }
      }, 140);
    };

    const handlePointerUp = () => {
      dragStateRef.current.isDragging = false;
      gsap.to(tl, { timeScale: 1, duration: 0.6 });
      tl.play();
    };

    containerRef.current.addEventListener('mouseenter', handleMouseEnter);
    containerRef.current.addEventListener('mouseleave', handleMouseLeave);
    containerRef.current.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top bottom",
      end: "bottom top",
      onToggle: self => self.isActive ? tl.play() : tl.pause()
    });

    return () => {
      tl.kill();
      timelineRef.current = null;
      if (wheelResumeTimerRef.current !== null) {
        window.clearTimeout(wheelResumeTimerRef.current);
        wheelResumeTimerRef.current = null;
      }
      containerRef.current?.removeEventListener('mouseenter', handleMouseEnter);
      containerRef.current?.removeEventListener('mouseleave', handleMouseLeave);
      containerRef.current?.removeEventListener('wheel', handleWheel);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="bg-neutral py-6 sm:py-10 overflow-hidden flex flex-col items-center justify-center"
    >
      <div className="relative w-full max-w-6xl h-[280px] sm:h-[400px]" ref={containerRef}>
        
        {/* Centered Heading: Positioned lower inside the Arc */}
        <div className="absolute top-[92%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-0 pointer-events-none">
          <p className="text-[0.7rem] sm:text-xs font-bold tracking-[0.5em] uppercase text-primary/30">
            Gallery
          </p>
        </div>

        {/* The Arc Images */}
        {items.map((item, idx) => (
          <div
            key={`${item.id}-${idx}`}
            className="gallery-card absolute w-[100px] sm:w-[160px] aspect-[3/4] cursor-grab active:cursor-grabbing select-none touch-pan-y group"
            onPointerDown={(event) => {
              dragStateRef.current.isDragging = true;
              dragStateRef.current.startX = event.clientX;
              dragStateRef.current.startOffset = rotationOffsetRef.current;
              dragStateRef.current.moved = false;
              dragStateRef.current.pointerType = event.pointerType;
              event.currentTarget.setPointerCapture(event.pointerId);
              timelineRef.current?.pause();
            }}
            onPointerMove={(event) => {
              if (!dragStateRef.current.isDragging) return;

              const deltaX = event.clientX - dragStateRef.current.startX;
              if (Math.abs(deltaX) > 4) dragStateRef.current.moved = true;

              const directionMultiplier = dragStateRef.current.pointerType === 'touch' ? -1 : 1;
              rotationOffsetRef.current = dragStateRef.current.startOffset + deltaX * 0.008 * directionMultiplier;
              timelineRef.current?.pause();
              event.currentTarget.setPointerCapture(event.pointerId);
              event.preventDefault();
            }}
            onPointerUp={() => {
              dragStateRef.current.isDragging = false;
              timelineRef.current?.play();
              if (timelineRef.current) gsap.to(timelineRef.current, { timeScale: 1, duration: 0.6 });
            }}
            onPointerCancel={() => {
              dragStateRef.current.isDragging = false;
              dragStateRef.current.moved = false;
              timelineRef.current?.play();
              if (timelineRef.current) gsap.to(timelineRef.current, { timeScale: 1, duration: 0.6 });
            }}
            onClick={(event) => {
              if (dragStateRef.current.moved) {
                event.preventDefault();
                event.stopPropagation();
                dragStateRef.current.moved = false;
                return;
              }

              navigate('/gallery');
            }}
          >
            <div className="w-full h-full rounded-2xl overflow-hidden shadow-lg border-2 border-white transition-all duration-500 group-hover:shadow-glow group-hover:scale-105">
              <img 
                src={item.url} 
                alt={item.alt}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>

      {/* View Full Collection link removed as per compact request, or kept subtle */}
      <button 
        onClick={() => navigate('/gallery')}
        className="mt-6 text-[0.6rem] font-bold tracking-widest uppercase text-primary/40 hover:text-accent transition-colors"
      >
        View Full Collection —
      </button>
    </section>
  );
};

export default OrchardArcGallery;
