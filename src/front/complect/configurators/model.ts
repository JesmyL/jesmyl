import { BackgroundNameType } from './selectors/BackgroundSelector';

export type ConfiguratorEditProps<Config> = {
  config: Config;
  updateConfig: (config: Partial<Config>) => void;
  title?: string;
};

export interface BackgroundConfigProps {
  backgroundInteractive?: BackgroundNameType;
  background: string;
  isWithBackground: boolean;
  backgroundColor: string;
}
