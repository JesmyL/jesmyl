import { TheIconType } from 'front/model';
import { MigratableComToolName } from 'shared/api';

export type SettingsItemName = 'ton' | 'font-size' | 'open-anchors';

export interface SettingsItem {
  title: string;
  name: SettingsItemName;
  icon: TheIconType;
}

export interface MigratableComTool {
  title: string;
  Icon: TheIconType;
  onClick?: () => void | boolean;
  path?: string;
  tool: MigratableComToolName;
  anchorNode?: React.ReactNode;
}
