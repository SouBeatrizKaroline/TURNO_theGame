import React, { useState, useEffect } from 'react';
import { TopicFamiliarity } from '../../types';

interface FocusSessionProps {
  topicTitle: string;
  onFinish: (result: TopicFamiliarity) => void;
  onCancel: () => void;
}

export const FocusSession: React.FC<FocusSessionProps> = ({
  topicTitle,
  onFinish,
  onCancel
}) => {
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(true);
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
            onClick={() => onFinish('nebuloso')}
            className="btn-retro"
            style={{ background: 'var(--surface-light)', color: 'var(--rose-alert)', padding: '12px' }}
          >
            [ Travado ] — Encontrei barreiras, preciso rever
          </button>

          <button
            onClick={() => onFinish('razoavel')}
            className="btn-retro"
            style={{ background: 'var(--surface-light)', color: 'var(--amber-warm)', padding: '12px' }}
          >
            [ Fluindo ] — Compreendi a base, praticando mais
          </button>

          <button
            onClick={() => onFinish('firme')}
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
          ESTRUTURA DE DADOS
        </span>
        <h2 className="pixel-title" style={{ fontSize: '1.4rem', marginTop: '4px' }}>
          {topicTitle}
        </h2>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Modo: Exercícios e Resolução Prática
        </p>
      </div>

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

      <div style={{ display: 'flex', gap: '10px', width: '100%', maxWidth: '280px' }}>
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
      </div>

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

