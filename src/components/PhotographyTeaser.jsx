import React from 'react';
import { motion } from 'framer-motion';

const PhotographyTeaser = ({ photos, onClick }) => {
    // Duplicate photos for seamless loop
    const displayPhotos = [...photos, ...photos, ...photos];

    return (
        <div
            onClick={onClick}
            style={{
                width: '100%',
                padding: '80px 0',
                cursor: 'pointer',
                overflow: 'hidden',
                position: 'relative'
            }}
        >
            <div style={{ maxWidth: '1200px', margin: '0 auto 20px', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '14px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--muted-text)' }}>
                    Fotografia
                </h2>
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--accent-color)', textTransform: 'uppercase' }}>
                    Ver Galeria Completa &rarr;
                </span>
            </div>

            {/* Marquee Container */}
            <div style={{ display: 'flex', gap: '20px', width: 'max-content' }}>
                <motion.div
                    animate={{ x: [0, -2000] }} // Adjust based on width
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    style={{ display: 'flex', gap: '20px' }}
                >
                    {displayPhotos.map((src, i) => (
                        <div
                            key={i}
                            style={{
                                width: '300px',
                                height: '200px',
                                flexShrink: 0,
                                borderRadius: '12px',
                                overflow: 'hidden',
                                border: '1px solid var(--glass-border)',
                                position: 'relative'
                            }}
                        >
                            <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)', transition: 'filter 0.3s' }}
                                onMouseEnter={(e) => e.target.style.filter = 'grayscale(0%)'}
                                onMouseLeave={(e) => e.target.style.filter = 'grayscale(100%)'}
                            />
                            <div style={{ position: 'absolute', inset: 0, background: 'var(--glass-bg)', opacity: 0.1 }}></div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default PhotographyTeaser;
