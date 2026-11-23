import { translateBase, translateEditorBase } from '#basis/locale';
import { Button } from '#shared/components';
import { EditableCom } from '$cm+editor/shared/classes/EditableCom';
import { cmEditComClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { useMemo } from 'react';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { EditorLocaleKey } from 'shared/model/+locale/_EditorLocaleKey';
import { objectLength } from 'shared/utils/object.utils';

export const CmEditorComTabComBroadcastCopyNL = ({ com, nameSpacei }: { com: EditableCom; nameSpacei: number }) => {
  const otherSpacei = nameSpacei === 0 ? 1 : 0;

  const isVisible = useMemo(
    () => objectLength(com.top.nl?.[nameSpacei]) === 0 && objectLength(com.top.nl?.[otherSpacei]) > 0,
    [com.top.nl, nameSpacei, otherSpacei],
  );

  if (!isVisible) return null;

  return (
    <Button
      icon="Copy01"
      className="ml-2"
      onClick={() =>
        cmEditComClientTsjrpcMethods.copyNL({ comw: com.wid, fromSpacei: otherSpacei, toSpacei: nameSpacei })
      }
    >
      {translateEditorBase(EditorLocaleKey.CmEditBroadcastCopyNl, {
        t: translateBase(otherSpacei === 0 ? BaseLocaleKey.CmBroadcastFive : BaseLocaleKey.CmBroadcastDuo),
      })}
    </Button>
  );
};
