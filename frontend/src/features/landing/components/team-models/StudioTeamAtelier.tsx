import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  DepartmentCategory,
  DEPARTMENTS_LIST,
  ALL_TEAM_MEMBERS,
} from './teamData';
import { Sparkles } from 'lucide-react';
import { FilterTabItem } from '../../../../components/ui/filters/types';
import { getCandidateUrls } from '../../../../components/ui/OptimizedImage';

// Exact Geometric Sci-Fi Hexagon Badge (identical to FeaturedProjectsSection Work filter)
function ArchivalBadge({
  active,
  children,
  isNight,
  size = 'sm',
}: {
  active: boolean;
  children: React.ReactNode;
  isNight: boolean;
  size?: 'sm' | 'md';
}) {
  const sizeClass = size === 'sm' ? 'w-7 h-8' : 'w-8 h-9 sm:w-9 sm:h-10';
  return (
    <div className={`relative ${sizeClass} flex items-center justify-center shrink-0`}>
      <svg
        viewBox="0 0 28 32"
        className={`w-full h-full transition-all duration-300 ${
          active
            ? isNight
              ? 'text-brand-yellow drop-shadow-[0_0_10px_rgba(255,240,131,0.85)] scale-105'
              : 'text-[#8f6b00] drop-shadow-[0_0_8px_rgba(143,107,0,0.5)] scale-105'
            : isNight
            ? 'text-neutral-500 group-hover:text-brand-yellow group-hover:drop-shadow-[0_0_6px_rgba(255,240,131,0.4)]'
            : 'text-neutral-400 group-hover:text-[#8f6b00] group-hover:drop-shadow-[0_0_6px_rgba(143,107,0,0.3)]'
        }`}
        fill="none"
      >
        <polygon
          points="14,1.5 26.5,8.8 26.5,23.2 14,30.5 1.5,23.2 1.5,8.8"
          fill={
            active
              ? isNight
                ? 'rgba(255, 240, 131, 0.18)'
                : 'rgba(143, 107, 0, 0.15)'
              : isNight
              ? 'rgba(20, 20, 20, 0.75)'
              : 'rgba(240, 238, 232, 0.85)'
          }
          stroke="currentColor"
          strokeWidth={active ? '1.6' : '1.1'}
        />
      </svg>
      <div
        className={`absolute inset-0 flex items-center justify-center transition-colors duration-300 ${
          active
            ? isNight
              ? 'text-brand-yellow'
              : 'text-[#8f6b00]'
            : isNight
            ? 'text-neutral-400 group-hover:text-brand-yellow'
            : 'text-neutral-600 group-hover:text-[#8f6b00]'
        }`}
      >
        {children}
      </div>
    </div>
  );
}


function renderTeamDeptIcon(deptId: DepartmentCategory) {
  switch (deptId) {
    case 'leadership':
      return (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l2.4 5.2L20 9l-4 3.9.9 5.6L12 15.8l-4.9 2.7.9-5.6L4 9l5.6-.8L12 3z" />
        </svg>
      );
    case 'web-dev':
      return (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l-4 3 4 3M16 9l4 3-4 3M14 4l-4 16" />
        </svg>
      );
    case 'seo-analytics':
      return (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          <circle cx="13" cy="7" r="1.5" fill="currentColor" />
        </svg>
      );
    case 'branding-identity':
      return (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      );
    case 'creative-studio':
      return (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      );
    case 'digital-marketing':
      return (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7c-.571 0-1.115.12-1.564.337z" />
        </svg>
      );
    case 'game-interactive':
      return (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="6" width="20" height="12" rx="6" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12h4m-2-2v4m9-2h.01m3 0h.01" />
        </svg>
      );
    case 'academy-hub':
      return (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
      );
    default:
      return (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="8" />
        </svg>
      );
  }
}

interface Props {
  isNight: boolean;
  isFa: boolean;
}

// Auto-scrolling ticker for long roles on card hover
function MarqueeRole({
  text,
  isHovered,
  isFa,
  isNight,
}: {
  text: string;
  isHovered: boolean;
  isFa: boolean;
  isNight: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [overflowDistance, setOverflowDistance] = useState<number>(0);

  useEffect(() => {
    const checkOverflow = () => {
      if (containerRef.current && textRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const textWidth = textRef.current.scrollWidth;
        if (textWidth > containerWidth) {
          setOverflowDistance(textWidth - containerWidth + 10);
        } else {
          setOverflowDistance(0);
        }
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [text]);

  const shouldAnimate = isHovered && overflowDistance > 0;

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden relative"
      style={{
        maskImage:
          overflowDistance > 0 && isHovered
            ? 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)'
            : 'none',
        WebkitMaskImage:
          overflowDistance > 0 && isHovered
            ? 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)'
            : 'none',
      }}
    >
      <motion.span
        ref={textRef}
        animate={
          shouldAnimate
            ? {
                x: isFa ? [0, overflowDistance, 0] : [0, -overflowDistance, 0],
              }
            : { x: 0 }
        }
        transition={
          shouldAnimate
            ? {
                duration: Math.max(3.5, overflowDistance / 22),
                ease: 'easeInOut',
                repeat: Infinity,
                repeatDelay: 0.8,
              }
            : { duration: 0.25 }
        }
        className={`inline-block text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${
          overflowDistance > 0 && !isHovered ? 'truncate max-w-full' : ''
        } text-neutral-400`}
      >
        {text}
      </motion.span>
    </div>
  );
}

export function StudioTeamAtelier({ isNight, isFa }: Props) {
  const galleryAccent = '#fff083';

  // Default to Leadership (3 Co-Founders with 100% equal stature)
  const [selectedDept, setSelectedDept] = useState<DepartmentCategory>('leadership');
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  // Preload all team portraits once so switching department tabs never blinks or flashes
  useEffect(() => {
    ALL_TEAM_MEMBERS.forEach((member) => {
      const candidates = getCandidateUrls(member.image, true);
      if (candidates[0]) {
        const img = new Image();
        img.src = candidates[0];
      }
    });
  }, []);

  // Horizontal click+drag and touch+drag scroller with kinetic momentum physics (matching Landing Work filter)
  const filtersScrollRef = useRef<HTMLDivElement>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const lastMouseX = useRef(0);
  const lastMouseTime = useRef(0);
  const mouseVelocity = useRef(0);
  const momentumRaf = useRef<number | null>(null);
  const hasDragged = useRef(false);
  const dragDistance = useRef(0);
  const touchStartX = useRef(0);

  const stopMomentum = useCallback(() => {
    if (momentumRaf.current) {
      cancelAnimationFrame(momentumRaf.current);
      momentumRaf.current = null;
    }
  }, []);

  const handleFiltersMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!filtersScrollRef.current) return;
    stopMomentum();
    setIsMouseDown(true);
    hasDragged.current = false;
    dragDistance.current = 0;
    lastMouseX.current = e.clientX;
    lastMouseTime.current = performance.now();
    mouseVelocity.current = 0;
  };

  const handleFiltersMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isMouseDown || !filtersScrollRef.current) return;
    const now = performance.now();
    const dt = now - lastMouseTime.current;
    const dx = e.clientX - lastMouseX.current;

    dragDistance.current += Math.abs(dx);
    if (dragDistance.current > 4) {
      hasDragged.current = true;
    }

    filtersScrollRef.current.scrollLeft -= dx * 1.3;

    if (dt > 0) {
      mouseVelocity.current = dx / dt;
    }

    lastMouseX.current = e.clientX;
    lastMouseTime.current = now;
  };

  const handleFiltersMouseUp = () => {
    if (!isMouseDown) return;
    setIsMouseDown(false);

    if (Math.abs(mouseVelocity.current) > 0.12 && filtersScrollRef.current) {
      let currentSpeed = mouseVelocity.current * 18;
      const glide = () => {
        if (!filtersScrollRef.current || Math.abs(currentSpeed) < 0.2) {
          momentumRaf.current = null;
          return;
        }
        filtersScrollRef.current.scrollLeft -= currentSpeed;
        currentSpeed *= 0.93;
        momentumRaf.current = requestAnimationFrame(glide);
      };
      momentumRaf.current = requestAnimationFrame(glide);
    }

    setTimeout(() => {
      hasDragged.current = false;
    }, 60);
  };

  const handleFiltersTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    stopMomentum();
    hasDragged.current = false;
    if (e.touches.length > 0) {
      touchStartX.current = e.touches[0].clientX;
    }
  };

  const handleFiltersTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      const deltaX = Math.abs(e.touches[0].pageX - touchStartX.current);
      if (deltaX > 7) {
        hasDragged.current = true;
      }
    }
  };

  const handleFiltersTouchEnd = () => {
    setTimeout(() => {
      hasDragged.current = false;
    }, 60);
  };

  useEffect(() => {
    return () => {
      stopMomentum();
    };
  }, [stopMomentum]);

  // Compute department tabs with real counts
  const teamFilterTabs = useMemo<FilterTabItem<DepartmentCategory>[]>(() => {
    return DEPARTMENTS_LIST.map((dept) => ({
      id: dept.key,
      labelEn: dept.nameEn,
      labelFa: dept.nameFa,
      count: ALL_TEAM_MEMBERS.filter((m) => m.department === dept.key).length,
    }));
  }, []);

  // ONLY members of the selected category are shown
  const displayedMembers = useMemo(() => {
    return ALL_TEAM_MEMBERS.filter((m) => m.department === selectedDept);
  }, [selectedDept]);

  // Scalable architectural grid layout that adapts seamlessly whether 1, 2, 3, 4, 5, 6 or 10+ members
  const gridLayoutClass = useMemo(() => {
    const count = displayedMembers.length;
    if (count === 1) {
      return 'grid-cols-1 max-w-xs mx-auto';
    }
    if (count === 2) {
      return 'grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto gap-4 sm:gap-6';
    }
    if (count === 3) {
      return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-5xl mx-auto gap-4 sm:gap-6';
    }
    if (count === 4) {
      return 'grid-cols-2 md:grid-cols-4 max-w-6xl mx-auto gap-4 sm:gap-5';
    }
    if (count === 6) {
      // Clean 3x2 two-row architectural grid
      return 'grid-cols-2 sm:grid-cols-3 max-w-5xl mx-auto gap-4 sm:gap-6';
    }
    // 5 or 7+ members: seamless fluid wrapping grid
    return 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5 max-w-7xl mx-auto';
  }, [displayedMembers.length]);

  return (
    <div className="w-full flex flex-col gap-6 select-none">
      
      {/* 1. ARCHITECTURAL TEAM FILTER DOCK (100% Consistent with Landing Work Filter) */}
      <div className="w-full">
        <div
          data-suppress-header="true"
          onMouseEnter={() => window.dispatchEvent(new CustomEvent('jirjirak:suppress-header', { detail: true }))}
          onMouseLeave={() => window.dispatchEvent(new CustomEvent('jirjirak:suppress-header', { detail: false }))}
          className="w-full flex items-center p-2 sm:p-2.5 rounded-2xl border transition-all shadow-lg bg-neutral-900/95 border-black/15 shadow-black/20"
        >
          {/* Horizontal Refined Archival Filters Dock with Click+Drag & Touch+Drag */}
          <div
            ref={filtersScrollRef}
            data-lenis-prevent="true"
            onMouseDown={handleFiltersMouseDown}
            onMouseMove={handleFiltersMouseMove}
            onMouseUp={handleFiltersMouseUp}
            onMouseLeave={handleFiltersMouseUp}
            onTouchStart={handleFiltersTouchStart}
            onTouchMove={handleFiltersTouchMove}
            onTouchEnd={handleFiltersTouchEnd}
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
            className={`flex-1 flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-0.5 select-none ${
              isMouseDown ? 'cursor-grabbing' : 'cursor-grab'
            }`}
          >
            {teamFilterTabs.map((dept) => {
              const isActive = selectedDept === dept.id;
              const label = isFa ? dept.labelFa : dept.labelEn;

              return (
                <button
                  key={dept.id}
                  type="button"
                  onClick={(e) => {
                    if (hasDragged.current) {
                      e.preventDefault();
                      return;
                    }
                    setSelectedDept(dept.id);
                  }}
                  className={`group relative flex items-center gap-2 px-3 py-1.5 sm:py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-300 select-none border shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-[#fff083]/15 text-[#fff083] border-[#fff083]/50 shadow-[0_0_12px_rgba(255,240,131,0.2)]'
                      : 'text-neutral-400 hover:text-white border-transparent hover:bg-white/5 hover:border-white/10'
                  }`}
                >
                  {/* Miniature Chamfered Archival Badge */}
                  <ArchivalBadge active={isActive} isNight={true} size="sm">
                    {renderTeamDeptIcon(dept.id)}
                  </ArchivalBadge>

                  {/* Department Title */}
                  <span className="truncate">{label}</span>

                  {/* Monospace Member Count Stamp */}
                  {dept.count !== undefined && (
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full transition-colors font-bold ${
                        isActive
                          ? 'bg-[#fff083]/25 text-[#fff083]'
                          : 'bg-white/5 text-neutral-400 group-hover:text-white'
                      }`}
                    >
                      {isFa
                        ? String(dept.count).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[+d])
                        : dept.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. THE ATELIER GALLERY GRID (Dark Obsidian Stage Contrasting Light About Section) */}
      <div className="w-full rounded-3xl p-5 sm:p-7 lg:p-9 border transition-all duration-500 relative overflow-hidden bg-brand-dark border-black/15 shadow-2xl">
        {/* Subtle Architectural Drafting Grid Background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-25"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)
            `,
            backgroundSize: '36px 36px',
          }}
        />

        {/* Ambient Soft Studio Spotlight */}
        <div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full pointer-events-none filter blur-3xl opacity-15"
          style={{ backgroundColor: galleryAccent }}
        />

        {/* Dynamic & Scalable Member Cards Grid (Clean cross-fade without popLayout blink) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedDept}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className={`relative z-10 grid ${gridLayoutClass}`}
          >
            {displayedMembers.map((member) => {
              const isHovered = hoveredCardId === member.id;
              const candidates = getCandidateUrls(member.image, true);
              const resolvedSrc = candidates[0] || member.image;

              return (
                <div
                  key={member.id}
                  onMouseEnter={() => setHoveredCardId(member.id)}
                  onMouseLeave={() => setHoveredCardId(null)}
                  className="group relative rounded-2xl overflow-hidden transition-all duration-300 border flex flex-col bg-brand-surface/95 hover:border-[#fff083]/80 border-white/10 shadow-md hover:shadow-2xl hover:-translate-y-1"
                >
                  {/* Member Portrait Frame */}
                  <div className="relative w-full aspect-[3/4] overflow-hidden bg-neutral-800">
                    <img
                      src={resolvedSrc}
                      alt={isFa ? member.nameFa : member.nameEn}
                      loading="eager"
                      decoding="async"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (target.src !== member.image && !target.dataset.fallbackUsed) {
                          target.dataset.fallbackUsed = '1';
                          target.src = member.image;
                        }
                      }}
                      className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105 filter contrast-[1.03]"
                      draggable={false}
                    />

                    {/* Gradient Tint at Bottom for Contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                    {/* Status Badge: Co-Founder (100% Equal for all 3 Founders) or Department Badge */}
                    <div className="absolute top-2.5 right-2.5 z-10">
                      {member.isFounder ? (
                        <span
                          className="px-2 py-0.5 rounded-md text-[9px] sm:text-[10px] font-bold tracking-wider uppercase shadow-md flex items-center gap-1"
                          style={{
                            backgroundColor: galleryAccent,
                            color: '#222222',
                          }}
                        >
                          <Sparkles className="w-2.5 h-2.5" />
                          <span>{isFa ? 'هم‌بنیان‌گذار' : 'CO-FOUNDER'}</span>
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-md text-[9px] sm:text-[10px] font-bold bg-black/60 backdrop-blur-xs text-white border border-white/10 uppercase">
                          {isFa ? member.badgeFa : member.badgeEn}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Clean Minimal Typography Strip: Name & Auto-Scrolling Marquee Role */}
                  <div className="p-3.5 sm:p-4 text-center sm:text-start transition-colors bg-brand-surface">
                    <h4 className="text-base sm:text-lg font-bold tracking-tight truncate text-white">
                      {isFa ? member.nameFa : member.nameEn}
                    </h4>

                    {/* Role with Auto-Marquee Scroll on Hover if Long */}
                    <div className="mt-0.5">
                      <MarqueeRole
                        text={isFa ? member.roleFa : member.roleEn}
                        isHovered={isHovered}
                        isFa={isFa}
                        isNight={isNight}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
}
