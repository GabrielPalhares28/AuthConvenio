import React, { useState, useEffect } from 'react';

interface ClinipamModalProps {
  onClose: () => void;
  onSimulate: () => void;
}

type AuthMethod = 'cpf' | 'biometria';
type FlowStep = 'auth' | 'senha' | 'executar' | 'biometria' | 'agenda';

interface Senha {
  id: string;
  especialidade: string;
  numero: string;
  validade: string;
  status: 'pendente' | 'ativa' | 'expirada';
  tempoRestante?: number;
}

const styles = {
  overlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)'
  },
  content: {
    background: 'linear-gradient(145deg, #ffffff, #f8fafb)',
    borderRadius: '28px',
    padding: '2rem',
    width: '95%',
    maxWidth: '650px',
    maxHeight: '90vh',
    overflowY: 'auto' as const,
    boxShadow: '0 30px 100px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.6)',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '1.5rem',
    position: 'relative' as const,
    animation: 'modalSlideIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
    border: '1px solid rgba(255, 255, 255, 0.3)'
  },
  closeButton: {
    position: 'absolute' as const,
    top: '1rem',
    right: '1rem',
    background: 'rgba(108, 117, 125, 0.1)',
    border: 'none',
    borderRadius: '50%',
    width: '36px',
    height: '36px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.3rem',
    color: '#6c757d',
    transition: 'all 0.2s ease',
    backdropFilter: 'blur(10px)',
    zIndex: 10
  },
  logoContainer: {
    width: 80,
    height: 80,
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
  logoText: {
    color: '#ffffff',
    fontSize: '0.85rem',
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
    fontSize: '1.6rem',
    fontWeight: 700,
    margin: 0,
    background: 'linear-gradient(135deg, #ff6b35, #d35400)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  },
  subtitle: {
    color: '#4a5568',
    fontSize: '0.9rem',
    margin: 0,
    fontWeight: 500,
    textAlign: 'center' as const,
    lineHeight: 1.5
  },
  stepIndicator: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    background: 'rgba(255, 107, 53, 0.1)',
    padding: '0.5rem 1rem',
    borderRadius: '20px',
    fontSize: '0.8rem',
    fontWeight: 600,
    color: '#ff6b35',
    border: '1px solid rgba(255, 107, 53, 0.2)'
  },
  authMethodSelector: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1rem'
  },
  authMethodButton: {
    background: 'rgba(255, 107, 53, 0.1)',
    border: '2px solid rgba(255, 107, 53, 0.3)',
    borderRadius: '12px',
    padding: '0.75rem 1.2rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontSize: '0.85rem',
    fontWeight: 500,
    color: '#ff6b35',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  authMethodButtonActive: {
    background: 'linear-gradient(135deg, #ff6b35, #f39c12)',
    border: '2px solid #ff6b35',
    color: '#ffffff',
    boxShadow: '0 4px 15px rgba(255, 107, 53, 0.3)'
  },
  mainContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1.5rem',
    alignItems: 'center'
  },
  cpfInput: {
    width: '100%',
    maxWidth: '280px',
    padding: '1rem',
    borderRadius: '12px',
    border: '2px solid rgba(255, 107, 53, 0.3)',
    fontSize: '1rem',
    textAlign: 'center' as const,
    outline: 'none',
    transition: 'all 0.3s ease',
    background: 'rgba(255, 255, 255, 0.9)'
  },
  senhaContainer: {
    width: '100%',
    background: 'linear-gradient(145deg, #f8fafb, #ffffff)',
    border: '2px solid rgba(255, 107, 53, 0.2)',
    borderRadius: '16px',
    padding: '1.5rem',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
  },
  senhaHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
    paddingBottom: '0.5rem',
    borderBottom: '1px solid rgba(255, 107, 53, 0.2)'
  },
  senhaTitle: {
    fontSize: '1.1rem',
    fontWeight: 600,
    color: '#1a202c',
    margin: 0
  },
  statusBadge: {
    padding: '0.3rem 0.8rem',
    borderRadius: '12px',
    fontSize: '0.75rem',
    fontWeight: 500,
    textTransform: 'uppercase' as const
  },
  statusPendente: {
    background: '#fef3cd',
    color: '#856404',
    border: '1px solid #ffeaa7'
  },
  statusAtiva: {
    background: '#d1ecf1',
    color: '#0c5460',
    border: '1px solid #bee5eb'
  },
  statusExpirada: {
    background: '#f8d7da',
    color: '#721c24',
    border: '1px solid #f5c6cb'
  },
  senhaList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.8rem'
  },
  senhaItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.8rem',
    background: 'rgba(255, 255, 255, 0.7)',
    borderRadius: '8px',
    border: '1px solid rgba(255, 107, 53, 0.1)'
  },
  senhaInfo: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.2rem'
  },
  senhaEspecialidade: {
    fontWeight: 600,
    color: '#1a202c',
    fontSize: '0.9rem'
  },
  senhaNumero: {
    color: '#ff6b35',
    fontWeight: 500,
    fontSize: '0.8rem'
  },
  senhaValidade: {
    color: '#6c757d',
    fontSize: '0.75rem'
  },
  biometriaContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '1rem',
    padding: '1.5rem',
    background: 'linear-gradient(145deg, #f7f9fc, #e8f4f8)',
    borderRadius: '20px',
    border: '2px dashed #ff6b35',
    width: '100%',
    maxWidth: '320px'
  },
  biometriaPlaceholder: {
    width: 140,
    height: 140,
    background: 'linear-gradient(145deg, #ffffff, #f0f8ff)',
    border: '3px solid #ff6b35',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '3rem',
    color: '#ff6b35',
    position: 'relative' as const,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 8px 25px rgba(255, 107, 53, 0.2), inset 0 2px 4px rgba(255, 255, 255, 0.8)'
  },
  biometriaText: {
    textAlign: 'center' as const,
    color: '#ff6b35',
    fontWeight: 600
  },
  timerContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '0.5rem',
    padding: '1rem',
    background: 'rgba(255, 107, 53, 0.1)',
    borderRadius: '12px',
    border: '1px solid rgba(255, 107, 53, 0.2)'
  },
  timerText: {
    fontSize: '1.2rem',
    fontWeight: 700,
    color: '#ff6b35'
  },
  timerLabel: {
    fontSize: '0.8rem',
    color: '#6c757d',
    textAlign: 'center' as const
  },
  agendaContainer: {
    width: '100%',
    background: 'linear-gradient(145deg, #f8fafb, #ffffff)',
    border: '2px solid rgba(255, 107, 53, 0.2)',
    borderRadius: '16px',
    padding: '1.5rem'
  },
  agendaItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    background: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '10px',
    marginBottom: '0.8rem',
    border: '1px solid rgba(255, 107, 53, 0.1)',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
  },
  button: {
    background: 'linear-gradient(135deg, #ff6b35, #f39c12, #ff8c42)',
    color: '#fff',
    border: 'none',
    borderRadius: '14px',
    padding: '1rem 2rem',
    fontSize: '0.95rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 6px 20px rgba(255, 107, 53, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
    minWidth: '160px',
    position: 'relative' as const,
    overflow: 'hidden'
  },
  buttonSecondary: {
    background: 'linear-gradient(135deg, #6c757d, #868e96)',
    boxShadow: '0 6px 20px rgba(108, 117, 125, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
  },
  buttonDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed'
  },
  actions: {
    display: 'flex',
    gap: '1rem',
    width: '100%',
    justifyContent: 'center',
    flexWrap: 'wrap' as const
  },
  infoCard: {
    background: 'rgba(255, 107, 53, 0.05)',
    border: '1px solid rgba(255, 107, 53, 0.2)',
    borderRadius: '12px',
    padding: '1rem',
    fontSize: '0.85rem',
    color: '#4a5568',
    lineHeight: 1.5,
    width: '100%'
  }
};

export const ClinipamModal: React.FC<ClinipamModalProps> = ({ onClose }) => {
  const [authMethod, setAuthMethod] = useState<AuthMethod>('cpf');
  const [cpf, setCpf] = useState('');
  const [currentStep, setCurrentStep] = useState<FlowStep>('auth');
  const [senhas, setSenhas] = useState<Senha[]>([]);
  const [biometriaTimer, setBiometriaTimer] = useState<number>(0);
  const [proximaColeta, setProximaColeta] = useState<string>('');

  useEffect(() => {
    // Simular carregamento das senhas após autenticação
    if (currentStep === 'senha') {
      setSenhas([
        {
          id: '1',
          especialidade: 'Fisioterapia',
          numero: 'FIS2024001',
          validade: '15/07/2024',
          status: 'ativa'
        },
        {
          id: '2',
          especialidade: 'Fonoaudiologia',
          numero: 'FON2024002',
          validade: '20/07/2024',
          status: 'pendente'
        },
        {
          id: '3',
          especialidade: 'Terapia Ocupacional',
          numero: 'TO2024003',
          validade: '12/07/2024',
          status: 'expirada'
        }
      ]);
    }
  }, [currentStep]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (biometriaTimer > 0) {
      interval = setInterval(() => {
        setBiometriaTimer(prev => {
          if (prev <= 1) {
            setProximaColeta(new Date(Date.now() + 40 * 60 * 1000).toLocaleTimeString());
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [biometriaTimer]);

  const formatCPF = (value: string): string => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const formatted = formatCPF(e.target.value);
    if (formatted.length <= 14) {
      setCpf(formatted);
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAuthenticate = (): void => {
    if (isAuthValid) {
      setCurrentStep('senha');
    }
  };

  const handleSolicitarSenha = (): void => {
    // Simular processo de solicitação
    alert('Senha solicitada! Prazo: até 10 dias úteis');
  };

  const handleExecutarSenha = (): void => {
    setCurrentStep('executar');
  };

  const handleBiometriaColeta = (): void => {
    setBiometriaTimer(40 * 60); // 40 minutos em segundos
    setCurrentStep('agenda');
    alert('Biometria coletada com sucesso! Próxima coleta em 40 minutos.');
  };

  const getStepTitle = (): string => {
    switch (currentStep) {
      case 'auth': return 'Autenticação';
      case 'senha': return 'Gestão de Senhas';
      case 'executar': return 'Executar no Sistema';
      case 'biometria': return 'Coleta Biométrica';
      case 'agenda': return 'Agenda de Atendimentos';
      default: return 'Clinipam';
    }
  };

  const getStepDescription = (): string => {
    switch (currentStep) {
      case 'auth': return 'Escolha seu método de autenticação';
      case 'senha': return 'Gerencie as senhas de liberação por especialidade';
      case 'executar': return 'Insira a senha no campo "executar" do site da operadora';
      case 'biometria': return 'Coleta da digital do responsável ou paciente';
      case 'agenda': return 'Acompanhe os horários para próximas coletas';
      default: return '';
    }
  };

  const isAuthValid = authMethod === 'cpf' ? cpf.length === 14 : true;

  const renderContent = () => {
    switch (currentStep) {
      case 'auth':
        return (
          <>
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

            <div style={styles.mainContainer}>
              {authMethod === 'cpf' ? (
                <input
                  type="text"
                  placeholder="000.000.000-00"
                  value={cpf}
                  onChange={handleCPFChange}
                  style={{
                    ...styles.cpfInput,
                    borderColor: cpf ? '#ff6b35' : 'rgba(255, 107, 53, 0.3)',
                    boxShadow: cpf ? '0 0 0 3px rgba(255, 107, 53, 0.1)' : 'none'
                  }}
                />
              ) : (
                <div style={styles.biometriaContainer}>
                  <div style={styles.biometriaPlaceholder}>
                    <span>👆</span>
                  </div>
                  <div style={styles.biometriaText}>
                    <div>TOQUE AQUI</div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>Biometria Digital</div>
                  </div>
                </div>
              )}
            </div>
          </>
        );

      case 'senha':
        return (
          <div style={styles.senhaContainer}>
            <div style={styles.senhaHeader}>
              <h3 style={styles.senhaTitle}>Senhas por Especialidade</h3>
              <button 
                style={{ ...styles.button, fontSize: '0.8rem', padding: '0.5rem 1rem', minWidth: 'auto' }}
                onClick={handleSolicitarSenha}
              >
                + Solicitar Nova
              </button>
            </div>
            
            <div style={styles.infoCard}>
              <strong>ℹ️ Importante:</strong> Cada especialidade requer uma senha específica. 
              O prazo de liberação pode ser imediato ou até 10 dias úteis, conforme determinado pelo convênio.
            </div>

            <div style={styles.senhaList}>
              {senhas.map(senha => (
                <div key={senha.id} style={styles.senhaItem}>
                  <div style={styles.senhaInfo}>
                    <div style={styles.senhaEspecialidade}>{senha.especialidade}</div>
                    <div style={styles.senhaNumero}>Senha: {senha.numero}</div>
                    <div style={styles.senhaValidade}>Válida até: {senha.validade}</div>
                  </div>
                  <div style={{
                    ...styles.statusBadge,
                    ...(senha.status === 'pendente' ? styles.statusPendente : 
                        senha.status === 'ativa' ? styles.statusAtiva : styles.statusExpirada)
                  }}>
                    {senha.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'executar':
        return (
          <div style={styles.mainContainer}>
            <div style={styles.infoCard}>
              <strong>🌐 Próximo Passo:</strong> Acesse o site da operadora e insira a senha no campo "executar" 
              para registrar o atendimento e possibilitar a cobrança.
            </div>
            
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💻</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1a202c', marginBottom: '0.5rem' }}>
                Redirecionando para o Site da Operadora
              </div>
              <div style={{ fontSize: '0.9rem', color: '#6c757d' }}>
                Você será direcionado para inserir a senha no sistema
              </div>
            </div>
          </div>
        );

      case 'biometria':
        return (
          <div style={styles.mainContainer}>
            <div style={styles.infoCard}>
              <strong>👆 Coleta Biométrica:</strong> Após inserir a senha, o sistema exigirá a coleta da digital 
              do responsável legal ou paciente. Cada biometria permite a cobrança de um atendimento.
            </div>

            <div style={styles.biometriaContainer}>
              <div 
                style={styles.biometriaPlaceholder}
                onClick={handleBiometriaColeta}
              >
                <span>👆</span>
              </div>
              <div style={styles.biometriaText}>
                <div>TOQUE PARA COLETAR</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>Biometria Digital</div>
              </div>
            </div>

            {biometriaTimer > 0 && (
              <div style={styles.timerContainer}>
                <div style={styles.timerText}>{formatTime(biometriaTimer)}</div>
                <div style={styles.timerLabel}>Tempo para próxima coleta</div>
              </div>
            )}
          </div>
        );

      case 'agenda':
        return (
          <div style={styles.agendaContainer}>
            <div style={styles.senhaHeader}>
              <h3 style={styles.senhaTitle}>Agenda de Atendimentos</h3>
            </div>

            <div style={styles.infoCard}>
              <strong>⏱️ Sistema de Intervalos:</strong> Aguarde 40 minutos entre cada coleta de biometria. 
              O sistema indica o horário exato para a próxima validação.
            </div>

            {proximaColeta && (
              <div style={styles.timerContainer}>
                <div style={styles.timerText}>{proximaColeta}</div>
                <div style={styles.timerLabel}>Próxima coleta disponível</div>
              </div>
            )}

            <div style={styles.agendaItem}>
              <div>
                <div style={{ fontWeight: 600 }}>Fisioterapia - João Silva</div>
                <div style={{ fontSize: '0.8rem', color: '#6c757d' }}>14:00 - Sala 1</div>
              </div>
              <div style={{
                ...styles.statusBadge,
                ...styles.statusAtiva
              }}>
                Liberado
              </div>
            </div>

            <div style={styles.agendaItem}>
              <div>
                <div style={{ fontWeight: 600 }}>Fonoaudiologia - Maria Santos</div>
                <div style={{ fontSize: '0.8rem', color: '#6c757d' }}>14:40 - Sala 2</div>
              </div>
              <div style={{
                ...styles.statusBadge,
                ...styles.statusPendente
              }}>
                Aguardando
              </div>
            </div>
          </div>
        );

      default:
        return null;
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
            <div style={styles.logoText}>Clinipam</div>
          </div>

          <div style={styles.stepIndicator}>
            <span>📍</span>
            <span>{getStepTitle()}</span>
          </div>

          <div style={styles.titleContainer}>
            <h2 style={styles.title}>🏥 Sistema Clinipam</h2>
            <p style={styles.subtitle}>{getStepDescription()}</p>
          </div>

          {renderContent()}

          <div style={styles.actions}>
            {currentStep === 'auth' && (
              <>
                <button 
                  style={{
                    ...styles.button,
                    ...(isAuthValid ? {} : styles.buttonDisabled)
                  }}
                  onClick={handleAuthenticate}
                  disabled={!isAuthValid}
                >
                  ✨ Autenticar
                </button>
                <button 
                  style={{ ...styles.button, ...styles.buttonSecondary }} 
                  onClick={onClose}
                >
                  Cancelar
                </button>
              </>
            )}

            {currentStep === 'senha' && (
              <>
                <button 
                  style={styles.button}
                  onClick={handleExecutarSenha}
                >
                  🚀 Executar Senhas
                </button>
                <button 
                  style={{ ...styles.button, ...styles.buttonSecondary }} 
                  onClick={() => setCurrentStep('auth')}
                >
                  ← Voltar
                </button>
              </>
            )}

            {currentStep === 'executar' && (
              <>
                <button 
                  style={styles.button}
                  onClick={() => setCurrentStep('biometria')}
                >
                  ✅ Senha Inserida
                </button>
                <button 
                  style={{ ...styles.button, ...styles.buttonSecondary }} 
                  onClick={() => setCurrentStep('senha')}
                >
                  ← Voltar
                </button>
              </>
            )}

            {currentStep === 'biometria' && (
              <>
                <button 
                  style={{ ...styles.button, ...styles.buttonSecondary }} 
                  onClick={() => setCurrentStep('executar')}
                >
                  ← Voltar
                </button>
              </>
            )}

            {currentStep === 'agenda' && (
              <>
                <button 
                  style={styles.button}
                  onClick={() => setCurrentStep('biometria')}
                >
                  🔄 Nova Coleta
                </button>
                <button 
                  style={{ ...styles.button, ...styles.buttonSecondary }} 
                  onClick={onClose}
                >
                  ✅ Finalizar
                </button>
              </>
            )}
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