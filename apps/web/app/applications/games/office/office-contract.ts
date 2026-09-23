import type { OfficeSnapshot, OfficeWorkspaceItem } from './office-data';

/**
 * UI-facing contract for the future Office API.
 * v4.1 still runs locally, but the screen already consumes a shape that can
 * be returned by GET /office/state without changing the component layout.
 */
export type OfficeGameStateDto = {
  snapshot: OfficeSnapshot;
  workspace: OfficeWorkspaceItem[];
  serverTime: string;
  nextEnergyAt: string | null;
};

export type OfficeCommand =
  | { type: 'work' }
  | { type: 'approve' }
  | { type: 'learn'; skill: 'competence' | 'communication' | 'drive' }
  | { type: 'prank'; prankId?: string }
  | { type: 'boss'; bossId: string }
  | { type: 'upgrade-item'; itemKey: OfficeWorkspaceItem['key'] }
  | { type: 'promotion'; role: string };

export type OfficeCommandResult = {
  state: OfficeGameStateDto;
  message: string;
  rewards?: Array<{
    kind: 'money' | 'xp' | 'reputation' | 'motivation' | 'stress';
    amount: number;
  }>;
};

export const OFFICE_API_ROUTES = {
  state: '/office/state',
  action: '/office/action',
  boss: '/office/boss',
  upgrade: '/office/item/upgrade',
  promotion: '/office/promotion',
} as const;
