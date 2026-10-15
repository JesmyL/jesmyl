import { BrowserWindow } from 'electron';

export * from '../../shared/const/electron';
export * from '../../shared/utils/lazyInit';
export * from '../../shared/utils/utils';

export const electronAppWinListHolder: BrowserWindow[] = [];
