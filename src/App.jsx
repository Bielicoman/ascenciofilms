import React, { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import useIsMobile from './hooks/useMobile';
import MobileProjectRow from './components/MobileProjectRow';

// --- DADOS (SEUS PROJETOS) ---
const PROJECTS = [
  { id: 1, title: "CICATRIZES", category: "Documentário", quality: "4K", img: "https://img.youtube.com/vi/NwesZCYbSx0/maxresdefault.jpg", url: "https://www.youtube.com/embed/NwesZCYbSx0" },
  { id: 2, title: "SAUDADE", category: "Clipes", quality: "4K", img: "https://img.youtube.com/vi/Mul19Lfeo7Y/maxresdefault.jpg", url: "https://www.youtube.com/embed/Mul19Lfeo7Y" },
  { id: 3, title: "O ORÁCULO", category: "Reality Show", quality: "HD", img: "https://img.youtube.com/vi/efa_PSKMHLk/maxresdefault.jpg", url: "https://www.youtube.com/embed/efa_PSKMHLk" },
  { id: 4, title: "BÁRBARA", category: "Cinema", quality: "4K", img: "https://img.youtube.com/vi/p6SIYQ2c2Bw/maxresdefault.jpg", url: "https://www.youtube.com/embed/p6SIYQ2c2Bw" },
  { id: 5, title: "O PESO DAS PALAVRAS", category: "Cinema", quality: "4K", img: "https://img.youtube.com/vi/h5vbvGte3oM/maxresdefault.jpg", url: "https://www.youtube.com/embed/h5vbvGte3oM" },
  { id: 6, title: "CICATRIZES - MAKING OF", category: "Bastidores", quality: "HD", img: "https://img.youtube.com/vi/lJT58HZHD7g/maxresdefault.jpg", url: "https://www.youtube.com/embed/lJT58HZHD7g" },
  { id: 7, title: "LEMBRA", category: "Clipes", quality: "4K", img: "https://img.youtube.com/vi/DAglqbQTK4c/maxresdefault.jpg", url: "https://www.youtube.com/embed/DAglqbQTK4c" },
  { id: 8, title: "PRISMA BRASIL", category: "Turnê EUA", quality: "4K", img: "https://img.youtube.com/vi/g2MK7F0Adqc/maxresdefault.jpg", url: "https://www.youtube.com/embed/g2MK7F0Adqc" },
  { id: 9, title: "NÃO ME ENVERGONHO DO EVANGÉLIO", category: "Clipes", quality: "4K", img: "https://img.youtube.com/vi/ijf0p0naTcg/maxresdefault.jpg", url: "https://www.youtube.com/embed/ijf0p0naTcg" },
  { id: 10, title: "HOSPEDANDO ANJOS SEM SABER", category: "Clipes", quality: "4K", img: "https://img.youtube.com/vi/htIKc_vVDt0/maxresdefault.jpg", url: "https://www.youtube.com/embed/htIKc_vVDt0" },
  { id: 11, title: "O NOME", category: "Clipes", quality: "4K", img: "https://img.youtube.com/vi/bWVmk45mSl8/maxresdefault.jpg", url: "https://www.youtube.com/embed/bWVmk45mSl8" },
  { id: 12, title: "REPORTAGEM REVISTA NT OBREIROS APSO", category: "Documentário", quality: "4K", img: "https://img.youtube.com/vi/ve98tQXXLiQ/maxresdefault.jpg", url: "https://www.youtube.com/embed/ve98tQXXLiQ" },
  { id: 13, title: "MEDITAÇÃO PATRÍCIA DE PAIVA", category: "Documentário", quality: "4K", img: "https://img.youtube.com/vi/R8s2cjlf98k/maxresdefault.jpg", url: "https://www.youtube.com/embed/R8s2cjlf98k" },
  { id: 14, title: "GRATIDÃO", category: "Clipes", quality: "4K", img: "https://img.youtube.com/vi/0xftXOdbiDU/maxresdefault.jpg", url: "https://www.youtube.com/embed/0xftXOdbiDU" },
  { id: 15, title: "NOSSO JEITO DE AMAR", category: "Documentário", quality: "4K", img: "https://img.youtube.com/vi/RRfgyZBCGn4/maxresdefault.jpg", url: "https://www.youtube.com/embed/RRfgyZBCGn4" },
  { id: 16, title: "OH, QUÃO LINDO ESSE NOME É", category: "Clipes", quality: "4K", img: "https://img.youtube.com/vi/GWZWbLaovLY/maxresdefault.jpg", url: "https://www.youtube.com/embed/GWZWbLaovLY" },
  { id: 17, title: "REPORTAGEM REVISTA NT AICOM", category: "Documentário", quality: "4K", img: "https://img.youtube.com/vi/4GKvcH-o55M/maxresdefault.jpg", url: "https://www.youtube.com/embed/4GKvcH-o55M" },
  { id: 18, title: "O MELHOR DE MIM - MAKING OF", category: "Bastidores", quality: "4K", img: "https://img.youtube.com/vi/TD3uPps-RQ4/maxresdefault.jpg", url: "https://www.youtube.com/embed/TD3uPps-RQ4" },
];

const CATEGORIES = [
  { id: 'all', name: 'Todos' },
  { id: 'Documentário', name: 'Docs' },
  { id: 'Clipes', name: 'Clipes' },
  { id: 'Cinema', name: 'Cinema' },
  { id: 'Reality Show', name: 'Reality Show' },
  { id: 'Bastidores', name: 'Bastidores' },
];
const CLIENTS = ["NOVO TEMPO", "UNASP", "MAB", "PRISMA BRASIL", "KIGER", "CALIFORNIA DREAMS"];

// --- INSTAGRAM FEED ---
// Para atualizar: abra cada post no Instagram → copie o código da URL instagram.com/p/SHORTCODE/
const INSTAGRAM_POSTS = [
  { id: 1, shortcode: 'DFrhBcbugWK' },
  { id: 2, shortcode: 'DFO1QFhOMBL' },
  { id: 3, shortcode: 'DE9J_PfOFAA' },
  { id: 4, shortcode: 'DEp1AuAuUEu' },
  { id: 5, shortcode: 'DEJhqPWOMZd' },
  { id: 6, shortcode: 'DDhYkLvOsJx' },
  { id: 7, shortcode: 'C_bFmHhOb3H' },
  { id: 8, shortcode: 'C9vFsVeObmG' },
  { id: 9, shortcode: 'C9RrP8nOJPf' },
];

// --- CONTEXTO DO CURSOR ---
const CursorContext = createContext();

const CursorProvider = ({ children }) => {
  const [cursorVariant, setCursorVariant] = useState('default');
  return (
    <CursorContext.Provider value={{ cursorVariant, setCursorVariant }}>
      {children}
    </CursorContext.Provider>
  );
};

const useCursor = () => useContext(CursorContext);

// --- CONTEXTO DE TEMA (DARK/LIGHT) ---
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');

  // Atualiza as variáveis CSS globais quando o tema muda
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.style.setProperty('--bg-color', '#020202');
      root.style.setProperty('--text-color', '#ffffff');
      root.style.setProperty('--glass-bg', 'rgba(255, 255, 255, 0.03)');
      root.style.setProperty('--glass-border', 'rgba(255, 255, 255, 0.1)');
      root.style.setProperty('--glass-shadow', 'rgba(0, 0, 0, 0.5)');
      root.style.setProperty('--accent-color', '#2997FF');
      root.style.setProperty('--muted-text', '#cccccc');
      root.style.setProperty('--glass-text-color', '#ffffff'); // New: Text inside glass is always white
    } else {
      // LIGHT MODE — Clean, Modern, Apple-inspired
      root.style.setProperty('--bg-color', '#F5F5F7');
      root.style.setProperty('--text-color', '#1D1D1F');
      root.style.setProperty('--glass-bg', 'rgba(255, 255, 255, 0.72)');
      root.style.setProperty('--glass-border', 'rgba(0, 0, 0, 0.08)');
      root.style.setProperty('--glass-shadow', 'rgba(0, 0, 0, 0.1)');
      root.style.setProperty('--accent-color', '#0071E3');
      root.style.setProperty('--muted-text', '#6E6E73');
      root.style.setProperty('--glass-text-color', '#1D1D1F');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => useContext(ThemeContext);

// --- COMPONENTES VISUAIS ---

// 1. MOUSE ORB GIGANTE
// 1. MOUSE ORB GIGANTE (COM TRANSFORMAÇÃO REFINADA)
// 1. MOUSE ORB GIGANTE (COM TRANSFORMAÇÃO REFINADA & FADE OUT)
const MouseOrb = () => {
  const isMobile = useIsMobile();
  const { cursorVariant } = useCursor();
  const { theme } = useTheme();

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Stable handler — no stale closure on isVisible
    const moveCursor = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);
    };
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []); // Empty deps — listeners registered once, never torn down unnecessarily

  // Early return AFTER all hooks
  if (isMobile) return null;

  const borderColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.2)';
  const borderHover = theme === 'dark' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.5)';
  const bgColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.07)';
  const bgHover = theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.12)';

  const variants = {
    default: {
      width: 20,
      height: 20,
      borderRadius: '50% 50% 50% 50%',
      backgroundColor: bgColor,
      border: `1px solid ${borderColor}`,
      rotate: 0,
      scale: 1,
      opacity: 1,
    },
    hover: {
      width: 45,
      height: 45,
      borderRadius: '2% 50% 50% 50%',
      backgroundColor: bgHover,
      border: `1px solid ${borderHover}`,
      rotate: -15,
      scale: 1.1,
      opacity: 1,
    },
    text: {
      width: 4,
      height: 30,
      borderRadius: '4px 4px 4px 4px',
      backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)',
      border: 'none',
      rotate: 0,
      scale: 1,
      opacity: 1,
    },
    hidden: {
      opacity: 0,
      scale: 0.5,
    }
  };

  return (
    <motion.div
      variants={variants}
      animate={!isVisible ? 'hidden' : cursorVariant}
      transition={{
        default: { type: 'spring', stiffness: 500, damping: 28, mass: 0.4 },
        borderRadius: { type: 'tween', duration: 0.12, ease: 'easeOut' },
        rotate: { type: 'tween', duration: 0.15, ease: 'easeOut' },
        opacity: { type: 'tween', duration: 0.15 },
      }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        x: mouseX,
        y: mouseY,
        pointerEvents: 'none',
        zIndex: 99999,
        translateX: '-50%',
        translateY: '-50%',
        backdropFilter: 'blur(4px)',
        boxShadow: '0 2px 16px rgba(255,255,255,0.12), inset 0 1px 0 rgba(255,255,255,0.4)',
      }}
    />
  );
};


// 2. CARD 3D (COM GLARE E PARALLAX)
const TiltCard = ({ project, onClick }) => {
  const isMobile = useIsMobile();
  const { setCursorVariant } = useCursor();
  const [isHovered, setIsHovered] = useState(false);

  // Motion Values para inclinação
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Physics "Cinematic" (Mais pesado e suave)
  const springConfig = { stiffness: 100, damping: 30 };
  const rotateX = useSpring(useMotionValue(0), springConfig);
  const rotateY = useSpring(useMotionValue(0), springConfig);

  // Motion Values para Glare e Parallax
  const glareX = useSpring(0, { stiffness: 150, damping: 20 });
  const glareY = useSpring(0, { stiffness: 150, damping: 20 });
  const glareOpacity = useSpring(0, { stiffness: 200, damping: 20 });

  // Parallax da Imagem (Move o oposto do mouse para dar profundidade)
  const imgX = useSpring(0, springConfig);
  const imgY = useSpring(0, springConfig);

  function handleMouse(event) {
    if (isMobile) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Posição local do mouse (0 a 1)
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // Percentual (-0.5 a 0.5) para rotação
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    // Rotação
    rotateX.set(yPct * -12); // Invertido para tilt correto
    rotateY.set(xPct * 12);

    // Glare (Posição exata do pixel)
    glareX.set(mouseX);
    glareY.set(mouseY);
    glareOpacity.set(1); // Mostra o brilho

    // Parallax Imagem (Move sutilmente na direção oposta)
    imgX.set(xPct * -15);
    imgY.set(yPct * -15);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
    glareOpacity.set(0);
    imgX.set(0);
    imgY.set(0);
    setCursorVariant('default');
  }

  return (
    <motion.div
      className="glass-card"
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
        aspectRatio: '16/9',
        position: 'relative',
        cursor: 'none',
        overflow: 'hidden'
      }}
      onMouseMove={handleMouse}
      onMouseLeave={() => { handleMouseLeave(); setIsHovered(false); }}
      onMouseEnter={() => { setCursorVariant('hover'); setIsHovered(true); }}
      onClick={() => onClick(project)}
    >
      {/* IMAGEM / AUTOPLAY PREVIEW */}
      <div style={{ position: 'absolute', inset: 0, transform: 'translateZ(20px)', borderRadius: '20px', overflow: 'hidden' }}>
        {isHovered && !isMobile ? (
          <iframe
            src={`${project.url}?autoplay=1&mute=1&rel=0&modestbranding=1&controls=0`}
            style={{ width: '100%', height: '100%', border: 'none', position: 'absolute', inset: 0 }}
            allow="autoplay; fullscreen"
            allowFullScreen
            title={project.title}
          />
        ) : (
          <motion.img
            src={project.img}
            alt={project.title}
            style={{
              width: '110%',
              height: '110%',
              x: imgX,
              y: imgY,
              left: '-5%',
              top: '-5%',
              position: 'absolute',
              objectFit: 'cover',
              transition: 'scale 0.5s',
            }}
            whileHover={{ scale: 1.1 }}
          />
        )}
        {/* Gradient overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg-color) 0%, transparent 80%)', pointerEvents: 'none' }}></div>
        {/* Cursor capture overlay — prevents iframe from showing default cursor */}
        {isHovered && !isMobile && (
          <div style={{ position: 'absolute', inset: 0, zIndex: 10, cursor: 'none' }} />
        )}
      </div>

      {/* TEXTO (Flutuando acima - CINE MODE) */}
      {/* TEXTO (Flutuando acima - CINE MODE) */}
      <div style={{ position: 'absolute', bottom: 30, left: 30, right: 30, transform: 'translateZ(60px)', pointerEvents: 'none', zIndex: 20, textAlign: 'left', overflow: 'hidden' }}>
        {/* Category Badge */}
        <span style={{
          display: 'inline-block',
          padding: '6px 12px',
          borderRadius: '20px',
          background: 'var(--glass-bg)',
          border: '1px solid var(--glass-border)',
          backdropFilter: 'blur(10px)',
          fontSize: '10px', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase',
          marginBottom: '10px',
          color: 'var(--accent-color)',
          boxShadow: '0 4px 10px var(--glass-shadow)'
        }}>
          {project.category}
        </span>

        {/* Title */}
        <h3 style={{
          fontSize: '18px', // Ajustado para 1 linha
          fontWeight: 900,
          color: '#fff',
          textShadow: '0 10px 40px rgba(0,0,0,0.9)',
          lineHeight: 1.1,
          letterSpacing: '0.5px',
          margin: 0,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          maxWidth: '100%'
        }}>
          {project.title}
        </h3>
      </div>

      {/* GLARE LAYER (Brilho Dinâmico) */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          background: useMotionTemplate`radial-gradient(circle at ${glareX}px ${glareY}px, rgba(255,255,255,0.4) 0%, transparent 60%)`,
          opacity: glareOpacity,
          pointerEvents: 'none',
          mixBlendMode: 'overlay', // Funde com a imagem para parecer reflexo real
          zIndex: 50
        }}
      />

      {/* Borda Brilhante Extra no Hover (Opcional, mas elegante) */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '24px',
          border: '1px solid var(--glass-border)',
          opacity: glareOpacity, // Só brilha quando passa o mouse
          background: useMotionTemplate`radial-gradient(circle at ${glareX}px ${glareY}px, rgba(255,255,255,0.3) 0%, transparent 50%) border-box`,
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          pointerEvents: 'none',
          zIndex: 51
        }}
      />
    </motion.div>
  );
};

// 3. NOVO: ÍCONES DE CONTATO 3D GLASS (AQUI ESTÁ A MÁGICA)
// 3. ÍCONES DE CONTATO 3D GLASS (MAGNÉTICOS E COM GLARE)
// 4. SOCIAL TILE (Retangular, limpo, estilo "Dock")
const SocialTile = ({ href, icon, label, color }) => {
  const { setCursorVariant } = useCursor();

  return (
    <a href={href} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', cursor: 'none', width: '100%' }}>
      <motion.div
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        onMouseEnter={() => setCursorVariant('hover')}
        onMouseLeave={() => setCursorVariant('default')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          padding: '20px 30px',
          backgroundColor: 'var(--glass-bg)',
          border: '1px solid var(--glass-border)',
          borderRadius: '20px',
          transition: 'all 0.3s ease',
          position: 'relative',
          overflow: 'hidden',
          color: 'var(--glass-text-color)'
        }}
        className="social-tile"
      >
        {/* Hover Glow Background */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          style={{
            position: 'absolute', inset: 0,
            background: `linear-gradient(90deg, ${color}22, transparent)`,
            zIndex: 0
          }}
        />

        {/* Icon Container */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: '50px', height: '50px',
          borderRadius: '14px',
          background: `${color}20`,
          color: color,
          zIndex: 1
        }}>
          {React.cloneElement(icon, { size: 28 })}
        </div>

        {/* Text */}
        <div style={{ display: 'flex', flexDirection: 'column', zIndex: 1 }}>
          <span style={{ fontSize: '18px', fontWeight: 700, color: 'var(--glass-text-color)' }}>{label}</span>
          <span style={{ fontSize: '12px', color: 'var(--muted-text)', fontWeight: 500 }}>Conectar agora</span>
        </div>

        {/* Arrow (Visual cue) */}
        <div style={{ marginLeft: 'auto', color: 'var(--muted-text)', zIndex: 1 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </div>

      </motion.div>
    </a>
  );
};

// --- APP CONTENT (SEPARADO PARA USAR O CONTEXTO) ---

// ─── SHORTS VIEWER ───────────────────────────────────────────────────────────
const ShortsViewer = ({ items, startIndex = 0, onClose, mode = 'youtube' }) => {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [direction, setDirection] = useState(0);
  const { setCursorVariant } = useCursor();
  const total = items.length;
  const current = items[currentIndex];

  const goNext = useCallback(() => {
    if (currentIndex < total - 1) { setDirection(1); setCurrentIndex(i => i + 1); }
  }, [currentIndex, total]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) { setDirection(-1); setCurrentIndex(i => i - 1); }
  }, [currentIndex]);

  useEffect(() => {
    let lastWheel = 0;
    const onWheel = (e) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lastWheel < 650) return;
      lastWheel = now;
      if (e.deltaY > 0) goNext(); else goPrev();
    };
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('wheel', onWheel); window.removeEventListener('keydown', onKey); };
  }, [goNext, goPrev, onClose]);

  const slideV = {
    enter: (d) => ({ y: d > 0 ? '60%' : '-60%', opacity: 0, scale: 0.95 }),
    center: { y: 0, opacity: 1, scale: 1 },
    exit: (d) => ({ y: d > 0 ? '-60%' : '60%', opacity: 0, scale: 0.95 }),
  };

  const getSrc = (item) => {
    if (mode === 'instagram') return `https://www.instagram.com/p/${item.shortcode}/embed/captioned/`;
    return `${item.url}?autoplay=1&rel=0&modestbranding=1`;
  };

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === total - 1;
  const btnBase = {
    backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.18)',
    borderRadius: '50%', width: 52, height: 52, cursor: 'none',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'all 0.2s',
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: 'fixed', inset: 0, zIndex: 10000,
        background: 'rgba(0,0,0,0.96)', backdropFilter: 'blur(24px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'none',
      }}
    >
      {/* CLOSE */}
      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
        onClick={onClose}
        onMouseEnter={() => setCursorVariant('hover')} onMouseLeave={() => setCursorVariant('default')}
        style={{ ...btnBase, position: 'absolute', top: 24, right: 24, background: 'rgba(255,255,255,0.08)', color: '#fff', zIndex: 10 }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
      </motion.button>

      {/* COUNTER */}
      <div style={{
        position: 'absolute', top: 28, left: '50%', transform: 'translateX(-50%)',
        background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)',
        backdropFilter: 'blur(12px)', borderRadius: 20, padding: '7px 18px',
        color: '#fff', fontSize: 12, fontWeight: 700, letterSpacing: 2,
      }}>
        {currentIndex + 1} / {total}
      </div>

      {/* MAIN CONTENT */}
      <div style={{ position: 'relative', width: mode === 'instagram' ? 'min(90vw, 480px)' : 'min(90vw, 960px)' }}>
        <AnimatePresence custom={direction} mode="wait">
          <motion.div key={currentIndex} custom={direction}
            variants={slideV} initial="enter" animate="center" exit="exit"
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
            style={{
              aspectRatio: mode === 'instagram' ? '4/5' : '16/9',
              borderRadius: 24, overflow: 'hidden',
              background: mode === 'instagram' ? '#fff' : '#000',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 40px 80px rgba(0,0,0,0.6)',
            }}
          >
            <iframe src={getSrc(current)} style={{ width: '100%', height: '100%', border: 'none' }}
              allow="autoplay; fullscreen; clipboard-write; encrypted-media; picture-in-picture"
              allowFullScreen title={`item-${currentIndex}`}
            />
          </motion.div>
        </AnimatePresence>

        {/* VIDEO INFO (YouTube mode) */}
        {mode === 'youtube' && current.title && (
          <motion.div key={`info-${currentIndex}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            style={{ padding: '20px 4px 0' }}
          >
            <span style={{ color: 'var(--accent-color)', fontSize: 11, fontWeight: 800, letterSpacing: 3, textTransform: 'uppercase' }}>
              {current.category}
            </span>
            <h3 style={{ fontSize: 20, fontWeight: 900, color: '#fff', marginTop: 6 }}>{current.title}</h3>
          </motion.div>
        )}
      </div>

      {/* NAV BUTTONS */}
      <div style={{ position: 'absolute', right: 28, top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {[
          { fn: goPrev, disabled: isFirst, icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="18 15 12 9 6 15" /></svg> },
          { fn: goNext, disabled: isLast, icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9" /></svg> },
        ].map(({ fn, disabled, icon }, i) => (
          <motion.button key={i} onClick={fn} disabled={disabled}
            whileHover={!disabled ? { scale: 1.1 } : {}} whileTap={!disabled ? { scale: 0.9 } : {}}
            onMouseEnter={() => setCursorVariant('hover')} onMouseLeave={() => setCursorVariant('default')}
            style={{ ...btnBase, background: disabled ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.12)', color: disabled ? 'rgba(255,255,255,0.25)' : '#fff' }}
          >{icon}</motion.button>
        ))}
      </div>

      {/* PROGRESS DOTS */}
      <div style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8 }}>
        {items.map((_, i) => (
          <motion.button key={i}
            onClick={() => { setDirection(i > currentIndex ? 1 : -1); setCurrentIndex(i); }}
            onMouseEnter={() => setCursorVariant('hover')} onMouseLeave={() => setCursorVariant('default')}
            animate={{ width: i === currentIndex ? 22 : 8, opacity: i === currentIndex ? 1 : 0.35 }}
            style={{ height: 8, borderRadius: 4, background: i === currentIndex ? 'var(--accent-color)' : '#fff', border: 'none', padding: 0, cursor: 'none' }}
          />
        ))}
      </div>
    </motion.div>
  );
};

const AppContent = () => {
  const isMobile = useIsMobile();
  const { setCursorVariant } = useCursor();
  const [shorts, setShorts] = useState({ open: false, index: 0 });
  const [heroIndex, setHeroIndex] = useState(() => Math.floor(Math.random() * PROJECTS.length));
  const [scrolled, setScrolled] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const openShorts = useCallback((index) => setShorts({ open: true, index }), []);

  useEffect(() => {
    const scrollHandler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', scrollHandler);
    const heroTimer = setInterval(() => {
      setHeroIndex(prev => {
        let next;
        do { next = Math.floor(Math.random() * PROJECTS.length); } while (next === prev);
        return next;
      });
    }, 10000);
    return () => {
      window.removeEventListener('scroll', scrollHandler);
      clearInterval(heroTimer);
    };
  }, []);

  const filteredProjects = selectedCategory === 'all' ? PROJECTS : PROJECTS.filter(p => p.category === selectedCategory);

  return (
    <div style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)', minHeight: '100vh', fontFamily: "'Outfit', sans-serif", overflowX: 'hidden', cursor: isMobile ? 'auto' : 'none', transition: 'background-color 0.5s ease, color 0.5s ease' }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;500;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        :root {
          transition: background-color 0.5s ease, color 0.5s ease;
        }

        .glass-luxury {
          background: var(--glass-bg);
          backdrop-filter: blur(30px) saturate(180%);
          -webkit-backdrop-filter: blur(30px) saturate(180%);
          border: 1px solid var(--glass-border);
          box-shadow: 0 10px 40px var(--glass-shadow), inset 0 1px 0 rgba(255,255,255,0.15);
          transition: all 0.5s ease;
        }
        .glass-card {
          border-radius: 24px;
          border: 1px solid var(--glass-border);
          box-shadow: 0 20px 60px var(--glass-shadow), inset 0 1px 0 rgba(255,255,255,0.12);
          transition: transform 0.3s, box-shadow 0.3s;
          background: var(--glass-bg);
          backdrop-filter: blur(20px) saturate(160%);
          -webkit-backdrop-filter: blur(20px) saturate(160%);
        }
        .glass-btn {
          background: var(--glass-bg);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid var(--glass-border);
          color: var(--glass-text-color);
          transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
          cursor: none;
          box-shadow: 0 4px 16px var(--glass-shadow), inset 0 1px 0 rgba(255,255,255,0.2);
        }
        .glass-btn:hover {
          transform: translateY(-2px) scale(1.01);
          box-shadow: 0 8px 32px var(--glass-shadow), 0 0 20px rgba(41, 151, 255, 0.2), inset 0 1px 0 rgba(255,255,255,0.3);
          border-color: var(--accent-color);
        }
        .glass-btn:active {
          transform: translateY(0) scale(0.99);
        }
        .glass-input {
          width: 100%;
          background: rgba(0,0,0,0.1);
          border: 1px solid var(--glass-border);
          padding: 15px;
          border-radius: 12px;
          color: var(--text-color);
          outline: none;
          transition: 0.3s;
          font-family: 'Outfit', sans-serif;
        }
        .glass-input:focus { border-color: var(--accent-color); background: rgba(0,0,0,0.05); }
        .glass-input::placeholder { color: var(--muted-text); }
        
        .film-grain {
          position: fixed; inset: 0; pointer-events: none; z-index: 10; opacity: 0.04;
          background-image: url("https://grainy-gradients.vercel.app/noise.svg");
          mix-blend-mode: overlay;
        }

        /* Scrollbar */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: var(--bg-color); }
        ::-webkit-scrollbar-thumb { background: var(--glass-border); border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: var(--accent-color); }

        .hover-link:hover { color: var(--accent-color) !important; }

        .social-tile {
          backdrop-filter: blur(20px) saturate(160%);
          -webkit-backdrop-filter: blur(20px) saturate(160%);
          box-shadow: 0 4px 20px var(--glass-shadow), inset 0 1px 0 rgba(255,255,255,0.12);
          transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1) !important;
        }
        .social-tile:hover {
          transform: translateY(-3px) !important;
          box-shadow: 0 12px 40px var(--glass-shadow), inset 0 1px 0 rgba(255,255,255,0.2) !important;
        }
      `}</style>

      <div className="film-grain"></div>
      <MouseOrb />

      {/* MENU */}
      {!isMobile ? (
        // DESKTOP NAVBAR
        <nav style={{
          position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)',
          width: scrolled ? '560px' : '90%',
          maxWidth: '1200px', height: '70px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '0 30px', borderRadius: '50px', zIndex: 100, transition: 'all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
        }} className="glass-luxury">
          {/* LOGO LINK */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={() => setCursorVariant('default')}
            style={{ textDecoration: 'none', cursor: 'none' }}
          >
            <div style={{ fontSize: '18px', fontWeight: 900, letterSpacing: '-0.5px', color: 'var(--glass-text-color)' }}>
              ASCENCIO<span style={{ color: 'var(--accent-color)' }}>.FX</span>
            </div>
          </a>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ display: 'flex', gap: '30px' }}>
              {['Portfólio', 'Sobre', 'Contato'].map(item => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const id = item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                    const element = document.getElementById(id);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  onMouseEnter={() => setCursorVariant('hover')}
                  onMouseLeave={() => setCursorVariant('default')}
                  style={{ color: 'var(--muted-text)', textDecoration: 'none', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', cursor: 'none', transition: 'color 0.3s' }}
                  className="hover-link"
                >
                  {item}
                </a>
              ))}
            </div>
            <ThemeToggle />
          </div>
        </nav>
      ) : (
        // MOBILE NAVBAR (Simple Top Logo + Bottom Dock)
        <>
          {/* Top Logo */}
          <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, height: '60px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 99, background: 'linear-gradient(to bottom, var(--bg-color) 0%, transparent 100%)',
            pointerEvents: 'none' // Let clicks pass through to underlying elements if needed, but text needs to be visible
          }}>
            <div style={{ fontSize: '18px', fontWeight: 900, letterSpacing: '-0.5px', color: 'var(--text-color)', textShadow: '0 2px 10px rgba(0,0,0,0.5)', pointerEvents: 'auto' }}>
              ASCENCIO<span style={{ color: 'var(--accent-color)' }}>.FX</span>
            </div>
          </div>

          {/* Bottom Dock */}
          <nav style={{
            position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)',
            width: '90%', maxWidth: '400px', height: '65px',
            display: 'flex', justifyContent: 'space-around', alignItems: 'center',
            padding: '0 10px', borderRadius: '25px', zIndex: 100,
            background: 'var(--glass-bg)', backdropFilter: 'blur(20px)',
            border: '1px solid var(--glass-border)', boxShadow: '0 10px 30px var(--glass-shadow)'
          }}>
            {['Portfólio', 'Sobre', 'Contato'].map(item => (
              <a
                key={item}
                href={`#${item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`}
                onClick={(e) => {
                  e.preventDefault();
                  const id = item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                  const element = document.getElementById(id);
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                style={{
                  color: 'var(--text-color)', textDecoration: 'none', fontSize: '10px',
                  fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px'
                }}
              >
                {/* Icons could be added here later */}
                {item}
              </a>
            ))}
            <div style={{ width: '1px', height: '20px', background: 'var(--glass-border)' }}></div>
            <ThemeToggle />
          </nav>
        </>
      )}

      {/* HERO */}
      <header style={{ height: '100vh', width: '100%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={heroIndex}
            initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.5 }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <img src={PROJECTS[heroIndex].img} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6, filter: 'blur(12px) brightness(0.8)' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, transparent 0%, var(--bg-color) 90%)' }}></div>
          </motion.div>
        </AnimatePresence>

        <div style={{ position: 'relative', zIndex: 20, textAlign: 'center', padding: '0 20px', maxWidth: '1000px' }}>
          <motion.div key={`text-${heroIndex}`} initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
            <span style={{ color: 'var(--accent-color)', fontSize: '12px', fontWeight: 800, letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '20px', display: 'block' }}>FILMMAKER | AI EDITOR</span>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 900, lineHeight: 0.9, marginBottom: '30px', textTransform: 'uppercase', textShadow: '0 20px 50px var(--glass-shadow)', color: 'var(--text-color)' }}
              onMouseEnter={() => setCursorVariant('text')} onMouseLeave={() => setCursorVariant('default')}
            >
              {PROJECTS[heroIndex].title}
            </h1>
            <p style={{ fontSize: '18px', color: 'var(--muted-text)', marginBottom: '40px', fontWeight: 300, maxWidth: '600px', margin: '0 auto 40px' }}
              onMouseEnter={() => setCursorVariant('text')} onMouseLeave={() => setCursorVariant('default')}
            >
              Transformando ideias em cinema.
            </p>
            <button
              onClick={() => openShorts(heroIndex)}
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
              className="glass-btn"
              style={{ padding: '16px 40px', borderRadius: '50px', fontSize: '12px', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase' }}
            >
              Assistir
            </button>
          </motion.div>
        </div>
      </header>

      {/* MARQUEE */}
      <div className="glass-luxury" style={{ padding: '30px 0', borderLeft: 'none', borderRight: 'none', overflow: 'hidden', whiteSpace: 'nowrap' }}>
        <div style={{ display: 'inline-block', animation: 'scroll 25s linear infinite' }}>
          {[...CLIENTS, ...CLIENTS, ...CLIENTS].map((c, i) => (
            <span key={i} className="glass-luxury" style={{
              display: 'inline-block',
              padding: '12px 30px',
              borderRadius: '50px',
              fontSize: '16px',
              fontWeight: 800,
              color: 'var(--text-color)',
              marginRight: '40px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              border: '1px solid var(--glass-border)',
              background: 'var(--glass-bg)'
            }}>
              {c}
            </span>
          ))}
        </div>
        <style>{`@keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>
      </div>

      {/* PORTFOLIO */}
      <section id="portfolio" style={{ paddingTop: '100px', paddingBottom: '100px', width: '100%', maxWidth: '1200px', margin: '0 auto', paddingLeft: '20px', paddingRight: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '60px' }}>
          <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)', fontWeight: 900, textTransform: 'uppercase', lineHeight: 0.9 }}>Portfólio</h2>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
                className="glass-btn"
                style={{ padding: '10px 20px', borderRadius: '30px', fontSize: '11px', fontWeight: 700, background: selectedCategory === cat.id ? 'var(--accent-color)' : 'var(--glass-bg)', color: selectedCategory === cat.id ? '#fff' : 'var(--glass-text-color)' }}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {isMobile && selectedCategory === 'all' ? (
          // NETFLIX STYLE MOBILE VIEW
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginLeft: '-20px', marginRight: '-20px' }}>
            {CATEGORIES.filter(c => c.id !== 'all').map(cat => {
              const catProjects = PROJECTS.filter(p => p.category === cat.id);
              if (catProjects.length === 0) return null;
              return (
                <MobileProjectRow
                  key={cat.id}
                  title={cat.name}
                  projects={catProjects}
                  onProjectClick={(p) => setActiveModal(p.url)}
                />
              );
            })}
          </div>
        ) : (
          // STANDARD GRID VIEW (Desktop or Filtered Mobile)
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(350px, 1fr))', gap: '40px' }}>
            {filteredProjects.map((p, idx) => <TiltCard key={p.id} project={p} onClick={() => openShorts(PROJECTS.indexOf(p))} />)}
          </div>
        )}
      </section>

      {/* SOBRE */}
      <section id="sobre" style={{ paddingTop: '100px', paddingBottom: '100px', width: '100%', maxWidth: '1200px', margin: '0 auto', paddingLeft: '20px', paddingRight: '20px', display: 'flex', justifyContent: 'center' }}>
        <div className="glass-luxury" style={{ width: '100%', padding: isMobile ? '30px' : '60px', borderRadius: '40px', display: 'flex', gap: isMobile ? '30px' : '60px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ flex: '1 1 300px', height: '450px', borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
            <img src="/alex.jpg" alt="Alex Ascencio" style={{ width: '100%', height: '130%', objectFit: 'cover' }} />
          </div>
          <div style={{ flex: '1 1 400px' }}>
            <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)', fontWeight: 900, lineHeight: 1, marginBottom: '30px', textTransform: 'uppercase', color: 'var(--text-color)' }}
              onMouseEnter={() => setCursorVariant('text')} onMouseLeave={() => setCursorVariant('default')}
            >
              Visão.<br /><span style={{ color: 'var(--accent-color)' }}>Técnica.</span><br />Impacto.
            </h2>
            <p style={{ color: 'var(--muted-text)', fontSize: '18px', lineHeight: 1.6, marginBottom: '30px' }}
              onMouseEnter={() => setCursorVariant('text')} onMouseLeave={() => setCursorVariant('default')}
            >
              Fundada por <strong>Alex Ascencio</strong>, a <strong>Ascencio FX</strong> carrega a chancela do prêmio <strong>EXPOCOM 2025</strong> e a expertise técnica adquirida em produções globais, como as turnês do <strong>Prisma Brasil</strong>. Aqui, a edição não é apenas técnica — é a ferramenta que traduz grandes histórias em conexões humanas profundas.
            </p>
            <div style={{ display: 'flex', gap: '15px' }}>
              {['Vencedor EXPOCOM', 'Direção', 'Edição'].map(tag => (
                <span key={tag} style={{ padding: '8px 16px', borderRadius: '20px', border: '1px solid var(--glass-border)', fontSize: '12px', fontWeight: 600, color: 'var(--muted-text)' }}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* INSTAGRAM FEED — Behold.so auto-updating widget */}
      <section id="instagram" style={{ paddingTop: '100px', paddingBottom: '60px', width: '100%', maxWidth: '1200px', margin: '0 auto', paddingLeft: '20px', paddingRight: '20px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <span style={{ color: 'var(--accent-color)', fontSize: '11px', fontWeight: 800, letterSpacing: '3px', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>@alexascencioai</span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 900, textTransform: 'uppercase', lineHeight: 0.9, color: 'var(--text-color)' }}>
              Feed<br /><span style={{ color: 'var(--accent-color)' }}>Instagram</span>
            </h2>
          </div>
          <a
            href="https://instagram.com/alexascencioai" target="_blank" rel="noreferrer"
            onMouseEnter={() => setCursorVariant('hover')} onMouseLeave={() => setCursorVariant('default')}
            style={{
              textDecoration: 'none', padding: '12px 28px', borderRadius: '30px',
              border: '1px solid var(--glass-border)', background: 'var(--glass-bg)',
              backdropFilter: 'blur(12px)', color: 'var(--glass-text-color)',
              fontSize: '12px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase',
              cursor: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px',
              boxShadow: '0 4px 20px var(--glass-shadow), inset 0 1px 0 rgba(255,255,255,0.15)',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            Ver Perfil
          </a>
        </div>
        {/* Behold.so widget — atualiza automaticamente quando você posta no Instagram */}
        <div style={{ borderRadius: '24px', overflow: 'hidden', width: '100%', minHeight: '600px' }}>
          <behold-widget feed-id="Nc4L3CKxxfIUqr3Ae0w3" style={{ display: 'block', width: '100%' }}></behold-widget>
        </div>
      </section>

      {/* CONTATO - UNIFIED CRYSTAL DASHBOARD */}

      <section id="contato" style={{ paddingTop: '100px', paddingBottom: '120px', width: '100%', maxWidth: '1200px', margin: '0 auto', paddingLeft: '20px', paddingRight: '20px', display: 'flex', justifyContent: 'center' }}>
        <div className="glass-luxury" style={{
          width: '100%',
          borderRadius: '40px',
          padding: isMobile ? '30px' : '60px',
          display: 'grid',

          gridTemplateColumns: isMobile ? '1fr' : '1fr 1.5fr',
          gap: isMobile ? '40px' : '60px',
          background: 'var(--glass-bg)',
          boxShadow: '0 40px 80px var(--glass-shadow), inset 0 1px 0 var(--glass-border)'
        }}>

          {/* Lado Esquerdo - Social */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '40px' }}>
            <div>
              <h2 style={{ fontSize: '3rem', fontWeight: 900, lineHeight: 0.9, textTransform: 'uppercase', marginBottom: '10px', color: 'var(--text-color)' }}
                onMouseEnter={() => setCursorVariant('text')} onMouseLeave={() => setCursorVariant('default')}>
                Fale<br /><span style={{ color: 'var(--accent-color)' }}>Comigo.</span>
              </h2>
              <p style={{ color: 'var(--muted-text)', fontSize: '14px', maxWidth: '300px' }}
                onMouseEnter={() => setCursorVariant('text')} onMouseLeave={() => setCursorVariant('default')}>
                Vamos criar algo extraordinário juntos. Escolha sua plataforma preferida.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%' }}>
              <SocialTile
                href="https://wa.me/5515997569880" color="#25D366" label="WhatsApp"
                icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>}
              />
              <SocialTile
                href="https://instagram.com/alexascencioai" color="#E1306C" label="Instagram"
                icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>}
              />
              <SocialTile
                href="https://www.linkedin.com/in/ascencioalexgabriel/" color="#0077B5" label="LinkedIn"
                icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>}
              />
            </div>
          </div>

          {/* Lado Direito - Form (Redesign Minimalista) */}
          <div style={{ background: 'var(--glass-bg)', padding: '40px', borderRadius: '30px', border: '1px solid var(--glass-border)' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '30px', color: 'var(--glass-text-color)' }}>Envie uma Mensagem</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const name = e.target.name.value;
              const email = e.target.email.value;
              const message = e.target.message.value;
              const text = `Olá, Alex! Me chamo *${name}* (${email}).%0A%0A*Mensagem:*%0A${message}`;
              window.open(`https://wa.me/5515997569880?text=${text}`, '_blank');
            }} style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <div style={{ position: 'relative' }}>
                <input type="text" name="name" required style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid var(--glass-border)', color: '#ffffff', fontSize: '16px', padding: '10px 0', outline: 'none', transition: '0.3s' }} placeholder="SEU NOME"
                  onFocus={(e) => e.target.style.borderBottom = '1px solid var(--accent-color)'}
                  onBlur={(e) => e.target.style.borderBottom = '1px solid var(--glass-border)'}
                  onMouseEnter={() => setCursorVariant('text')} onMouseLeave={() => setCursorVariant('default')}
                />
              </div>
              <div style={{ position: 'relative' }}>
                <input type="email" name="email" required style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid var(--glass-border)', color: '#ffffff', fontSize: '16px', padding: '10px 0', outline: 'none', transition: '0.3s' }} placeholder="SEU EMAIL"
                  onFocus={(e) => e.target.style.borderBottom = '1px solid var(--accent-color)'}
                  onBlur={(e) => e.target.style.borderBottom = '1px solid var(--glass-border)'}
                  onMouseEnter={() => setCursorVariant('text')} onMouseLeave={() => setCursorVariant('default')}
                />
              </div>
              <div style={{ position: 'relative' }}>
                <textarea name="message" rows="4" required style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid var(--glass-border)', color: '#fff', fontSize: '16px', padding: '10px 0', outline: 'none', transition: '0.3s', resize: 'none', fontFamily: 'inherit' }} placeholder="SUA IDEIA"
                  onFocus={(e) => e.target.style.borderBottom = '1px solid var(--accent-color)'}
                  onBlur={(e) => e.target.style.borderBottom = '1px solid var(--glass-border)'}
                  onMouseEnter={() => setCursorVariant('text')} onMouseLeave={() => setCursorVariant('default')}
                />
              </div>

              <button
                type="submit"
                className="glass-btn"
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
                style={{ marginTop: '20px', padding: '20px', borderRadius: '15px', fontWeight: 800, background: '#fff', color: '#000', fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', border: 'none' }}
              >
                Confirmar Envio
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer style={{ padding: '60px', textAlign: 'center', color: 'var(--muted-text)', fontSize: '12px', fontWeight: 700, letterSpacing: '2px', borderTop: '1px solid var(--glass-border)' }}>
        © 2026 ASCENCIO FX.
      </footer>

      {/* SHORTS VIEWER — Portfolio */}
      <AnimatePresence>
        {shorts.open && !shorts.mode && (
          <ShortsViewer
            items={PROJECTS}
            startIndex={shorts.index}
            onClose={() => setShorts({ open: false, index: 0 })}
            mode="youtube"
          />
        )}
      </AnimatePresence>

      {/* SHORTS VIEWER — Instagram */}
      <AnimatePresence>
        {shorts.open && shorts.mode === 'instagram' && (
          <ShortsViewer
            items={INSTAGRAM_POSTS}
            startIndex={shorts.index}
            onClose={() => setShorts({ open: false, index: 0 })}
            mode="instagram"
          />
        )}
      </AnimatePresence>


      <style>{`
         .hide-scrollbar::-webkit-scrollbar { display: none; }
         .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>


    </div >
  );
};

// --- THEME TOGGLE BUTTON ---
const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const { setCursorVariant } = useCursor();

  return (
    <button
      onClick={toggleTheme}
      onMouseEnter={() => setCursorVariant('hover')}
      onMouseLeave={() => setCursorVariant('default')}
      style={{
        background: 'transparent',
        border: 'none',
        cursor: 'none',
        padding: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--text-color)',
        marginLeft: '20px'
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ y: -20, opacity: 0, rotate: -90 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 20, opacity: 0, rotate: 90 }}
          transition={{ duration: 0.2 }}
        >
          {theme === 'dark' ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
          )}
        </motion.div>
      </AnimatePresence>
    </button>
  );
};

// --- APP EXPORT (WRAPPER) ---
export default function App() {
  return (
    <ThemeProvider>
      <CursorProvider>
        <AppContent />
      </CursorProvider>
    </ThemeProvider>
  );
}
