import React from 'react';

interface ConvenioCardProps {
  name: string;
  icon: string;
  description: string;
  color: string;
  onClick: () => void;
}

export const ConvenioCard: React.FC<ConvenioCardProps> = ({ name, icon, description, color, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="convenio-card"
      style={{
        border: '2px solid transparent',
        background: '#fff',
        borderRadius: 20,
        padding: 30,
        textAlign: 'center',
        boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
        transition: 'all 0.3s',
        cursor: 'pointer'
      }}
    >
      <div
        className="convenio-icon"
        style={{
          background: color,
          width: 80,
          height: 80,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px',
          color: '#fff',
          fontSize: '2rem',
          fontWeight: 'bold'
        }}
      >
        {icon}
      </div>
      <h3 style={{ fontSize: '1.4rem', fontWeight: 600 }}>{name}</h3>
      <p style={{ color: '#6c757d', fontSize: '0.95rem' }}>{description}</p>
    </div>
  );
};
 export default ConvenioCard;