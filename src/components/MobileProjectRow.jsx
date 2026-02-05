import React from 'react';
import { motion } from 'framer-motion';

const MobileProjectRow = ({ title, projects, onProjectClick }) => {
    if (projects.length === 0) return null;

    return (
        <div style={{ marginBottom: '40px', paddingLeft: '20px' }}>
            <h3 style={{
                fontSize: '18px',
                fontWeight: 700,
                color: 'var(--text-color)',
                marginBottom: '15px',
                letterSpacing: '0.5px'
            }}>
                {title}
            </h3>
            <div
                style={{
                    display: 'flex',
                    gap: '15px',
                    overflowX: 'auto',
                    paddingRight: '20px',
                    paddingBottom: '20px',
                    scrollSnapType: 'x mandatory',
                    WebkitOverflowScrolling: 'touch'
                }}
                className="hide-scrollbar"
            >
                {projects.map(project => (
                    <motion.div
                        key={project.id}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onProjectClick(project)}
                        style={{
                            flex: '0 0 auto',
                            width: '280px',
                            aspectRatio: '16/9',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            position: 'relative',
                            scrollSnapAlign: 'start',
                            border: '1px solid var(--glass-border)',
                            backgroundColor: 'var(--glass-bg)'
                        }}
                    >
                        <img
                            src={project.img}
                            alt={project.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)'
                        }} />
                        <div style={{
                            position: 'absolute',
                            bottom: '10px',
                            left: '10px',
                            right: '10px'
                        }}>
                            <span style={{
                                fontSize: '10px',
                                color: 'var(--accent-color)',
                                textTransform: 'uppercase',
                                fontWeight: 700,
                                letterSpacing: '1px'
                            }}>
                                {project.category}
                            </span>
                            <h4 style={{
                                color: '#fff',
                                fontSize: '14px',
                                margin: '2px 0 0 0',
                                fontWeight: 600,
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            }}>
                                {project.title}
                            </h4>
                        </div>

                        {/* GLARE EFFECT (Subtle for mobile) */}
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(120deg, rgba(255,255,255,0.1) 0%, transparent 40%)',
                            pointerEvents: 'none'
                        }} />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default MobileProjectRow;
