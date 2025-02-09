import { useAtomValue } from 'front/complect/atoms';
import { IconAlert01StrokeRounded } from 'front/complect/the-icon/icons/alert-01';
import { indexIDB } from 'front/components/index/db/index-idb';
import { useEffect } from 'react';
import { CmComWid } from 'shared/api';
import styled from 'styled-components';
import { cmEditorClientInvocatorMethods } from '../../cm-editor-invocator.methods';
import { comEditorBusiesAtom } from './atoms';

export default function EditCompositionBusyInfo({ comw }: { comw: CmComWid }) {
  const deviceId = indexIDB.useValue.deviceId();
  const busies = useAtomValue(comEditorBusiesAtom);

  useEffect(() => {
    cmEditorClientInvocatorMethods.watchComBusies(null, comw);

    return () => {
      cmEditorClientInvocatorMethods.unwatchComBusies(null);
    };
  }, [comw]);

  const comBusies = busies.filter(busy => busy.comw === comw);

  if (comBusies.length < 2) return <div className="margin-gap color--ok">Больше редактирующих нет</div>;

  if (comBusies[0].deviceId === deviceId) {
    return (
      <div className="color--ko nowrap flex flex-gap margin-gap">
        Редактиру{comBusies.length > 3 ? 'ю' : 'е'}т также
        {comBusies.slice(1).map(({ fio, deviceId }) => {
          return <span key={deviceId}>{fio}</span>;
        })}
      </div>
    );
  }

  return (
    <StyledIsThereOtherFirstRedactorUserDetect className="color--ko flex flex-gap margin-gap">
      <IconAlert01StrokeRounded />
      Редактирует {comBusies[0].fio}
    </StyledIsThereOtherFirstRedactorUserDetect>
  );
}

export const StyledIsThereOtherFirstRedactorUserDetect = styled.div``;
