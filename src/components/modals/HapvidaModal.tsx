import React, { useState } from 'react';

interface Props {
  onClose: () => void;
  onSimulate: () => void;
}

type AuthMethod = 'cpf' | 'biometria';

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
    background: 'linear-gradient(135deg, #005baa, #0066cc, #4d94ff)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 12px 35px rgba(0, 91, 170, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
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
    background: 'linear-gradient(135deg, #005baa, #0066cc)',
    filter: 'blur(8px)',
    opacity: 0.3,
    zIndex: -1
  },
  logoText: {
    color: '#ffffff',
    fontSize: '1.1rem',
    fontWeight: 700,
    textAlign: 'center' as const,
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
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
    background: 'linear-gradient(135deg, #005baa, #003d73)',
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
  authMethodSelector: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1rem'
  },
  authMethodButton: {
    background: 'rgba(0, 91, 170, 0.1)',
    border: '2px solid rgba(0, 91, 170, 0.3)',
    borderRadius: '12px',
    padding: '0.75rem 1.5rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontSize: '0.9rem',
    fontWeight: 500,
    color: '#005baa',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  authMethodButtonActive: {
    background: 'linear-gradient(135deg, #005baa, #0066cc)',
    border: '2px solid #005baa',
    color: '#ffffff',
    boxShadow: '0 4px 15px rgba(0, 91, 170, 0.3)'
  },
  authContainer: {
    position: 'relative' as const,
    padding: '1rem',
    width: '100%',
    maxWidth: '280px'
  },
  cpfContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1rem',
    alignItems: 'center'
  },
  cpfInput: {
    width: '100%',
    padding: '1rem',
    borderRadius: '12px',
    border: '2px solid rgba(0, 91, 170, 0.3)',
    fontSize: '1.1rem',
    textAlign: 'center' as const,
    outline: 'none',
    transition: 'all 0.3s ease',
    background: 'rgba(255, 255, 255, 0.8)'
  },
  biometriaPlaceholder: {
    width: 180,
    height: 180,
    background: 'linear-gradient(145deg, #f7f9fc, #e2e8f0)',
    border: '3px dashed #005baa',
    borderRadius: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2rem',
    fontWeight: 600,
    color: '#005baa',
    position: 'relative' as const,
    overflow: 'hidden',
    boxShadow: 'inset 0 2px 10px rgba(0, 0, 0, 0.05)',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  biometriaGlow: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(45deg, transparent 30%, rgba(0, 91, 170, 0.1) 50%, transparent 70%)',
    animation: 'shimmer 2s infinite'
  },
  biometriaText: {
    position: 'relative' as const,
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '0.5rem'
  },
  biometriaIcon: {
    fontSize: '3rem',
    opacity: 0.8
  },
  biometriaLabel: {
    fontSize: '0.9rem',
    fontWeight: 500,
    opacity: 0.7
  },
  button: {
    background: 'linear-gradient(135deg, #005baa, #0066cc, #4d94ff)',
    color: '#fff',
    border: 'none',
    borderRadius: '16px',
    padding: '1.2rem 2.5rem',
    fontSize: '1.1rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 6px 20px rgba(0, 91, 170, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
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
    background: 'rgba(253, 216, 53, 0.15)',
    border: '1px solid rgba(253, 216, 53, 0.3)',
    borderRadius: '12px',
    padding: '0.75rem 1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.9rem',
    color: '#b8860b',
    fontWeight: 500
  }
};

export const HapVidaModal: React.FC<Props> = ({ onClose, onSimulate }) => {
  const [authMethod, setAuthMethod] = useState<AuthMethod>('cpf');
  const [cpf, setCpf] = useState('');

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCPF(e.target.value);
    if (formatted.length <= 14) {
      setCpf(formatted);
    }
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

  const isAuthValid = authMethod === 'cpf' ? cpf.length === 14 : true;

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
            <div style={styles.logoText}>
              HapVida
            </div>
          </div>

          <div style={styles.titleContainer}>
            <h2 style={styles.title}>🏥 HapVida</h2>
            <p style={styles.subtitle}>Escolha seu método de autenticação preferido para acessar seus dados de forma segura</p>
          </div>

          <div style={styles.authMethodSelector}>
            <button
              style={{
                ...styles.authMethodButton,
                ...(authMethod === 'cpf' ? styles.authMethodButtonActive : {})
              }}
              onClick={() => setAuthMethod('cpf')}
            >
              <span>📄</span>
              CPF
            </button>
            <button
              style={{
                ...styles.authMethodButton,
                ...(authMethod === 'biometria' ? styles.authMethodButtonActive : {})
              }}
              onClick={() => setAuthMethod('biometria')}
            >
              <span>👆</span>
              Biometria
            </button>
          </div>

          <div style={styles.authContainer}>
            {authMethod === 'cpf' ? (
              <div style={styles.cpfContainer}>
                <input
                  type="text"
                  placeholder="000.000.000-00"
                  value={cpf}
                  onChange={handleCPFChange}
                  style={{
                    ...styles.cpfInput,
                    borderColor: cpf ? '#005baa' : 'rgba(0, 91, 170, 0.3)',
                    boxShadow: cpf ? '0 0 0 3px rgba(0, 91, 170, 0.1)' : 'none'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#005baa';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0, 91, 170, 0.1)';
                  }}
                  onBlur={(e) => {
                    if (!cpf) {
                      e.currentTarget.style.borderColor = 'rgba(0, 91, 170, 0.3)';
                      e.currentTarget.style.boxShadow = 'none';
                    }
                  }}
                />
              </div>
            ) : (
              <div style={styles.biometriaPlaceholder}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#fdd835';
                  e.currentTarget.style.transform = 'scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#005baa';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <div style={styles.biometriaGlow}></div>
                <div style={styles.biometriaText}>
                  <div style={styles.biometriaIcon}>👆</div>
                  <div style={styles.biometriaLabel}>TOQUE AQUI</div>
                  <div style={{ ...styles.biometriaLabel, fontSize: '0.8rem' }}>Biometria Digital</div>
                </div>
              </div>
            )}
          </div>

          <div style={styles.securityBadge}>
            <span>🔒</span>
            <span>Autenticação segura e criptografada</span>
          </div>

          <div style={styles.actions}>
            <button 
              style={{
                ...styles.button,
                opacity: isAuthValid ? 1 : 0.6,
                cursor: isAuthValid ? 'pointer' : 'not-allowed'
              }}
              onClick={isAuthValid ? onSimulate : undefined}
              disabled={!isAuthValid}
              onMouseEnter={(e) => {
                if (isAuthValid) {
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 91, 170, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                  handleButtonHover(e);
                }
              }}
              onMouseLeave={(e) => {
                if (isAuthValid) {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 91, 170, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                }
              }}
            >
              <div className="button-ripple" style={styles.buttonRipple}></div>
              ✨ {authMethod === 'cpf' ? 'Autenticar com CPF' : 'Autenticar com Biometria'}
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
      `}</style>
    </>
  );
};