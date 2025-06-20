import React, { useState } from 'react';
import logoUnimed from '../../assets/logo-unimed.png';

interface Props {
  onClose: () => void;
  onSimulate: () => void;
}

const styles = {
  overlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)'
  },
  content: {
    background: 'linear-gradient(145deg, #ffffff, #f8fafb)',
    borderRadius: '24px',
    padding: '2.5rem',
    width: '90%',
    maxWidth: '520px',
    boxShadow: '0 25px 80px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.5)',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '2rem',
    position: 'relative' as const,
    animation: 'modalSlideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
    border: '1px solid rgba(255, 255, 255, 0.2)'
  },
  closeButton: {
    position: 'absolute' as const,
    top: '1rem',
    right: '1rem',
    background: 'rgba(108, 117, 125, 0.1)',
    border: 'none',
    borderRadius: '50%',
    width: '32px',
    height: '32px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem',
    color: '#6c757d',
    transition: 'all 0.2s ease',
    backdropFilter: 'blur(10px)'
  },
  logoContainer: {
    width: 90,
    height: 90,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #00a651, #4caf50, #66bb6a)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 12px 35px rgba(0, 166, 81, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
    overflow: 'hidden',
    position: 'relative' as const,
    animation: 'logoFloat 3s ease-in-out infinite'
  },
  logoGlow: {
    position: 'absolute' as const,
    top: '-2px',
    left: '-2px',
    right: '-2px',
    bottom: '-2px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #00a651, #4caf50)',
    filter: 'blur(8px)',
    opacity: 0.3,
    zIndex: -1
  },
  logoImage: {
    width: '75%',
    height: '75%',
    objectFit: 'contain' as const,
    borderRadius: '50%',
    filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))'
  },
  titleContainer: {
    textAlign: 'center' as const,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.5rem'
  },
  title: {
    color: '#1a202c',
    fontSize: '1.75rem',
    fontWeight: 700,
    margin: 0,
    background: 'linear-gradient(135deg, #00a651, #2d5a4a)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  },
  subtitle: {
    color: '#4a5568',
    fontSize: '1rem',
    margin: 0,
    fontWeight: 500,
    textAlign: 'center' as const,
    lineHeight: 1.5
  },
  qrCodeContainer: {
    position: 'relative' as const,
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '1rem'
  },
  qrCodeBox: {
    position: 'relative' as const,
    background: 'linear-gradient(145deg, #f7f9fc, #ffffff)',
    border: '3px solid #00a651',
    borderRadius: '20px',
    padding: '1rem',
    boxShadow: '0 8px 32px rgba(0, 166, 81, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
    overflow: 'hidden'
  },
  qrImage: {
    width: '200px',
    height: '200px',
    borderRadius: '12px',
    display: 'block'
  },
  qrSelector: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1rem'
  },
  selectorButton: {
    padding: '0.75rem 1.5rem',
    borderRadius: '12px',
    border: '2px solid #e2e8f0',
    background: '#ffffff',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: 600,
    transition: 'all 0.3s ease',
    color: '#4a5568'
  },
  selectorButtonActive: {
    background: 'linear-gradient(135deg, #00a651, #4caf50)',
    color: '#ffffff',
    border: '2px solid #00a651',
    boxShadow: '0 4px 15px rgba(0, 166, 81, 0.3)'
  },
  qrLabel: {
    fontSize: '0.9rem',
    fontWeight: 600,
    color: '#00a651',
    textAlign: 'center' as const,
    marginTop: '0.5rem',
    padding: '0.5rem 1rem',
    background: 'rgba(0, 166, 81, 0.1)',
    borderRadius: '8px'
  },
  button: {
    background: 'linear-gradient(135deg, #00a651, #4caf50, #66bb6a)',
    color: '#fff',
    border: 'none',
    borderRadius: '16px',
    padding: '1.2rem 2.5rem',
    fontSize: '1.1rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 6px 20px rgba(0, 166, 81, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
    minWidth: '180px',
    position: 'relative' as const,
    overflow: 'hidden'
  },
  buttonSecondary: {
    background: 'linear-gradient(135deg, #6c757d, #868e96)',
    boxShadow: '0 6px 20px rgba(108, 117, 125, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
  },
  buttonRipple: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.2) 50%, transparent 70%)',
    transform: 'translateX(-100%)',
    transition: 'transform 0.6s'
  },
  actions: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1rem',
    width: '100%',
    alignItems: 'center'
  },
  securityBadge: {
    background: 'rgba(0, 166, 81, 0.1)',
    border: '1px solid rgba(0, 166, 81, 0.2)',
    borderRadius: '12px',
    padding: '0.75rem 1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.9rem',
    color: '#00a651',
    fontWeight: 500
  }
};

export const UnimedModal: React.FC<Props> = ({ onClose, onSimulate }) => {
  const [selectedQR, setSelectedQR] = useState<'success' | 'error'>('success');

  // Mensagens para os QR Codes
  const qrMessages = {
    success: "Autenticado com sucesso",
    error: "Falha na autenticação, por favor comparecer a recepção"
  };

  // URLs dos QR Codes usando a API do QR Server
  const qrUrls = {
    success: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrMessages.success)}&bgcolor=f7f9fc&color=00a651`,
    error: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrMessages.error)}&bgcolor=f7f9fc&color=dc3545`
  };

  const handleButtonHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    const ripple = e.currentTarget.querySelector('.button-ripple') as HTMLElement;
    if (ripple) {
      ripple.style.transform = 'translateX(0)';
      setTimeout(() => {
        ripple.style.transform = 'translateX(100%)';
      }, 600);
    }
  };

  return (
    <>
      <div style={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
        <div style={styles.content}>
          <button 
            style={styles.closeButton} 
            onClick={onClose}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(108, 117, 125, 0.2)';
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(108, 117, 125, 0.1)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            ✕
          </button>

          <div style={styles.logoContainer}>
            <div style={styles.logoGlow}></div>
            <img src={logoUnimed} alt="Logo Unimed" style={styles.logoImage} />
          </div>

          <div style={styles.titleContainer}>
            <h2 style={styles.title}>🏥 Unimed</h2>
            <p style={styles.subtitle}>Escolha um QR Code para testar a autenticação</p>
          </div>

          <div style={styles.qrCodeContainer}>
            <div style={styles.qrSelector}>
              <button
                style={{
                  ...styles.selectorButton,
                  ...(selectedQR === 'success' ? styles.selectorButtonActive : {})
                }}
                onClick={() => setSelectedQR('success')}
              >
                ✅ Sucesso
              </button>
              <button
                style={{
                  ...styles.selectorButton,
                  ...(selectedQR === 'error' ? styles.selectorButtonActive : {})
                }}
                onClick={() => setSelectedQR('error')}
              >
                ❌ Erro
              </button>
            </div>

            <div style={styles.qrCodeBox}>
              <img 
                src={qrUrls[selectedQR]}
                alt={`QR Code - ${qrMessages[selectedQR]}`}
                style={styles.qrImage}
              />
              <div style={styles.qrLabel}>
                {selectedQR === 'success' ? '✅ Autenticação Bem-sucedida' : '❌ Falha na Autenticação'}
              </div>
            </div>
          </div>

          <div style={styles.securityBadge}>
            <span>🔒</span>
            <span>QR Codes funcionais para teste</span>
          </div>

          <div style={styles.actions}>
            <button 
              style={styles.button} 
              onClick={onSimulate}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 166, 81, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                handleButtonHover(e);
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 166, 81, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
              }}
            >
              <div className="button-ripple" style={styles.buttonRipple}></div>
              ✨ Simular Autenticação
            </button>
            <button 
              style={{ ...styles.button, ...styles.buttonSecondary }} 
              onClick={onClose}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(108, 117, 125, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(108, 117, 125, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
              }}
            >
              Cancelar
            </button>
          </div>
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

        @keyframes logoFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }
      `}</style>
    </>
  );
};