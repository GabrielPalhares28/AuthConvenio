import React, { useState } from 'react';
import logoOutros from '../../assets/logo-outros.png';

interface Props {
  onClose: () => void;
}

export const OutrosModal: React.FC<Props> = ({ onClose }) => {
  const [cpf, setCpf] = useState('');
  const [resultado, setResultado] = useState<null | 'ok' | 'fail'>(null);

  const confirmar = () => {
    if (cpf.length !== 11) {
      setResultado('fail');
      return;
    }
    const lastDigit = parseInt(cpf.charAt(cpf.length - 1));
    setResultado(lastDigit % 2 === 0 ? 'ok' : 'fail');
  };

  const styles = {
    overlay: {
      position: 'fixed' as const,
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.65)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(8px)'
    },
    content: {
      background: 'linear-gradient(145deg, #ffffff, #f8fafb)',
      borderRadius: '24px',
      padding: '2.5rem',
      width: '90%',
      maxWidth: '460px',
      boxShadow: '0 25px 80px rgba(0, 0, 0, 0.15)',
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      gap: '1.75rem',
      position: 'relative' as const,
      animation: 'modalSlideIn 0.4s ease'
    },
    logoContainer: {
      width: 90,
      height: 90,
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #6c5ce7, #a29bfe)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      boxShadow: '0 12px 35px rgba(108, 92, 231, 0.4)'
    },
    logoImage: {
      width: '75%',
      height: '75%',
      objectFit: 'contain' as const,
      borderRadius: '50%'
    },
    title: {
      fontSize: '1.75rem',
      fontWeight: 700,
      margin: 0,
      background: 'linear-gradient(135deg, #6c5ce7, #a29bfe)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    },
    subtitle: {
      fontSize: '1rem',
      fontWeight: 500,
      color: '#4a5568',
      margin: 0,
      textAlign: 'center' as const
    },
    input: {
      padding: '1rem',
      borderRadius: '12px',
      fontSize: '1.1rem',
      border: '2px solid #6c5ce7',
      width: '100%',
      maxWidth: '300px',
      textAlign: 'center' as const,
      outline: 'none'
    },
    button: {
      background: 'linear-gradient(135deg, #6c5ce7, #a29bfe)',
      color: '#fff',
      border: 'none',
      borderRadius: '12px',
      padding: '1rem 2rem',
      fontSize: '1rem',
      fontWeight: 600,
      cursor: 'pointer',
      boxShadow: '0 6px 20px rgba(108, 92, 231, 0.4)',
      width: '200px'
    },
    buttonSecondary: {
      background: 'linear-gradient(135deg, #6c757d, #868e96)',
      boxShadow: '0 6px 20px rgba(108, 117, 125, 0.3)',
      marginTop: '0.5rem'
    },
    feedback: {
      padding: '1rem',
      borderRadius: '12px',
      fontWeight: 600,
      fontSize: '1rem',
      marginTop: '1rem',
      textAlign: 'center' as const,
      width: '100%',
      maxWidth: '300px'
    },
    success: {
      background: 'rgba(40, 167, 69, 0.15)',
      color: '#28a745',
      border: '2px solid rgba(40, 167, 69, 0.3)'
    },
    error: {
      background: 'rgba(220, 53, 69, 0.15)',
      color: '#dc3545',
      border: '2px solid rgba(220, 53, 69, 0.3)'
    }
  };

  return (
    <>
      <div style={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
        <div style={styles.content}>
          <div style={styles.logoContainer}>
            <img src={logoOutros} alt="Logo Outros Convênios" style={styles.logoImage} />
          </div>

          <h2 style={styles.title}>🏥 Outros Convênios</h2>
          <p style={styles.subtitle}>Digite seu CPF para autenticação</p>

          <input
            style={styles.input}
            placeholder="Digite seu CPF"
            value={cpf}
            onChange={(e) => setCpf(e.target.value.replace(/\D/g, ''))}
            maxLength={11}
          />

          <button style={styles.button} onClick={confirmar}>Confirmar</button>
          <button style={{ ...styles.button, ...styles.buttonSecondary }} onClick={onClose}>Cancelar</button>

          {resultado === 'ok' && (
            <div style={{ ...styles.feedback, ...styles.success }}>
              ✅ Autenticação Confirmada
            </div>
          )}
          {resultado === 'fail' && (
            <div style={{ ...styles.feedback, ...styles.error }}>
              ❌ CPF não encontrado
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: scale(0.8) translateY(-30px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </>
  );
};
