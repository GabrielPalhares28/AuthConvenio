import React, { useState, useRef } from 'react';
import logoUnimed from '../../assets/logo-unimed.png';

interface Props {
  onClose: () => void;
  onSubmit: (tokenData: { token: string; image?: File }) => void;
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
    maxWidth: '580px',
    maxHeight: '90vh',
    overflow: 'auto',
    boxShadow: '0 25px 80px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.5)',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '1.5rem',
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
    width: 80,
    height: 80,
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
    fontSize: '1.6rem',
    fontWeight: 700,
    margin: 0,
    background: 'linear-gradient(135deg, #00a651, #2d5a4a)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  },
  subtitle: {
    color: '#4a5568',
    fontSize: '0.95rem',
    margin: 0,
    fontWeight: 500,
    textAlign: 'center' as const,
    lineHeight: 1.5
  },
  formContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1.5rem'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.5rem'
  },
  label: {
    fontSize: '0.9rem',
    fontWeight: 600,
    color: '#2d3748',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  input: {
    padding: '1rem 1.25rem',
    borderRadius: '12px',
    border: '2px solid #e2e8f0',
    fontSize: '1rem',
    fontWeight: 500,
    transition: 'all 0.3s ease',
    background: '#ffffff',
    color: '#2d3748',
    fontFamily: 'monospace',
    letterSpacing: '1px'
  },
  inputFocused: {
    border: '2px solid #00a651',
    boxShadow: '0 0 0 3px rgba(0, 166, 81, 0.1)',
    outline: 'none'
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    margin: '0.5rem 0'
  },
  dividerLine: {
    flex: 1,
    height: '1px',
    background: 'linear-gradient(to right, transparent, #e2e8f0, transparent)'
  },
  dividerText: {
    fontSize: '0.8rem',
    color: '#718096',
    fontWeight: 500,
    padding: '0 0.5rem'
  },
  uploadContainer: {
    border: '2px dashed #cbd5e0',
    borderRadius: '16px',
    padding: '2rem',
    textAlign: 'center' as const,
    background: 'linear-gradient(145deg, #f7fafc, #ffffff)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    position: 'relative' as const
  },
  uploadContainerActive: {
    border: '2px dashed #00a651',
    background: 'rgba(0, 166, 81, 0.05)'
  },
  uploadIcon: {
    fontSize: '2.5rem',
    color: '#a0aec0',
    marginBottom: '0.5rem'
  },
  uploadIconActive: {
    color: '#00a651'
  },
  uploadText: {
    fontSize: '0.9rem',
    color: '#4a5568',
    fontWeight: 500,
    marginBottom: '0.25rem'
  },
  uploadSubtext: {
    fontSize: '0.8rem',
    color: '#718096'
  },
  hiddenInput: {
    display: 'none'
  },
  imagePreview: {
    maxWidth: '100%',
    maxHeight: '200px',
    borderRadius: '12px',
    marginTop: '1rem',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
  },
  removeImageButton: {
    position: 'absolute' as const,
    top: '0.5rem',
    right: '0.5rem',
    background: 'rgba(220, 53, 69, 0.9)',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '24px',
    height: '24px',
    cursor: 'pointer',
    fontSize: '0.8rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  instructionsBox: {
    background: 'rgba(0, 166, 81, 0.08)',
    border: '1px solid rgba(0, 166, 81, 0.2)',
    borderRadius: '12px',
    padding: '1rem',
    fontSize: '0.85rem',
    color: '#2d5a4a',
    lineHeight: 1.4
  },
  instructionsList: {
    margin: '0.5rem 0 0 0',
    paddingLeft: '1.2rem'
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
    overflow: 'hidden',
    disabled: false
  },
  buttonDisabled: {
    background: 'linear-gradient(135deg, #a0aec0, #cbd5e0)',
    cursor: 'not-allowed',
    boxShadow: '0 4px 12px rgba(160, 174, 192, 0.3)'
  },
  buttonSecondary: {
    background: 'linear-gradient(135deg, #6c757d, #868e96)',
    boxShadow: '0 6px 20px rgba(108, 117, 125, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
  },
  actions: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1rem',
    width: '100%',
    alignItems: 'center'
  },
  validationMessage: {
    fontSize: '0.8rem',
    color: '#e53e3e',
    marginTop: '0.25rem'
  }
};

export const UnimedModal: React.FC<Props> = ({ onClose, onSubmit }) => {
  const [token, setToken] = useState('');
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isDragOver, setIsDragOver] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const [validationError, setValidationError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    setToken(value);
    setValidationError('');
  };

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setValidationError('Por favor, selecione apenas arquivos de imagem.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB
      setValidationError('A imagem deve ter no máximo 5MB.');
      return;
    }

    setUploadedImage(file);
    setValidationError('');

    // Criar preview da imagem
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const removeImage = () => {
    setUploadedImage(null);
    setImagePreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = () => {
    if (!token.trim() && !uploadedImage) {
      setValidationError('Por favor, informe o número do token ou anexe uma foto.');
      return;
    }

    if (token.trim() && token.length < 6) {
      setValidationError('O token deve ter pelo menos 6 dígitos.');
      return;
    }

    onSubmit({
      token: token.trim(),
      image: uploadedImage || undefined
    });
  };

  const isFormValid = (token.trim().length >= 6) || uploadedImage;

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
            <h2 style={styles.title}>🏥 Token Unimed</h2>
            <p style={styles.subtitle}>Informe o número do token ou anexe uma foto para validação</p>
          </div>

          <div style={styles.instructionsBox}>
            <strong>📋 Como obter o token:</strong>
            <ol style={styles.instructionsList}>
              <li>Abra o aplicativo do convênio Unimed</li>
              <li>Gere o token de autorização</li>
              <li>Digite o número abaixo ou tire uma foto legível</li>
            </ol>
          </div>

          <div style={styles.formContainer}>
            {/* Campo de entrada do token */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                🔢 Número do Token
              </label>
              <input
                type="text"
                value={token}
                onChange={handleTokenChange}
                placeholder="Ex: 123456789"
                style={{
                  ...styles.input,
                  ...(inputFocused ? styles.inputFocused : {})
                }}
                onFocus={() => setInputFocused(true)}
                onBlur={() => setInputFocused(false)}
                maxLength={20}
              />
            </div>

            {/* Divisor */}
            <div style={styles.divider}>
              <div style={styles.dividerLine}></div>
              <span style={styles.dividerText}>OU</span>
              <div style={styles.dividerLine}></div>
            </div>

            {/* Upload de imagem */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                📷 Foto do Token
              </label>
              <div
                style={{
                  ...styles.uploadContainer,
                  ...(isDragOver ? styles.uploadContainerActive : {})
                }}
                onDrop={handleDrop}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragOver(true);
                }}
                onDragLeave={() => setIsDragOver(false)}
                onClick={() => fileInputRef.current?.click()}
              >
                {uploadedImage && imagePreview ? (
                  <div style={{ position: 'relative' }}>
                    <img 
                      src={imagePreview} 
                      alt="Preview do token" 
                      style={styles.imagePreview}
                    />
                    <button
                      style={styles.removeImageButton}
                      onClick={(e) => {
                        e.stopPropagation();
                        removeImage();
                      }}
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <>
                    <div style={{
                      ...styles.uploadIcon,
                      ...(isDragOver ? styles.uploadIconActive : {})
                    }}>
                      📷
                    </div>
                    <div style={styles.uploadText}>
                      Clique para selecionar ou arraste a foto aqui
                    </div>
                    <div style={styles.uploadSubtext}>
                      PNG, JPG até 5MB
                    </div>
                  </>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileInputChange}
                  style={styles.hiddenInput}
                />
              </div>
            </div>

            {validationError && (
              <div style={styles.validationMessage}>
                ⚠️ {validationError}
              </div>
            )}
          </div>

          <div style={styles.actions}>
            <button 
              style={{
                ...styles.button,
                ...(isFormValid ? {} : styles.buttonDisabled)
              }}
              onClick={handleSubmit}
              disabled={!isFormValid}
              onMouseEnter={(e) => {
                if (isFormValid) {
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 166, 81, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                }
              }}
              onMouseLeave={(e) => {
                if (isFormValid) {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 166, 81, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                }
              }}
            >
              📤 Enviar Token
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