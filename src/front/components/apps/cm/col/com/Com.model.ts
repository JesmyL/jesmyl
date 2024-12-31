import { TheIconType } from '../../../../../complect/the-icon/model';
import { MigratableEditableComToolName } from '../../editor/col/compositions/EditableCom.model';

export type SettingsItemName = 'ton' | 'font-size' | 'open-anchors';

export interface SettingsItem {
  title: string;
  name: SettingsItemName;
  icon: TheIconType;
}

export type MigratableComToolName = MenuComToolNameList | MigratableEditableComToolName;

export type MenuComToolNameList =
  | 'fullscreen-mode'
  | 'mark-com'
  | 'show-translation'
  | 'chords-variant'
  | 'chord-images'
  | 'selected-toggle'
  | 'is-mini-anchor'
  | 'open-player'
  | 'hide-metronome'
  | 'qr-share'
  | 'cats-binds';

export interface MigratableComTool {
  title: string;
  Icon: TheIconType;
  onClick?: () => void | boolean;
  path?: string;
  tool: MigratableComToolName;
  anchorNode?: React.ReactNode;
}
