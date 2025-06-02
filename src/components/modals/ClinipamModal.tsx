import React, { useState, useEffect } from 'react';

interface Props {
  onClose: () => void;
}

export const ClinipamModal: React.FC<Props> = ({ onClose }) => {
  const [senha, setSenha] = useState('');
  const [timer, setTimer] = useState(300); // 5 minutos

  const gerarSenha = () => {
    const aleatoria = Math.floor(Math.random() * 9000 + 1000).toString();
    setSenha(aleatoria);
    setTimer(300);
  };

  useEffect(() => {
    if (!senha) return;
    const intervalo = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(intervalo);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalo);
  }, [senha]);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>🧑‍⚕️ Clinipam - Autenticação</h2>
        <p>Gerar senha de autenticação</p>
        <button className="btn" onClick={gerarSenha}>Gerar Senha</button>

        {senha && (
          <>
            <div className="senha-display">{senha}</div>
            <p className="timer">⏱️ {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}</p>
          </>
        )}

        <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
};
