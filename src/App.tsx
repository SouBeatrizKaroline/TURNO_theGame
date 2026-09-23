import React, { useState } from 'react';
import { TimeOfDay, ActiveTab, Task, BossTopic, FinancePot, TopicFamiliarity } from './types';
import { ResourceHUD } from './components/ResourceHUD';
import { Room } from './components/room/Room';
import { DayPlanner } from './components/planner/DayPlanner';
import { BossArena } from './components/boss/BossArena';
import { FocusSession } from './components/focus/FocusSession';
import { FinancePots } from './components/finance/FinancePots';
import { RescueModal } from './components/RescueModal';
import { BottomNavigation } from './components/BottomNavigation';

export const App: React.FC = () => {
  // Estado Temporal e Navegação
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('afternoon');
  const [activeTab, setActiveTab] = useState<ActiveTab>('room');
  const [isRescueOpen, setIsRescueOpen] = useState(false);
  const [focusTopic, setFocusTopic] = useState<string>('Árvores Binárias');

  // Recursos Vitais
  const [ap, setAp] = useState(65);
  const maxAp = 80;

  // Estado das Tarefas dos 4 Blocos
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Aula de Estrutura de Dados', timeLabel: '08:00', period: 'morning', isFixed: true, status: 'completed' },
    { id: '2', title: 'Revisar listas encadeadas', timeLabel: '10:30', period: 'morning', status: 'completed' },
    { id: '3', title: 'Estágio Remoto', timeLabel: '14:00', period: 'afternoon', isFixed: true, status: 'pending' },
    { id: '4', title: 'Foco: Árvores Binárias', timeLabel: '17:30', period: 'afternoon', status: 'pending' },
    { id: '5', title: 'Jantar com calma', timeLabel: '19:30', period: 'night', status: 'pending' },
    { id: '6', title: 'Exercícios práticos', timeLabel: '20:30', period: 'night', status: 'pending' },
    { id: '7', title: 'Recolhimento para o sono', timeLabel: '23:00', period: 'dawn', isFixed: true, status: 'pending' }
  ]);

  // Estado dos Tópicos do Boss
  const [topics, setTopics] = useState<BossTopic[]>([
    { id: 't1', title: 'Listas Encadeadas', familiarity: 'firme' },
    { id: 't2', title: 'Pilhas e Filas', familiarity: 'razoavel' },
    { id: 't3', title: 'Árvores Binárias', familiarity: 'nebuloso' }
  ]);

  // Estado dos 3 Potes Financeiros
  const [pots, setPots] = useState<FinancePot[]>([
    { id: 'essential', label: 'Essenciais', spent: 120, limit: 180, color: 'var(--slate-focus)' },
    { id: 'flexible', label: 'Lazer / Flexível', spent: 35, limit: 70, color: 'var(--amber-warm)' },
    { id: 'reserve', label: 'Reserva de Emergência', spent: 50, limit: 50, color: 'var(--sage-calm)' }
  ]);

  // Ações de Tarefas
  const handleCompleteTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: 'completed' } : t));
  };

  const handlePostponeTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: 'postponed' } : t));
  };

  const handleRemoveTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  // Ações de Foco
  const handleStartFocus = (topicTitle: string = 'Árvores Binárias') => {
    setFocusTopic(topicTitle);
    setActiveTab('focus');
  };

  const handleFinishFocus = (result: TopicFamiliarity) => {
    setTopics(prev => prev.map(t => t.title === focusTopic ? { ...t, familiarity: result } : t));
    // Conclui também a tarefa de estudo caso exista na lista
    setTasks(prev => prev.map(t => t.title.includes(focusTopic) ? { ...t, status: 'completed' } : t));
    setActiveTab('boss');
  };

  // Ações Financeiras
  const handleAddExpense = (potId: 'essential' | 'flexible' | 'reserve', amount: number) => {
    setPots(prev => prev.map(p => p.id === potId ? { ...p, spent: p.spent + amount } : p));
  };

  // Protocolo de Resgate "Tudo Mudou"
  const handleApplyRescue = () => {
    setTasks(prev => prev.map(t => {
      if (t.period === 'afternoon' && !t.isFixed && t.status === 'pending') {
        return { ...t, status: 'postponed' };
      }
      return t;
    }));
    setAp(prev => Math.min(prev + 15, maxAp));
    setIsRescueOpen(false);
  };

  const flexibleBudgetRemaining = (pots.find(p => p.id === 'flexible')?.limit || 0) - (pots.find(p => p.id === 'flexible')?.spent || 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      {/* Topo / HUD */}
      <ResourceHUD
        timeOfDay={timeOfDay}
        onTimeChange={setTimeOfDay}
        ap={ap}
        maxAp={maxAp}
        flexibleBudget={Math.max(flexibleBudgetRemaining, 0)}
        onOpenRescue={() => setIsRescueOpen(true)}
      />

      {/* Roteador Visual da Vertical Slice */}
      <main style={{ flex: 1, paddingBottom: '16px' }}>
        {activeTab === 'room' && (
          <Room
            timeOfDay={timeOfDay}
            onNavigate={tab => setActiveTab(tab)}
            onStartFocus={() => handleStartFocus('Árvores Binárias')}
          />
        )}

        {activeTab === 'planner' && (
          <DayPlanner
            tasks={tasks}
            onCompleteTask={handleCompleteTask}
            onPostponeTask={handlePostponeTask}
            onRemoveTask={handleRemoveTask}
          />
        )}

        {activeTab === 'boss' && (
          <BossArena
            topics={topics}
            onStartFocus={handleStartFocus}
          />
        )}

        {activeTab === 'focus' && (
          <FocusSession
            topicTitle={focusTopic}
            onFinish={handleFinishFocus}
            onCancel={() => setActiveTab('boss')}
          />
        )}

        {activeTab === 'finance' && (
          <FinancePots
            pots={pots}
            onAddExpense={handleAddExpense}
          />
        )}
      </main>

      {/* Modal de Reorganização Tática */}
      <RescueModal
        isOpen={isRescueOpen}
        onClose={() => setIsRescueOpen(false)}
        onApplyRescue={handleApplyRescue}
      />

      {/* Barra de Navegação Inferior Acessível */}
      <BottomNavigation
        activeTab={activeTab}
        onSelectTab={setActiveTab}
      />
    </div>
  );
};

