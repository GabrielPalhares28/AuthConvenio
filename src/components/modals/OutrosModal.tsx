import React, { useState } from 'react';

interface Props {
  onClose: () => void;
}

interface Sessao {
  id: string;
  horario: string;
  profissional: string;
  especialidade: string;
  sala: string;
}

export const OutrosModal: React.FC<Props> = ({ onClose }) => {
  const [cpf, setCpf] = useState('');
  const [etapa, setEtapa] = useState<'cpf' | 'agenda' | 'confirmacao'>('cpf');
  const [resultado, setResultado] = useState<null | 'ok' | 'fail'>(null);
  const [pacienteInfo, setPacienteInfo] = useState<any>(null);
  const [sessoesConfirmadas, setSessoesConfirmadas] = useState<string[]>([]);

  // Mock das sessões do dia - em produção virá da API
  const sessoesMock: Sessao[] = [
    {
      id: '1',
      horario: '08:00',
      profissional: 'Dr. João Silva',
      especialidade: 'Fisioterapia',
      sala: 'Sala 101'
    },
    {
      id: '2',
      horario: '09:30',
      profissional: 'Dra. Maria Santos',
      especialidade: 'Fonoaudiologia',
      sala: 'Sala 203'
    },
    {
      id: '3',
      horario: '14:00',
      profissional: 'Dr. Carlos Oliveira',
      especialidade: 'Terapia Ocupacional',
      sala: 'Sala 105'
    }
  ];

  const confirmarCpf = () => {
    if (cpf.length !== 11) {
      setResultado('fail');
      return;
    }
    
    const lastDigit = parseInt(cpf.charAt(cpf.length - 1));
    if (lastDigit % 2 === 0) {
      setResultado('ok');
      // Mock dos dados do paciente
      setPacienteInfo({
        nome: 'João da Silva Junior',
        convenio: 'Unimed',
        data: new Date().toLocaleDateString('pt-BR')
      });
      setTimeout(() => {
        setEtapa('agenda');
      }, 1500);
    } else {
      setResultado('fail');
    }
  };

  const toggleSessao = (sessaoId: string) => {
    setSessoesConfirmadas(prev => 
      prev.includes(sessaoId)
        ? prev.filter(id => id !== sessaoId)
        : [...prev, sessaoId]
    );
  };

  const selecionarTodas = () => {
    setSessoesConfirmadas(sessoesMock.map(s => s.id));
  };

  const desselecionarTodas = () => {
    setSessoesConfirmadas([]);
  };

  const confirmarCheckin = () => {
    if (sessoesConfirmadas.length === 0) {
      alert('Selecione pelo menos uma sessão para confirmar o check-in.');
      return;
    }
    setEtapa('confirmacao');
    // Aqui seria feita a chamada para API para confirmar o check-in
    setTimeout(() => {
      onClose();
    }, 3000);
  };

  const voltarParaCpf = () => {
    setEtapa('cpf');
    setCpf('');
    setResultado(null);
    setPacienteInfo(null);
    setSessoesConfirmadas([]);
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
      maxWidth: etapa === 'agenda' ? '600px' : '460px',
      maxHeight: '90vh',
      overflowY: 'auto' as const,
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
    logoText: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#ffffff'
    },
    title: {
      fontSize: '1.75rem',
      fontWeight: 700,
      margin: 0,
      background: 'linear-gradient(135deg, #6c5ce7, #a29bfe)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      textAlign: 'center' as const
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
      width: '200px',
      transition: 'all 0.3s ease'
    },
    buttonSecondary: {
      background: 'linear-gradient(135deg, #6c757d, #868e96)',
      boxShadow: '0 6px 20px rgba(108, 117, 125, 0.3)',
      marginTop: '0.5rem'
    },
    buttonSmall: {
      padding: '0.5rem 1rem',
      fontSize: '0.9rem',
      width: 'auto',
      margin: '0 0.5rem'
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
    },
    pacienteInfo: {
      background: 'rgba(108, 92, 231, 0.1)',
      border: '2px solid rgba(108, 92, 231, 0.2)',
      borderRadius: '12px',
      padding: '1rem',
      width: '100%',
      textAlign: 'center' as const
    },
    sessaoCard: {
      background: '#ffffff',
      border: '2px solid #e2e8f0',
      borderRadius: '12px',
      padding: '1rem',
      margin: '0.5rem 0',
      width: '100%',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    sessaoCardSelecionada: {
      border: '2px solid #6c5ce7',
      background: 'rgba(108, 92, 231, 0.05)'
    },
    sessaoInfo: {
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'flex-start'
    },
    checkbox: {
      width: '20px',
      height: '20px',
      accentColor: '#6c5ce7'
    },
    agendaContainer: {
      width: '100%',
      maxWidth: '500px'
    },
    buttonsContainer: {
      display: 'flex',
      flexWrap: 'wrap' as const,
      gap: '0.5rem',
      justifyContent: 'center',
      width: '100%'
    }
  };

  const renderCpfStep = () => (
    <>
      <div style={styles.logoContainer}>
        <div style={styles.logoText}>🏥</div>
      </div>

      <h2 style={styles.title}>Check-in - Outros Convênios</h2>
      <p style={styles.subtitle}>Digite seu CPF para iniciar o check-in</p>

      <input
        style={styles.input}
        placeholder="Digite seu CPF"
        value={cpf}
        onChange={(e) => setCpf(e.target.value.replace(/\D/g, ''))}
        maxLength={11}
      />

      <button style={styles.button} onClick={confirmarCpf}>Confirmar</button>
      <button style={{ ...styles.button, ...styles.buttonSecondary }} onClick={onClose}>Cancelar</button>

      {resultado === 'ok' && (
        <div style={{ ...styles.feedback, ...styles.success }}>
          ✅ CPF Validado! Carregando agenda...
        </div>
      )}
      {resultado === 'fail' && (
        <div style={{ ...styles.feedback, ...styles.error }}>
          ❌ CPF não encontrado ou inválido
        </div>
      )}
    </>
  );

  const renderAgendaStep = () => (
    <>
      <div style={styles.logoContainer}>
        <div style={styles.logoText}>📅</div>
      </div>

      <h2 style={styles.title}>Agenda do Dia</h2>
      
      {pacienteInfo && (
        <div style={styles.pacienteInfo}>
          <strong>{pacienteInfo.nome}</strong><br/>
          Convênio: {pacienteInfo.convenio}<br/>
          Data: {pacienteInfo.data}
        </div>
      )}

      <p style={styles.subtitle}>
        Selecione as sessões que o paciente irá realizar hoje:
      </p>

      <div style={styles.agendaContainer}>
        <div style={styles.buttonsContainer}>
          <button 
            style={{ ...styles.button, ...styles.buttonSmall }} 
            onClick={selecionarTodas}
          >
            Selecionar Todas
          </button>
          <button 
            style={{ ...styles.button, ...styles.buttonSecondary, ...styles.buttonSmall }} 
            onClick={desselecionarTodas}
          >
            Desmarcar Todas
          </button>
        </div>

        {sessoesMock.map((sessao) => (
          <div
            key={sessao.id}
            style={{
              ...styles.sessaoCard,
              ...(sessoesConfirmadas.includes(sessao.id) ? styles.sessaoCardSelecionada : {})
            }}
            onClick={() => toggleSessao(sessao.id)}
          >
            <div style={styles.sessaoInfo}>
              <strong>{sessao.horario} - {sessao.especialidade}</strong>
              <div>{sessao.profissional}</div>
              <div style={{ color: '#666', fontSize: '0.9rem' }}>{sessao.sala}</div>
            </div>
            <input
              type="checkbox"
              style={styles.checkbox}
              checked={sessoesConfirmadas.includes(sessao.id)}
              onChange={() => toggleSessao(sessao.id)}
            />
          </div>
        ))}
      </div>

      <div style={styles.buttonsContainer}>
        <button style={styles.button} onClick={confirmarCheckin}>
          Confirmar Check-in ({sessoesConfirmadas.length} sessões)
        </button>
        <button style={{ ...styles.button, ...styles.buttonSecondary }} onClick={voltarParaCpf}>
          Voltar
        </button>
      </div>
    </>
  );

  const renderConfirmacaoStep = () => (
    <>
      <div style={styles.logoContainer}>
        <div style={styles.logoText}>✅</div>
      </div>

      <h2 style={styles.title}>Check-in Realizado!</h2>
      
      <div style={{ ...styles.feedback, ...styles.success }}>
        ✅ Check-in confirmado com sucesso!<br/>
        {sessoesConfirmadas.length} sessão(ões) liberada(s) para evolução.
      </div>

      <p style={styles.subtitle}>
        Os profissionais estão autorizados a realizar as evoluções no sistema.
        Esta janela será fechada automaticamente.
      </p>
    </>
  );

  return (
    <>
      <div style={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
        <div style={styles.content}>
          {etapa === 'cpf' && renderCpfStep()}
          {etapa === 'agenda' && renderAgendaStep()}
          {etapa === 'confirmacao' && renderConfirmacaoStep()}
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