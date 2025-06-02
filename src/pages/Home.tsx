import React, { useState, useCallback } from 'react';
import { ConvenioCard } from '../components/ConvenioCard';
import { UnimedModal } from '../components/modals/UnimedModal';
import { ClinipamModal } from '../components/modals/ClinipamModal';
import { OutrosModal } from '../components/modals/OutrosModal';

// Tipos para melhor type safety
type ConvenioType = 'unimed' | 'clinipam' | 'outros';

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
    background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  header: {
    padding: '2rem 1rem',
    textAlign: 'center' as const,
    maxWidth: '600px'
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: '50%',
    background: '#fff',
    border: '4px solid #0076BE',
    margin: '0 auto 1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 8px 32px rgba(0, 118, 190, 0.2)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
  },
  logoText: {
    color: '#0076BE',
    fontSize: '1.125rem',
    fontWeight: 700,
    letterSpacing: '0.05em'
  },
  title: {
    color: '#0076BE',
    fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
    fontWeight: 600,
    margin: '0 0 0.5rem 0',
    lineHeight: 1.2
  },
  subtitle: {
    color: '#6c757d',
    fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
    margin: 0,
    fontWeight: 400
  },
  main: {
    width: '100%',
    maxWidth: '900px',
    padding: '2rem 1rem',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '2rem',
    justifyItems: 'center'
  }
};

export const Home: React.FC = () => {
  const [activeModal, setActiveModal] = useState<ConvenioType | null>(null);

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
      case 'outros':
        return <OutrosModal onClose={handleCloseModal} />;
      default:
        return null;
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div 
          style={styles.logo}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 118, 190, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 118, 190, 0.2)';
          }}
        >
          <strong style={styles.logoText}>CERNE</strong>
        </div>
        
        <h1 style={styles.title}>
          Autenticador de Convênio
        </h1>
        
        <p style={styles.subtitle}>
          Sistema de Check-in Digital
        </p>
      </header>

      <main style={styles.main}>
        {CONVENIOS.map((convenio) => (
          <ConvenioCard
            key={convenio.key}
            name={convenio.name}
            icon={convenio.icon}
            description={convenio.description}
            color={convenio.color}
            onClick={() => handleOpenModal(convenio.key)}
          />
        ))}
      </main>

      {renderModals()}
    </div>
  );
};