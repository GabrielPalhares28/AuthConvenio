import React from 'react';

interface Props {
  onClose: () => void;
  onSimulate: () => void;
}

export const UnimedModal: React.FC<Props> = ({ onClose, onSimulate }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>🏥 Unimed - Autenticação</h2>
        <p>Escaneie o QR Code com seu aplicativo Unimed</p>
        <div className="qr-code-placeholder">📱 QR</div>

        <div style={{ marginTop: 20 }}>
          <button className="btn" onClick={onSimulate}>Simular Autenticação</button>
          <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};
