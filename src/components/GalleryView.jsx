import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GalleryView = ({ photos, onClose }) => {
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'var(--bg-color)',
                zIndex: 2000,
                overflowY: 'auto',
                padding: '20px'
            }}
        >
            {/* Header */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '40px',
                maxWidth: '1200px',
                margin: '0 auto 40px',
                marginTop: '20px'
            }}>
                <h2 style={{ fontSize: '24px', fontWeight: 900, textTransform: 'uppercase', color: 'var(--text-color)' }}>
                    Galeria.<span style={{ color: 'var(--accent-color)' }}>Fotos</span>
                </h2>
                <button
                    onClick={onClose}
                    style={{
                        background: 'var(--glass-bg)',
                        border: '1px solid var(--glass-border)',
                        color: 'var(--glass-text-color)',
                        padding: '10px 20px',
                        borderRadius: '50px',
                        fontSize: '12px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        textTransform: 'uppercase'
                    }}
                >
                    Voltar
                </button>
            </div>

            {/* Grid */}
            <div style={{
                columns: '3 300px',
                columnGap: '20px',
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                {photos.map((src, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        style={{ marginBottom: '20px', breakInside: 'avoid', cursor: 'pointer' }}
                        onClick={() => setSelectedPhoto(src)}
                    >
                        <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--glass-border)' }}>
                            <img src={src} alt={`Gallery ${i}`} style={{ width: '100%', display: 'block', transition: 'transform 0.5s' }} className="hover-zoom" />
                        </div>
                    </motion.div>
                ))}
            </div>

            <style>{`
        .hover-zoom:hover { transform: scale(1.05); }
      `}</style>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedPhoto && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed', inset: 0, zIndex: 3000,
                            background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(10px)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            padding: '20px'
                        }}
                        onClick={() => setSelectedPhoto(null)}
                    >
                        <img src={selectedPhoto} style={{ maxWidth: '100%', maxHeight: '90vh', borderRadius: '4px', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }} />
                    </motion.div>
                )}
            </AnimatePresence>

        </motion.div>
    );
};

export default GalleryView;
