import styled from 'styled-components';
import EvaButton from '../../../../../../complect/eva-icon/EvaButton';
import { ScreenTranslationConfig } from '../../model';

export interface ScreenTranslationsFaceProps {
  configi: number;
  config: ScreenTranslationConfig;
  putOnClick: (configi: number) => () => void;
  putOnClose?: (configi: number) => CallbackStopper;
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
      className={'inline-flex flex-gap between pointer margin-gap-l ' + className}
      onClick={putOnClick(configi)}
    >
      <span>{config.title}</span>
      {putOnClose && (
        <EvaButton
          name="close"
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
