import React, { useEffect, useState } from 'react';
import logoClinipam from '../../assets/logo-clinipam.png';

interface Props {
  onClose: () => void;
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
    maxWidth: '480px',
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
    background: 'linear-gradient(135deg, #ff6b35, #f39c12, #ff8c42)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 12px 35px rgba(255, 107, 53, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
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
    background: 'linear-gradient(135deg, #ff6b35, #f39c12)',
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
    background: 'linear-gradient(135deg, #ff6b35, #d35400)',
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
  senhaContainer: {
    position: 'relative' as const,
    padding: '1rem'
  },
  senhaDisplay: {
    background: 'linear-gradient(145deg, #fff, #f8f9fa)',
    border: '3px solid #ff6b35',
    borderRadius: '20px',
    padding: '1.5rem 2rem',
    fontSize: '3rem',
    fontWeight: 'bold' as const,
    color: '#ff6b35',
    textAlign: 'center' as const,
    fontFamily: 'monospace',
    letterSpacing: '0.4rem',
    minWidth: 220,
    position: 'relative' as const,
    overflow: 'hidden',
    boxShadow: '0 8px 32px rgba(255, 107, 53, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
    animation: 'senhaAppear 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
  },
  senhaGlow: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(45deg, transparent 30%, rgba(255, 107, 53, 0.1) 50%, transparent 70%)',
    animation: 'shimmer 2s infinite'
  },
  senhaPlaceholder: {
    width: 220,
    height: 120,
    background: 'linear-gradient(145deg, #f7f9fc, #e2e8f0)',
    border: '3px dashed #ff6b35',
    borderRadius: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1rem',
    fontWeight: 600,
    color: '#ff6b35',
    position: 'relative' as const,
    overflow: 'hidden',
    boxShadow: 'inset 0 2px 10px rgba(0, 0, 0, 0.05)'
  },
  placeholderText: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '0.5rem',
    opacity: 0.7
  },
  timer: {
    color: '#28a745',
    fontSize: '1rem',
    fontWeight: 600,
    padding: '0.75rem 1.5rem',
    background: 'rgba(40, 167, 69, 0.1)',
    border: '1px solid rgba(40, 167, 69, 0.2)',
    borderRadius: '25px',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    animation: 'timerPulse 2s ease-in-out infinite'
  },
  timerExpired: {
    color: '#dc3545',
    background: 'rgba(220, 53, 69, 0.1)',
    border: '1px solid rgba(220, 53, 69, 0.2)',
    animation: 'timerExpiredShake 0.5s ease-in-out'
  },
  button: {
    background: 'linear-gradient(135deg, #ff6b35, #f39c12, #ff8c42)',
    color: '#fff',
    border: 'none',
    borderRadius: '16px',
    padding: '1.2rem 2.5rem',
    fontSize: '1.1rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 6px 20px rgba(255, 107, 53, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
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
    gap: '1.5rem',
    width: '100%',
    alignItems: 'center'
  },
  securityBadge: {
    background: 'rgba(255, 107, 53, 0.1)',
    border: '1px solid rgba(255, 107, 53, 0.2)',
    borderRadius: '12px',
    padding: '0.75rem 1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.9rem',
    color: '#ff6b35',
    fontWeight: 500
  }
};

export const ClinipamModal: React.FC<Props> = ({ onClose }) => {
  const [senha, setSenha] = useState('');
  const [timer, setTimer] = useState(300);

  const gerarSenha = () => {
    const aleatoria = Math.floor(Math.random() * 9000 + 1000).toString();
    setSenha(aleatoria);
    setTimer(300);
  };

  useEffect(() => {
    if (!senha) return;
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [senha]);

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

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
            <img src={logoClinipam} alt="Logo Clinipam" style={styles.logoImage} />
          </div>

          <div style={styles.titleContainer}>
            <h2 style={styles.title}>🧑‍⚕️ Clinipam</h2>
            <p style={styles.subtitle}>Clique no botão abaixo para gerar sua senha de autenticação temporária</p>
          </div>

          <div style={styles.senhaContainer}>
            {senha ? (
              <div style={styles.senhaDisplay}>
                <div style={styles.senhaGlow}></div>
                {senha}
              </div>
            ) : (
              <div style={styles.senhaPlaceholder}>
                <div style={styles.placeholderText}>
                  <span style={{ fontSize: '2rem' }}>🔐</span>
                  <span>Senha será gerada aqui</span>
                </div>
              </div>
            )}
          </div>

          {senha && (
            <>
              {timer > 0 ? (
                <div style={styles.timer}>
                  <span>⏱️</span>
                  <span>Expira em: {formatTime(timer)}</span>
                </div>
              ) : (
                <div style={{ ...styles.timer, ...styles.timerExpired }}>
                  <span>⚠️</span>
                  <span>Senha expirada</span>
                </div>
              )}
            </>
          )}

          <div style={styles.securityBadge}>
            <span>🔒</span>
            <span>Autenticação segura e temporária</span>
          </div>

          <div style={styles.actions}>
            <button 
              style={styles.button} 
              onClick={gerarSenha}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 107, 53, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                handleButtonHover(e);
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 107, 53, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
              }}
            >
              <div className="button-ripple" style={styles.buttonRipple}></div>
              {senha ? '🔁 Gerar Nova Senha' : '⚡ Gerar Senha'}
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

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes senhaAppear {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes timerPulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.02);
            opacity: 0.9;
          }
        }

        @keyframes timerExpiredShake {
          0%, 100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-5px);
          }
          75% {
            transform: translateX(5px);
          }
        }
      `}</style>
    </>
  );
};