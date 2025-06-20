import React, { useState, useCallback } from 'react';
import logoUnimed from '../assets/logo-unimed.png';
import logoClinipam from '../assets/logo-clinipam.png';
// import logoHapvida from '../assets/logo-hapvida.png'; // Descomente se tiver a logo

interface ConvenioCardProps {
  name: string;
  icon: string;
  description: string;
  color: string;
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
}

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

  const handleMouseEnter = useCallback(() => {
    if (!disabled) setIsHovered(true);
  }, [disabled]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
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

  // Função para obter a logo baseada no nome do convênio
  const getLogo = () => {
    switch (name.toLowerCase()) {
      case 'unimed':
        return logoUnimed;
      case 'clinipam':
        return logoClinipam;
      // case 'hapvida':
      //   return logoHapvida; // Descomente se tiver a logo
      default:
        return null;
    }
  };

  // Função para renderizar o conteúdo do ícone
  const renderIconContent = () => {
    if (loading) {
      return (
        <div
          style={{
            width: '2.5rem',
            height: '2.5rem',
            border: '4px solid rgba(255,255,255,0.3)',
            borderTop: '4px solid #fff',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}
        />
      );
    }

    const logo = getLogo();
    
    // Debug: console.log para verificar
    console.log('ConvenioCard Debug:', {
      name: name,
      nameLowerCase: name.toLowerCase(),
      logo: logo,
      logoExists: !!logo
    });
    
    if (logo) {
      return (
        <img 
          src={logo} 
          alt={`Logo ${name}`}
          style={{
            width: '80px',
            height: '80px',
            objectFit: 'contain',
            borderRadius: '8px',
            maxWidth: '80%',
            maxHeight: '80%'
          }}
          onError={(e) => {
            console.error('Erro ao carregar logo:', logo);
            console.error('Event:', e);
          }}
          onLoad={() => {
            console.log('Logo carregada com sucesso:', logo);
          }}
        />
      );
    }

    // Para HapVida, renderizar texto estilizado se não tiver logo
    if (name.toLowerCase() === 'hapvida') {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          fontSize: '1.1rem',
          fontWeight: 700,
          textAlign: 'center',
          lineHeight: 1.1,
          color: '#fff'
        }}>
          <div>Hap</div>
          <div>Vida</div>
        </div>
      );
    }

    // Fallback para outros convênios sem logo
    return (
      <span style={{
        fontSize: '2.5rem',
        fontWeight: 'bold',
        color: '#fff'
      }}>
        {icon}
      </span>
    );
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: isHovered && !disabled ? 'translateY(-8px)' : 'translateY(0)',
        animation: !disabled ? 'float 3s ease-in-out infinite' : 'none'
      }}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
      tabIndex={disabled ? -1 : 0}
      role="button"
      aria-label={`Acessar ${name} - ${description}`}
      aria-disabled={disabled}
    >
      {/* Balão circular principal */}
      <div
        style={{
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: isHovered && !disabled 
            ? '0 20px 40px rgba(0, 0, 0, 0.25), 0 0 30px rgba(255, 255, 255, 0.1)' 
            : '0 8px 25px rgba(0, 0, 0, 0.15)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: isHovered && !disabled ? 'scale(1.1) rotate(2deg)' : 'scale(1)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Efeito de brilho interno */}
        <div
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.3)',
            opacity: isHovered ? 0.6 : 0.3,
            transition: 'opacity 0.3s ease'
          }}
        />
        
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

        {renderIconContent()}
      </div>

      {/* Label flutuante */}
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '0.75rem 1.25rem',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          transform: isHovered && !disabled ? 'scale(1.05)' : 'scale(1)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          textAlign: 'center'
        }}
      >
        <h3 style={{
          fontSize: '1.1rem',
          fontWeight: 600,
          margin: '0 0 0.25rem 0',
          color: '#2d3748',
          transition: 'color 0.3s ease'
        }}>
          {name}
        </h3>
        <p style={{
          color: '#6c757d',
          fontSize: '0.85rem',
          margin: 0,
          lineHeight: 1.4,
          opacity: isHovered ? 1 : 0.8,
          transition: 'opacity 0.3s ease'
        }}>
          {description}
        </p>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
          }
          25% { 
            transform: translateY(-5px) rotate(1deg); 
          }
          50% { 
            transform: translateY(-3px) rotate(0deg); 
          }
          75% { 
            transform: translateY(-7px) rotate(-1deg); 
          }
        }

        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Efeito de foco para acessibilidade */
        [role="button"]:focus-visible {
          outline: 3px solid #0076BE;
          outline-offset: 4px;
          border-radius: 50%;
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: none !important;
          }
        }

        @media (max-width: 768px) {
          /* Ajustes para mobile */
        }
      `}</style>
    </div>
  );
};

export default ConvenioCard;