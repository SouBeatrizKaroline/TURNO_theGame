import React from 'react';
import { Task, DayBlockPeriod } from '../../types';

interface DayPlannerProps {
  tasks: Task[];
  onCompleteTask: (id: string) => void;
  onPostponeTask: (id: string) => void;
  onRemoveTask: (id: string) => void;
}

export const DayPlanner: React.FC<DayPlannerProps> = ({
  tasks,
  onCompleteTask,
  onPostponeTask,
  onRemoveTask
}) => {
  const blocks: { period: DayBlockPeriod; label: string; icon: string }[] = [
    { period: 'morning', label: 'Manhã (06h - 12h)', icon: '🌅' },
    { period: 'afternoon', label: 'Tarde (12h - 18h)', icon: '☀️' },
    { period: 'night', label: 'Noite (18h - 23h)', icon: '🌙' },
    { period: 'dawn', label: 'Madrugada (Descanso)', icon: '🛌' }
  ];

  return (
    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <div>
        <h2 className="pixel-title" style={{ fontSize: '1.2rem', color: 'var(--text-main)' }}>
          Blocos do Dia
        </h2>
        <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          Alinhe seus turnos sem microgerenciamento de minutos.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {blocks.map(block => {
          const blockTasks = tasks.filter(t => t.period === block.period);

          return (
            <div key={block.period} className="card-pixel" style={{ padding: '12px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                marginBottom: '8px',
                borderBottom: '1px solid var(--surface-light)',
                paddingBottom: '4px'
              }}>
                <span>{block.icon}</span>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--amber-warm)' }}>
                  {block.label}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {blockTasks.length === 0 ? (
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                    Margem livre para recuperação ou imprevistos.
                  </p>
                ) : (
                  blockTasks.map(task => (
                    <div
                      key={task.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        background: 'var(--bg-deep)',
                        padding: '8px 10px',
                        borderRadius: '4px',
                        border: '1px solid var(--surface-light)',
                        opacity: task.status === 'completed' ? 0.6 : task.status === 'postponed' ? 0.75 : 1
                      }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                            {task.timeLabel}
                          </span>
                          <span style={{
                            fontSize: '0.82rem',
                            fontWeight: 600,
                            textDecoration: task.status === 'completed' ? 'line-through' : 'none',
                            color: task.isFixed ? 'var(--slate-focus)' : 'var(--text-main)'
                          }}>
                            {task.title}
                          </span>
                        </div>
                        {task.status === 'postponed' && (
                          <span style={{ fontSize: '0.65rem', color: 'var(--amber-warm)' }}>
                            → Reorganizado para amanhã
                          </span>
                        )}
                      </div>

                      {/* Ações inline imediatas em 1 toque */}
                      <div style={{ display: 'flex', gap: '4px' }}>
                        {task.status !== 'completed' && (
                          <button
                            onClick={() => onCompleteTask(task.id)}
                            className="btn-retro"
                            style={{
                              background: 'var(--sage-calm)',
                              color: '#1A1823',
                              padding: '3px 7px',
                              fontSize: '0.7rem'
                            }}
                            title="Concluir tarefa"
                            aria-label={`Concluir ${task.title}`}
                          >
                            ✓
                          </button>
                        )}

                        {task.status === 'pending' && !task.isFixed && (
                          <button
                            onClick={() => onPostponeTask(task.id)}
                            className="btn-retro"
                            style={{
                              background: 'var(--surface-light)',
                              color: 'var(--text-muted)',
                              padding: '3px 7px',
                              fontSize: '0.7rem'
                            }}
                            title="Adiar sem culpa"
                            aria-label={`Adiar ${task.title}`}
                          >
                            →
                          </button>
                        )}

                        {!task.isFixed && (
                          <button
                            onClick={() => onRemoveTask(task.id)}
                            className="btn-retro"
                            style={{
                              background: 'transparent',
                              color: 'var(--rose-alert)',
                              border: '1px solid var(--surface-light)',
                              padding: '3px 6px',
                              fontSize: '0.7rem'
                            }}
                            title="Remover"
                            aria-label={`Remover ${task.title}`}
                          >
                            ×
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

