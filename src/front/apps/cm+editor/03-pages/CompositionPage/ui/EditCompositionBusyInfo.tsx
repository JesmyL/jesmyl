import { translateEditorBase } from '#basis/locale';
import { TheIconLoading } from '#shared/ui/the-icon/IconLoading';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { cmEditorClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { comEditorBusiesAtom } from '$cm+editor/shared/state/com';
import { indexDeviceIdAtom } from '$index/shared/state';
import { useAtomValue } from 'atomaric';
import { useEffect } from 'react';
import { CmComWid } from 'shared/api';
import { EditorLocaleKey } from 'shared/model/+locale/_EditorLocaleKey';

export const CmEditorCompositionBusyInfo = ({ comw }: { comw: CmComWid }) => {
  const deviceId = useAtomValue(indexDeviceIdAtom);
  const busies = useAtomValue(comEditorBusiesAtom);

  useEffect(() => {
    cmEditorClientTsjrpcMethods.watchComBusies({ comw });

    return () => {
      cmEditorClientTsjrpcMethods.unwatchComBusies();
    };
  }, [comw]);

  if (!busies) return <TheIconLoading />;

  const comBusies = busies.filter(busy => busy.comw === comw);

  if (comBusies.length < 2)
    return <div className="text-xOK">{translateEditorBase(EditorLocaleKey.CmNoEditorsMore)}</div>;

  if (comBusies[0].deviceId === deviceId) {
    return (
      <div className="text-xKO nowrap flex gap-2">
        {translateEditorBase(EditorLocaleKey.CmEditsToo, {
          m: comBusies.length > 3,
          l: comBusies
            .slice(1)
            .map(({ fio }) => fio)
            .join('; '),
        })}
      </div>
    );
  }

  return (
    <div className="text-xKO flex gap-2 com-editors-busy">
      <LazyIcon icon="InformationCircle" />
      {translateEditorBase(EditorLocaleKey.CmEdits, { f: comBusies[0].fio })}
    </div>
  );
};
