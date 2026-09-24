export type TimeOfDay = 'morning' | 'afternoon' | 'night';

export type ActiveTab = 'room' | 'planner' | 'boss' | 'focus' | 'finance';

export type DayBlockPeriod = 'morning' | 'afternoon' | 'night' | 'dawn';

export type TaskStatus = 'pending' | 'completed' | 'postponed';

export interface Task {
  id: string;
  title: string;
  timeLabel: string;
  period: DayBlockPeriod;
  isFixed?: boolean;
  dueDate?: string;
  focusTopic?: string;
  status: TaskStatus;
}

export type TopicFamiliarity = 'nebuloso' | 'razoavel' | 'firme';

export interface BossTopic {
  id: string;
  title: string;
  familiarity: TopicFamiliarity;
}

export interface FinancePot {
  id: 'essential' | 'flexible' | 'reserve';
  label: string;
  spent: number;
  limit: number;
  color: string;
}

