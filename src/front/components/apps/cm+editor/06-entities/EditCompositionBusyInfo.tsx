import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { comEditorBusiesAtom } from '$cm+editor/basis/lib/atoms/com';
import { cmEditorClientTsjrpcMethods } from '$cm+editor/basis/lib/cm-editor.tsjrpc.methods';
import { indexDeviceIdAtom } from '$index/db/atoms';
import { useAtomValue } from 'atomaric';
import { useEffect } from 'react';
import { CmComWid } from 'shared/api';
import styled from 'styled-components';

export const EditCompositionBusyInfo = ({ comw }: { comw: CmComWid }) => {
  const deviceId = useAtomValue(indexDeviceIdAtom);
  const busies = useAtomValue(comEditorBusiesAtom);

  useEffect(() => {
    cmEditorClientTsjrpcMethods.watchComBusies({ comw });

    return () => {
      cmEditorClientTsjrpcMethods.unwatchComBusies();
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
      <LazyIcon icon="Alert01" />
      Редактирует {comBusies[0].fio}
    </StyledIsThereOtherFirstRedactorUserDetect>
  );
};

export const StyledIsThereOtherFirstRedactorUserDetect = styled.div``;
