import React from 'react';

interface RestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRecover: (amount: number, message: string) => void;
}

export const RestModal: React.FC<RestModalProps> = ({ isOpen, onClose, onRecover }) => {
  if (!isOpen) return null;
  return (
    <div className="rest-modal" role="dialog" aria-modal="true" aria-labelledby="rest-title">
      <div className="card-pixel rest-modal__card">
        <div className="rest-modal__heading">
          <div><span>🛌 ESPAÇO DE RECUPERAÇÃO</span><h2 id="rest-title" className="pixel-title">Como seu corpo está?</h2></div>
          <button onClick={onClose} aria-label="Fechar recuperação">×</button>
        </div>
        <p>Descansar também é uma ação do turno. Escolha uma pausa que caiba na sua realidade e proteja sua higiene do sono.</p>
        <div className="rest-options">
          <button className="btn-retro" onClick={() => onRecover(6, 'Pausa curta registrada. +6 AP.')}>☕ Pausa curta <small>+6 AP</small></button>
          <button className="btn-retro" onClick={() => onRecover(12, 'Sono protegido. +12 AP.')}>🌙 Sono protegido <small>+12 AP</small></button>
          <button className="btn-retro" onClick={() => onRecover(3, 'Respiração registrada. +3 AP.')}>🌿 Respirar um pouco <small>+3 AP</small></button>
        </div>
      </div>
    </div>
  );
};
