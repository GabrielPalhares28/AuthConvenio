import React, { useState, useCallback } from 'react';
import { ConvenioCard } from '../components/ConvenioCard';
import { UnimedModal } from '../components/modals/UnimedModal';
import { ClinipamModal } from '../components/modals/ClinipamModal';
import { HapVidaModal } from '../components/modals/HapvidaModal';
import { OutrosModal } from '../components/modals/OutrosModal';
import logoCerne from '../assets/logo-cerne.png';

// Tipos para melhor type safety
type ConvenioType = 'unimed' | 'clinipam' | 'hapvida' | 'outros';

interface ConvenioConfig {
  name: string;
  icon: string;
  description: string;
  color: string;
  key: ConvenioType;
}

// Configuração dos convênios centralizada
const CONVENIOS: ConvenioConfig[] = [
  {
    name: 'Unimed',
    icon: 'U',
    description: 'Autenticação por QR Code',
    color: 'linear-gradient(135deg, #00a651, #4caf50)',
    key: 'unimed'
  },
  {
    name: 'Clinipam',
    icon: 'C',
    description: 'Autenticação por CPF',
    color: 'linear-gradient(135deg, #ff6b35, #f39c12)',
    key: 'clinipam'
  },
  {
    name: 'HapVida',
    icon: 'H',
    description: 'CPF ou Biometria Digital',
    color: 'linear-gradient(135deg, #005baa, #0066cc)',
    key: 'hapvida'
  },
  {
    name: 'Outros',
    icon: '+',
    description: 'Autenticação via CPF',
    color: 'linear-gradient(135deg, #6c5ce7, #a29bfe)',
    key: 'outros'
  }
];

// Estilos como constantes para melhor performance
const styles = {
  container: {
    minHeight: '100vh',
    width: '100vw',
    background: 'radial-gradient(ellipse at top, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)',
    display: 'flex' as const,
    flexDirection: 'column' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    position: 'fixed' as const,
    top: 0,
    left: 0,
    margin: 0,
    padding: 0,
    overflow: 'auto' as const
  },
  backgroundElements: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none' as const,
    opacity: 0.1,
    zIndex: 0
  },
  header: {
    padding: '2rem 1rem 1rem',
    textAlign: 'center' as const,
    maxWidth: '600px',
    zIndex: 1,
    position: 'relative' as const
  },
  logo: {
    width: 140,
    height: 140,
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    border: '3px solid rgba(0, 118, 190, 0.2)',
    margin: '0 auto 2rem',
    display: 'flex' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    boxShadow: '0 20px 60px rgba(0, 118, 190, 0.15), 0 0 40px rgba(255, 255, 255, 0.5)',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    overflow: 'hidden' as const,
    position: 'relative' as const,
    animation: 'logoFloat 4s ease-in-out infinite'
  },
  logoImage: {
    width: '85%',
    height: '85%',
    objectFit: 'contain' as const,
    borderRadius: '50%',
    transition: 'transform 0.4s ease'
  },
  title: {
    color: '#1e293b',
    fontSize: 'clamp(2rem, 5vw, 3rem)',
    fontWeight: 700,
    margin: '0 0 1rem 0',
    lineHeight: 1.1,
    background: 'linear-gradient(135deg, #0076BE, #4ade80)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  },
  subtitle: {
    color: '#64748b',
    fontSize: 'clamp(1.1rem, 3vw, 1.4rem)',
    margin: 0,
    fontWeight: 500,
    opacity: 0.9
  },
  main: {
    width: '100%',
    maxWidth: '1200px',
    padding: '2rem 2rem',
    margin: '0 auto',
    display: 'grid' as const,
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '3rem 2.5rem',
    justifyItems: 'center' as const,
    alignItems: 'start' as const,
    zIndex: 1,
    position: 'relative' as const
  }
};

export const Home: React.FC = () => {
  const [activeModal, setActiveModal] = useState<ConvenioType | null>(null);
  const [logoHovered, setLogoHovered] = useState(false);

  // useCallback para evitar re-renders desnecessários
  const handleOpenModal = useCallback((convenio: ConvenioType) => {
    setActiveModal(convenio);
  }, []);

  const handleCloseModal = useCallback(() => {
    setActiveModal(null);
  }, []);

  const handleSimulateAuth = useCallback(() => {
    alert('Autenticação simulada com sucesso!');
    handleCloseModal();
  }, [handleCloseModal]);

  // Componente para renderizar modais de forma mais limpa
  const renderModals = () => {
    switch (activeModal) {
      case 'unimed':
        return (
          <UnimedModal 
            onClose={handleCloseModal} 
            onSimulate={handleSimulateAuth} 
          />
        );
      case 'clinipam':
        return <ClinipamModal onClose={handleCloseModal} />;
      case 'hapvida':
        return (
          <HapVidaModal 
            onClose={handleCloseModal} 
            onSimulate={handleSimulateAuth} 
          />
        );
      case 'outros':
        return <OutrosModal onClose={handleCloseModal} />;
      default:
        return null;
    }
  };

  // Elementos decorativos de fundo
  const renderBackgroundElements = () => (
    <div style={styles.backgroundElements}>
      {/* Círculos decorativos flutuantes */}
      <div style={{
        position: 'absolute' as const,
        top: '10%',
        left: '10%',
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #0076BE, #4ade80)',
        animation: 'backgroundFloat1 6s ease-in-out infinite'
      }} />
      <div style={{
        position: 'absolute' as const,
        top: '20%',
        right: '15%',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #f39c12, #ff6b35)',
        animation: 'backgroundFloat2 8s ease-in-out infinite'
      }} />
      <div style={{
        position: 'absolute' as const,
        bottom: '25%',
        left: '8%',
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #6c5ce7, #a29bfe)',
        animation: 'backgroundFloat3 7s ease-in-out infinite'
      }} />
      <div style={{
        position: 'absolute' as const,
        bottom: '15%',
        right: '20%',
        width: '120px',
        height: '120px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #00a651, #4caf50)',
        animation: 'backgroundFloat4 9s ease-in-out infinite'
      }} />
    </div>
  );

  return (
    <div style={styles.container}>
      {renderBackgroundElements()}
      
      <header style={styles.header}>
        <div 
          style={{
            ...styles.logo,
            transform: logoHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1)',
            boxShadow: logoHovered 
              ? '0 30px 80px rgba(0, 118, 190, 0.25), 0 0 60px rgba(255, 255, 255, 0.8)'
              : '0 20px 60px rgba(0, 118, 190, 0.15), 0 0 40px rgba(255, 255, 255, 0.5)'
          }}
          onMouseEnter={() => setLogoHovered(true)}
          onMouseLeave={() => setLogoHovered(false)}
        >
          {/* Efeito de brilho interno */}
          <div style={{
            position: 'absolute' as const,
            top: '15px',
            left: '15px',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.6)',
            opacity: logoHovered ? 0.8 : 0.4,
            transition: 'opacity 0.4s ease'
          }} />
          
          <img 
            src={logoCerne} 
            alt="Logo CERNE" 
            style={{
              ...styles.logoImage,
              transform: logoHovered ? 'scale(1.05)' : 'scale(1)'
            }}
          />
        </div>
        
        <h1 style={styles.title}>
          Autenticador de Convênio
        </h1>
        
        <p style={styles.subtitle}>
          Sistema de Check-in Digital
        </p>
      </header>

      <main style={styles.main}>
        {CONVENIOS.map((convenio, index) => (
          <div
            key={convenio.key}
            style={{
              animation: `slideInUp 0.6s ease-out ${index * 0.1}s both`
            }}
          >
            <ConvenioCard
              name={convenio.name}
              icon={convenio.icon}
              description={convenio.description}
              color={convenio.color}
              onClick={() => handleOpenModal(convenio.key)}
            />
          </div>
        ))}
      </main>

      {renderModals()}

      <style>{`
        /* Reset global para remover margens e paddings padrão */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html, body {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          overflow-x: hidden;
        }

        #root {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
        }

        @keyframes logoFloat {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
          }
          25% { 
            transform: translateY(-8px) rotate(2deg); 
          }
          50% { 
            transform: translateY(-5px) rotate(0deg); 
          }
          75% { 
            transform: translateY(-12px) rotate(-2deg); 
          }
        }

        @keyframes backgroundFloat1 {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) rotate(0deg); 
            opacity: 0.1;
          }
          33% { 
            transform: translateY(-20px) translateX(10px) rotate(120deg); 
            opacity: 0.15;
          }
          66% { 
            transform: translateY(10px) translateX(-15px) rotate(240deg); 
            opacity: 0.08;
          }
        }

        @keyframes backgroundFloat2 {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) rotate(0deg); 
            opacity: 0.12;
          }
          50% { 
            transform: translateY(-30px) translateX(-20px) rotate(180deg); 
            opacity: 0.18;
          }
        }

        @keyframes backgroundFloat3 {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) scale(1); 
            opacity: 0.1;
          }
          33% { 
            transform: translateY(15px) translateX(20px) scale(1.1); 
            opacity: 0.15;
          }
          66% { 
            transform: translateY(-10px) translateX(-10px) scale(0.9); 
            opacity: 0.08;
          }
        }

        @keyframes backgroundFloat4 {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
            opacity: 0.08;
          }
          25% { 
            transform: translateY(-15px) rotate(90deg); 
            opacity: 0.12;
          }
          50% { 
            transform: translateY(-25px) rotate(180deg); 
            opacity: 0.15;
          }
          75% { 
            transform: translateY(-10px) rotate(270deg); 
            opacity: 0.1;
          }
        }

        @keyframes slideInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: none !important;
          }
        }

        @media (max-width: 768px) {
          .container {
            padding: 1rem;
          }
          
          .main {
            gap: 2.5rem 2rem !important;
            padding: 1.5rem 1rem !important;
          }
        }

        @media (max-width: 480px) {
          .main {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </div>
  );
};