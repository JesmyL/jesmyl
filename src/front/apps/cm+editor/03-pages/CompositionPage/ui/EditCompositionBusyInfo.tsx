import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { cmEditorClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { comEditorBusiesAtom } from '$cm+editor/shared/state/com';
import { indexDeviceIdAtom } from '$index/shared/state';
import { useAtomValue } from 'atomaric';
import { useEffect } from 'react';
import { CmComWid } from 'shared/api';
import styled from 'styled-components';

export const CmEditorCompositionBusyInfo = ({ comw }: { comw: CmComWid }) => {
  const deviceId = useAtomValue(indexDeviceIdAtom);
  const busies = useAtomValue(comEditorBusiesAtom);

  useEffect(() => {
    cmEditorClientTsjrpcMethods.watchComBusies({ comw });

    return () => {
      cmEditorClientTsjrpcMethods.unwatchComBusies();
    };
  }, [comw]);

  const comBusies = busies.filter(busy => busy.comw === comw);

  if (comBusies.length < 2) return <div className="m-2 text-xOK">Больше редактирующих нет</div>;

  if (comBusies[0].deviceId === deviceId) {
    return (
      <div className="text-xKO nowrap flex gap-2 m-2">
        Редактиру{comBusies.length > 3 ? 'ю' : 'е'}т также
        {comBusies.slice(1).map(({ fio, deviceId }) => {
          return <span key={deviceId}>{fio}</span>;
        })}
      </div>
    );
  }

  return (
    <StyledCmEditorCompositionIsThereOtherFirstRedactorUserDetect className="text-xKO flex gap-2 m-2">
      <LazyIcon icon="Alert01" />
      Редактирует {comBusies[0].fio}
    </StyledCmEditorCompositionIsThereOtherFirstRedactorUserDetect>
  );
};

export const StyledCmEditorCompositionIsThereOtherFirstRedactorUserDetect = styled.div``;
