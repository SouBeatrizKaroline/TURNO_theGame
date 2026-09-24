import React, { useState, useEffect } from 'react';
import { TopicFamiliarity } from '../../types';

interface FocusSessionProps {
  topicTitle: string;
  linkedTaskTitle?: string;
  onFinish: (result: TopicFamiliarity, minutes: number) => void;
  onCancel: () => void;
}

export const FocusSession: React.FC<FocusSessionProps> = ({
  topicTitle,
  linkedTaskTitle,
  onFinish,
  onCancel
}) => {
  const [durationMinutes, setDurationMinutes] = useState(25);
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isReflecting, setIsReflecting] = useState(false);

  useEffect(() => {
    let timer: number | undefined;
    if (isRunning && secondsLeft > 0 && !isReflecting) {
      timer = window.setInterval(() => {
        setSecondsLeft(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, secondsLeft, isReflecting]);

  useEffect(() => {
    if (secondsLeft === 0 && hasStarted) setIsReflecting(true);
  }, [secondsLeft, hasStarted]);

  const chooseDuration = (minutes: number) => {
    if (hasStarted) return;
    setDurationMinutes(minutes);
    setSecondsLeft(minutes * 60);
  };

  const startSession = () => {
    setHasStarted(true);
    setIsRunning(true);
  };

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  if (isReflecting) {
    return (
      <div style={{ padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'center' }}>
        <h2 className="pixel-title" style={{ fontSize: '1.3rem', color: 'var(--amber-warm)' }}>
          Sessão Concluída!
        </h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>
          Como foi o estudo em <strong>{topicTitle}</strong>?
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '8px' }}>
          <button
            onClick={() => onFinish('nebuloso', durationMinutes)}
            className="btn-retro"
            style={{ background: 'var(--surface-light)', color: 'var(--rose-alert)', padding: '12px' }}
          >
            [ Travado ] — Encontrei barreiras, preciso rever
          </button>

          <button
            onClick={() => onFinish('razoavel', durationMinutes)}
            className="btn-retro"
            style={{ background: 'var(--surface-light)', color: 'var(--amber-warm)', padding: '12px' }}
          >
            [ Fluindo ] — Compreendi a base, praticando mais
          </button>

          <button
            onClick={() => onFinish('firme', durationMinutes)}
            className="btn-retro"
            style={{ background: 'var(--sage-calm)', color: '#1A1823', padding: '12px' }}
          >
            [ Firme ] — Resolvi exercícios com segurança
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      padding: '24px 16px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '70vh',
      gap: '20px',
      textAlign: 'center'
    }}>
      <div>
        <span style={{ fontSize: '0.72rem', color: 'var(--slate-focus)', fontWeight: 700, textTransform: 'uppercase' }}>
          FOCO PERSONALIZADO
        </span>
        <h2 className="pixel-title" style={{ fontSize: '1.4rem', marginTop: '4px' }}>
          {topicTitle}
        </h2>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Escolha um tempo que caiba no seu turno. Você pode pausar sem perder o registro.
        </p>
        {linkedTaskTitle && <p style={{ fontSize: '0.72rem', color: 'var(--slate-focus)' }}>Bloco vinculado: {linkedTaskTitle}</p>}
      </div>

      {!hasStarted && <div className="focus-duration-picker" aria-label="Duração do foco">
        {[15, 25, 45].map(minutes => <button key={minutes} className={`btn-retro ${durationMinutes === minutes ? 'is-selected' : ''}`} onClick={() => chooseDuration(minutes)}>{minutes} min</button>)}
      </div>}

      {/* Relógio Austero sem Distrações */}
      <div style={{
        background: 'var(--surface-card)',
        border: '3px solid var(--surface-light)',
        borderRadius: '8px',
        padding: '24px 36px',
        boxShadow: '0 6px 0 #121017'
      }}>
        <span className="pixel-title" style={{ fontSize: '3rem', color: 'var(--text-main)', letterSpacing: '2px' }}>
          {formattedTime}
        </span>
      </div>

      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', maxWidth: '280px', fontStyle: 'italic' }}>
        Sua mente está no mundo real. Esta tela apenas preserva seu espaço de tempo.
      </p>

      {!hasStarted ? <button className="btn-retro" onClick={startSession} style={{ background: 'var(--amber-warm)', color: '#1A1823', width: '100%', maxWidth: '280px', padding: '12px' }}>▶ Começar foco de {durationMinutes} min</button> : <div style={{ display: 'flex', gap: '10px', width: '100%', maxWidth: '280px' }}>
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="btn-retro"
          style={{
            flex: 1,
            background: isRunning ? 'var(--surface-light)' : 'var(--amber-warm)',
            color: isRunning ? 'var(--text-main)' : '#1A1823',
            padding: '10px'
          }}
        >
          {isRunning ? '⏸ Pausar' : '▶ Retomar'}
        </button>

        <button
          onClick={() => setIsReflecting(true)}
          className="btn-retro"
          style={{
            flex: 1,
            background: 'var(--sage-calm)',
            color: '#1A1823',
            padding: '10px'
          }}
        >
          ✓ Concluir
        </button>
      </div>}

      <button
        onClick={onCancel}
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--text-muted)',
          fontSize: '0.75rem',
          cursor: 'pointer',
          textDecoration: 'underline'
        }}
      >
        Cancelar sessão
      </button>
    </div>
  );
};
