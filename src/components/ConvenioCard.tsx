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
          className="loading-spinner"
          style={{
            width: 'clamp(2rem, 5vw, 2.5rem)',
            height: 'clamp(2rem, 5vw, 2.5rem)',
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
          className="convenio-logo"
          style={{
            width: 'clamp(60px, 12vw, 80px)',
            height: 'clamp(60px, 12vw, 80px)',
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
        <div className="hapvida-text" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
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
      <span className="convenio-icon" style={{
        fontSize: 'clamp(2rem, 5vw, 2.5rem)',
        fontWeight: 'bold',
        color: '#fff'
      }}>
        {icon}
      </span>
    );
  };

  return (
    <div
      className="convenio-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'clamp(0.75rem, 2vw, 1rem)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: isHovered && !disabled ? 'translateY(-8px)' : 'translateY(0)',
        animation: !disabled ? 'float 3s ease-in-out infinite' : 'none',
        width: '100%',
        maxWidth: '200px',
        margin: '0 auto'
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
        className="convenio-circle"
        style={{
          width: 'clamp(100px, 20vw, 120px)',
          height: 'clamp(100px, 20vw, 120px)',
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
          className="shine-effect"
          style={{
            position: 'absolute',
            top: 'clamp(8px, 2vw, 10px)',
            left: 'clamp(8px, 2vw, 10px)',
            width: 'clamp(25px, 5vw, 30px)',
            height: 'clamp(25px, 5vw, 30px)',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.3)',
            opacity: isHovered ? 0.6 : 0.3,
            transition: 'opacity 0.3s ease'
          }}
        />
        
        {/* Efeito de shimmer para loading */}
        {loading && (
          <div
            className="shimmer-effect"
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
        className="convenio-label"
        style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderRadius: 'clamp(15px, 3vw, 20px)',
          padding: 'clamp(0.5rem, 2vw, 0.75rem) clamp(1rem, 3vw, 1.25rem)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          transform: isHovered && !disabled ? 'scale(1.05)' : 'scale(1)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          textAlign: 'center',
          width: '100%',
          minWidth: 'fit-content'
        }}
      >
        <h3 className="convenio-title" style={{
          fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
          fontWeight: 600,
          margin: '0 0 0.25rem 0',
          color: '#2d3748',
          transition: 'color 0.3s ease'
        }}>
          {name}
        </h3>
        <p className="convenio-description" style={{
          color: '#6c757d',
          fontSize: 'clamp(0.75rem, 2vw, 0.85rem)',
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
        .convenio-card:focus-visible {
          outline: 3px solid #0076BE;
          outline-offset: 4px;
          border-radius: 50%;
        }

        /* Responsividade aprimorada */
        @media (max-width: 480px) {
          .convenio-card {
            gap: 0.75rem;
            max-width: 160px;
          }
          
          .convenio-circle {
            min-width: 90px;
            min-height: 90px;
          }
          
          .convenio-label {
            padding: 0.5rem 0.75rem;
            border-radius: 15px;
          }
          
          .convenio-title {
            font-size: 0.95rem;
            margin-bottom: 0.15rem;
          }
          
          .convenio-description {
            font-size: 0.75rem;
            line-height: 1.3;
          }
          
          .convenio-logo {
            min-width: 50px;
            min-height: 50px;
          }
          
          .hapvida-text {
            font-size: 0.85rem;
          }
          
          .convenio-icon {
            font-size: 1.8rem;
          }
          
          .loading-spinner {
            min-width: 1.8rem;
            min-height: 1.8rem;
          }
        }

        @media (min-width: 481px) and (max-width: 768px) {
          .convenio-card {
            gap: 0.85rem;
            max-width: 180px;
          }
          
          .convenio-circle {
            min-width: 100px;
            min-height: 100px;
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .convenio-card {
            gap: 0.9rem;
            max-width: 190px;
          }
          
          .convenio-circle {
            min-width: 110px;
            min-height: 110px;
          }
        }

        @media (min-width: 1025px) {
          .convenio-card {
            gap: 1rem;
            max-width: 200px;
          }
          
          .convenio-circle {
            min-width: 120px;
            min-height: 120px;
          }
        }

        /* Para dispositivos em landscape (celular deitado) */
        @media (max-height: 500px) and (orientation: landscape) {
          .convenio-card {
            gap: 0.5rem;
            max-width: 140px;
          }
          
          .convenio-circle {
            width: 80px;
            height: 80px;
            min-width: 80px;
            min-height: 80px;
          }
          
          .convenio-label {
            padding: 0.4rem 0.8rem;
          }
          
          .convenio-title {
            font-size: 0.9rem;
            margin-bottom: 0.1rem;
          }
          
          .convenio-description {
            font-size: 0.7rem;
          }
        }

        /* Ajustes para telas muito pequenas */
        @media (max-width: 320px) {
          .convenio-card {
            gap: 0.6rem;
            max-width: 140px;
          }
          
          .convenio-circle {
            width: 80px;
            height: 80px;
            min-width: 80px;
            min-height: 80px;
          }
          
          .convenio-label {
            padding: 0.4rem 0.6rem;
            border-radius: 12px;
          }
          
          .convenio-title {
            font-size: 0.85rem;
          }
          
          .convenio-description {
            font-size: 0.7rem;
          }
        }

        /* Desabilitar animações para quem prefere movimento reduzido */
        @media (prefers-reduced-motion: reduce) {
          .convenio-card,
          .convenio-circle,
          .convenio-label,
          .shine-effect,
          .shimmer-effect,
          .loading-spinner {
            animation: none !important;
            transition: none !important;
          }
        }

        /* Melhor contraste para modo escuro */
        @media (prefers-color-scheme: dark) {
          .convenio-label {
            background: rgba(45, 55, 72, 0.95);
            border: 1px solid rgba(255, 255, 255, 0.1);
          }
          
          .convenio-title {
            color: #f7fafc;
          }
          
          .convenio-description {
            color: #a0aec0;
          }
        }

        /* Ajustes para alta densidade de pixels */
        @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 2dppx) {
          .convenio-circle {
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          }
          
          .convenio-card:hover .convenio-circle {
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15), 0 0 15px rgba(255, 255, 255, 0.05);
          }
        }
      `}</style>
    </div>
  );
};

export default ConvenioCard;