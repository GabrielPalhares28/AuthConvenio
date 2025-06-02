import React, { useState, useCallback } from 'react';

interface ConvenioCardProps {
  name: string;
  icon: string;
  description: string;
  color: string;
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
}

// Constantes para estilos base
const CARD_STYLES = {
  base: {
    border: '2px solid transparent',
    background: '#fff',
    borderRadius: 20,
    padding: '2rem',
    textAlign: 'center' as const,
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    position: 'relative' as const,
    overflow: 'hidden',
    minHeight: '220px',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1.25rem'
  },
  hover: {
    transform: 'translateY(-8px)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
    borderColor: 'rgba(0, 118, 190, 0.3)'
  },
  active: {
    transform: 'scale(0.98)',
    transition: 'all 0.1s cubic-bezier(0.4, 0, 0.2, 1)'
  },
  disabled: {
    opacity: 0.6,
    cursor: 'not-allowed',
    transform: 'none'
  }
};

const ICON_STYLES = {
  base: {
    width: 80,
    height: 80,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: '2rem',
    fontWeight: 'bold' as const,
    position: 'relative' as const,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
  },
  hover: {
    transform: 'scale(1.1) rotate(5deg)',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.25)'
  }
};

const TEXT_STYLES = {
  title: {
    fontSize: '1.5rem',
    fontWeight: 600,
    margin: 0,
    color: '#2d3748',
    transition: 'color 0.3s ease'
  },
  description: {
    color: '#6c757d',
    fontSize: '1rem',
    margin: 0,
    lineHeight: 1.5,
    transition: 'color 0.3s ease'
  }
};

export const ConvenioCard: React.FC<ConvenioCardProps> = ({
  name,
  icon,
  description,
  color,
  onClick,
  disabled = false,
  loading = false
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const handleMouseEnter = useCallback(() => {
    if (!disabled) setIsHovered(true);
  }, [disabled]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setIsPressed(false);
  }, []);

  const handleMouseDown = useCallback(() => {
    if (!disabled) setIsPressed(true);
  }, [disabled]);

  const handleMouseUp = useCallback(() => {
    setIsPressed(false);
  }, []);

  const handleClick = useCallback(() => {
    if (!disabled && !loading) {
      onClick();
    }
  }, [disabled, loading, onClick]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if ((event.key === 'Enter' || event.key === ' ') && !disabled && !loading) {
      event.preventDefault();
      onClick();
    }
  }, [disabled, loading, onClick]);

  // Combinar estilos baseado no estado
  const cardStyle = {
    ...CARD_STYLES.base,
    ...(isHovered && !disabled ? CARD_STYLES.hover : {}),
    ...(isPressed && !disabled ? CARD_STYLES.active : {}),
    ...(disabled ? CARD_STYLES.disabled : {})
  };

  const iconStyle = {
    ...ICON_STYLES.base,
    background: color,
    ...(isHovered && !disabled ? ICON_STYLES.hover : {})
  };

  const titleStyle = {
    ...TEXT_STYLES.title,
    color: isHovered && !disabled ? '#0076BE' : '#2d3748'
  };

  const descriptionStyle = {
    ...TEXT_STYLES.description,
    color: isHovered && !disabled ? '#4a5568' : '#6c757d'
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onKeyDown={handleKeyDown}
      tabIndex={disabled ? -1 : 0}
      role="button"
      aria-label={`Acessar ${name} - ${description}`}
      aria-disabled={disabled}
      style={cardStyle}
    >
      {/* Efeito de shimmer para loading */}
      {loading && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
            animation: 'shimmer 1.5s infinite',
            zIndex: 1
          }}
        />
      )}

      <div style={iconStyle}>
        {loading ? (
          <div
            style={{
              width: '2rem',
              height: '2rem',
              border: '3px solid rgba(255,255,255,0.3)',
              borderTop: '3px solid #fff',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}
          />
        ) : (
          icon
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <h3 style={titleStyle}>
          {name}
        </h3>
        <p style={descriptionStyle}>
          {description}
        </p>
      </div>

      {/* Indicador visual de foco para acessibilidade */}
      <style>{`
        .convenio-card:focus-visible {
          outline: 3px solid #0076BE;
          outline-offset: 2px;
        }

        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (prefers-reduced-motion: reduce) {
          .convenio-card,
          .convenio-icon {
            transition: none !important;
            animation: none !important;
          }
        }

        @media (max-width: 480px) {
          .convenio-card {
            padding: 1.5rem !important;
            min-height: 180px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ConvenioCard;