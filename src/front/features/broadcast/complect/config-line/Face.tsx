import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import styled from 'styled-components';
import { twMerge } from 'tailwind-merge';
import { ScreenBroadcastConfig } from '../../model';

interface ScreenBroadcastFaceProps {
  configi: number;
  config: ScreenBroadcastConfig;
  putOnClick: (configi: number) => (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  putOnClose?: (configi: number) => PropagationStopper;
  className: string;
}

export const ScreenBroadcastFace = ({
  configi,
  config,
  putOnClick,
  putOnClose,
  className,
}: ScreenBroadcastFaceProps) => {
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
