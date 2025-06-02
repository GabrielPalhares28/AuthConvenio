import React, { useState } from 'react';

interface Props {
  onClose: () => void;
}

export const OutrosModal: React.FC<Props> = ({ onClose }) => {
  const [cpf, setCpf] = useState('');
  const [resultado, setResultado] = useState<null | 'ok' | 'fail'>(null);

  const confirmar = () => {
    const lastDigit = parseInt(cpf.charAt(cpf.length - 1));
    setResultado(lastDigit % 2 === 0 ? 'ok' : 'fail');
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>🏥 Outros Convênios</h2>
        <input
          className="input"
          placeholder="Digite seu CPF"
          value={cpf}
          onChange={(e) => setCpf(e.target.value.replace(/\D/g, ''))}
          maxLength={11}
        />
        <button className="btn" onClick={confirmar}>Confirmar</button>
        <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>

        {resultado === 'ok' && <div className="feedback success">✅ Autenticação Confirmada</div>}
        {resultado === 'fail' && <div className="feedback error">❌ CPF não encontrado</div>}
      </div>
    </div>
  );
};
