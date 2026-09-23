import React, { useState } from 'react';
import { FinancePot } from '../types';

interface WelcomeModalProps {
  onStart: (pots: FinancePot[], dayLabel: string) => void;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({ onStart }) => {
  const [dayLabel, setDayLabel] = useState('Minha semana');
  const [budget, setBudget] = useState({ essential: '180', flexible: '70', reserve: '50' });

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const values = [
      { id: 'essential' as const, label: 'Essenciais', color: 'var(--slate-focus)', value: budget.essential },
      { id: 'flexible' as const, label: 'Lazer / Flexível', color: 'var(--amber-warm)', value: budget.flexible },
      { id: 'reserve' as const, label: 'Reserva de Emergência', color: 'var(--sage-calm)', value: budget.reserve }
    ];
    onStart(values.map((pot) => ({ ...pot, limit: Math.max(Number(pot.value) || 0, 0), spent: 0 })), dayLabel.trim() || 'Minha semana');
  };

  return (
    <div className="welcome-modal" role="dialog" aria-modal="true" aria-labelledby="welcome-title">
      <div className="card-pixel welcome-modal__card">
        <span className="welcome-modal__eyebrow">PRIMEIRO TURNO</span>
        <h1 id="welcome-title" className="pixel-title">Bem-vinda ao TURNO</h1>
        <p className="welcome-modal__lead">Seu dia não precisa caber em um modelo pronto. Vamos montar uma semana que tenha a ver com você.</p>
        <div className="welcome-guide">
          <div><b>🏠 Quarto</b><span>Seu ponto de partida e atalhos.</span></div>
          <div><b>📅 Blocos</b><span>Organize atividades por turno, sem microgerenciar.</span></div>
          <div><b>⚔️ Desafios</b><span>Cadastre provas, trabalhos ou qualquer objetivo.</span></div>
          <div><b>💰 Caixa</b><span>Defina seu orçamento e registre o que gastar.</span></div>
        </div>
        <form onSubmit={submit} className="welcome-form">
          <label>Nome deste turno
            <input value={dayLabel} onChange={(event) => setDayLabel(event.target.value)} />
          </label>
          <p className="welcome-form__label">Quanto você quer separar nesta semana?</p>
          <div className="welcome-form__grid">
            <label>Essenciais<input type="number" min="0" step="1" value={budget.essential} onChange={(event) => setBudget({ ...budget, essential: event.target.value })} /></label>
            <label>Lazer<input type="number" min="0" step="1" value={budget.flexible} onChange={(event) => setBudget({ ...budget, flexible: event.target.value })} /></label>
            <label>Reserva<input type="number" min="0" step="1" value={budget.reserve} onChange={(event) => setBudget({ ...budget, reserve: event.target.value })} /></label>
          </div>
          <small>Você poderá ajustar os valores e registrar extras depois. Nada aqui é uma obrigação.</small>
          <button className="btn-retro welcome-form__submit" type="submit">Começar meu turno →</button>
        </form>
      </div>
    </div>
  );
};
