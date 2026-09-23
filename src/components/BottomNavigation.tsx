import React from 'react';
import { ActiveTab } from '../types';

interface BottomNavigationProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab,
  onSelectTab
}) => {
  const tabs: { id: ActiveTab; label: string; icon: string }[] = [
    { id: 'room', label: 'Quarto', icon: '🏠' },
    { id: 'planner', label: 'Blocos', icon: '📅' },
    { id: 'boss', label: 'Desafios', icon: '⚔️' },
    { id: 'finance', label: 'Caixa', icon: '💰' }
  ];

  return (
    <nav style={{
      marginTop: 'auto',
      background: '#201D2C',
      borderTop: '2px solid var(--surface-light)',
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      padding: '6px 0',
      position: 'sticky',
      bottom: 0,
      zIndex: 10
    }}>
      {tabs.map(tab => {
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onSelectTab(tab.id)}
            style={{
              background: 'none',
              border: 'none',
              color: isActive ? 'var(--amber-warm)' : 'var(--text-muted)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2px',
              cursor: 'pointer',
              padding: '6px 0'
            }}
            aria-label={`Ir para aba ${tab.label}`}
            aria-current={isActive ? 'page' : undefined}
          >
            <span style={{ fontSize: '1.15rem' }}>{tab.icon}</span>
            <span style={{
              fontSize: '0.68rem',
              fontWeight: isActive ? 700 : 500,
              fontFamily: 'var(--font-sans)'
            }}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
