import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import styled from 'styled-components';
import { twMerge } from 'tailwind-merge';
import { ScreenTranslationConfig } from '../../model';

interface ScreenTranslationsFaceProps {
  configi: number;
  config: ScreenTranslationConfig;
  putOnClick: (configi: number) => (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  putOnClose?: (configi: number) => PropagationStopper;
  className: string;
}

export const ScreenTranslationsFace = ({
  configi,
  config,
  putOnClick,
  putOnClose,
  className,
}: ScreenTranslationsFaceProps) => {
  return (
    <Face
      className={twMerge('inline-flex gap-2 between pointer ml-2', className)}
      onClick={putOnClick(configi)}
    >
      <span>{config.title}</span>
      {putOnClose && (
        <TheIconButton
          icon="Cancel01"
          confirm="Закрыть окно?"
          onClick={putOnClose(configi)}
        />
      )}
    </Face>
  );
};

const Face = styled.div`
  padding: 3px 10px;
  border-radius: 5px;
  color: var(--color--1);
  min-width: 70px;
`;
