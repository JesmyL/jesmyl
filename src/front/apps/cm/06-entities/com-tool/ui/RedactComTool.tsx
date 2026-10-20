import { useCheckUserAccessRightsInScope } from '#basis/lib/useCheckUserAccessRightsInScope';
import { translateBase } from '#basis/locale';
import { CmEditorEditComTool } from '$cm+editor/ext';
import { cmComLastOpenSchwAtom, useCmComLastOpenComw } from '$cm/entities/com';
import { useAtomValue } from 'atomaric';
import { MenuComToolName } from 'shared/api';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { CmComTool } from '../ComTool';

export default function CmComToolRedact() {
  const checkAccess = useCheckUserAccessRightsInScope();
  const comw = useCmComLastOpenComw();
  const schw = useAtomValue(cmComLastOpenSchwAtom);

  if (!checkAccess('cm', 'EDIT')) return;

  return (
    <CmEditorEditComTool
      comw={comw}
      schw={schw}
      toolNode={
        <CmComTool
          title={translateBase(it => it[BaseLocaleKey.CmMarkComTool][MenuComToolName.EditCom])}
          icon="PencilEdit02"
        />
      }
    />
  );
}
