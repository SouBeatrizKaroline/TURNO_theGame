import React from 'react';
import { TimeOfDay } from '../../types';
import { RoomVisual } from './RoomVisual';

interface RoomProps {
  timeOfDay: TimeOfDay;
  onNavigate: (tab: 'planner' | 'boss' | 'finance') => void;
  onStartFocus: () => void;
  dayProgress: number;
  dayLabel: string;
}

export const Room: React.FC<RoomProps> = ({ timeOfDay, onNavigate, onStartFocus, dayProgress, dayLabel }) => {
  return (
    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {/* Cenário Central do Quarto */}
      <RoomVisual timeOfDay={timeOfDay} onNavigate={onNavigate} dayProgress={dayProgress} />

      {/* Cartão de Contexto Operacional da Tarde */}
      <div className="card-pixel" style={{ padding: '14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--amber-warm)', textTransform: 'uppercase' }}>
            {timeOfDay === 'morning' ? 'Turno da Manhã' : timeOfDay === 'afternoon' ? 'Turno da Tarde' : 'Turno da Noite'}
          </span>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            {dayLabel}
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}>
            <span>🔒</span>
            <span style={{ fontWeight: 600 }}>14:00 - Estágio</span>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>(Compromisso Fixo)</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}>
            <span>⚔️</span>
            <span style={{ fontWeight: 600 }}>17:30 - Árvores Binárias</span>
            <span style={{ fontSize: '0.7rem', color: 'var(--amber-warm)' }}>(Boss em 3 dias)</span>
          </div>
        </div>
        <div className="room-progress" aria-label={`Progresso dos blocos: ${dayProgress}%`}>
          <div className="room-progress__label"><span>Ritmo do dia</span><strong>{dayProgress}%</strong></div>
          <div className="room-progress__track"><span style={{ width: `${dayProgress}%` }} /></div>
          <small>{dayProgress >= 70 ? 'O quarto sente que você encontrou seu ritmo.' : 'Cada bloco é uma escolha, não uma cobrança.'}</small>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <button
            onClick={() => onNavigate('planner')}
            className="btn-retro"
            style={{
              background: 'var(--surface-light)',
              color: 'var(--text-main)',
              padding: '8px',
              fontSize: '0.78rem'
            }}
          >
            📅 Abrir Agenda
          </button>

          <button
            onClick={onStartFocus}
            className="btn-retro"
            style={{
              background: 'var(--amber-warm)',
              color: '#1A1823',
              padding: '8px',
              fontSize: '0.78rem'
            }}
          >
            ⚡ Iniciar Foco
          </button>
        </div>
      </div>
    </div>
  );
};
