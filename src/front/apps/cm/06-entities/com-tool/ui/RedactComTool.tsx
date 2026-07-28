import { useCheckUserAccessRightsInScope } from '#basis/lib/useCheckUserAccessRightsInScope';
import { translateBase } from '#basis/locale';
import { CmEditorEditComTool } from '$cm+editor/ext';
import { useCmComLastOpenComw } from '$cm/entities/com';
import { useCmComInScheduleWid } from '$cm/shared/state/contexts';
import { MenuComToolName } from 'shared/api';
import { CmComTool } from '../ComTool';

export default function CmComToolRedact() {
  const checkAccess = useCheckUserAccessRightsInScope();
  const ccomw = useCmComLastOpenComw();
  const schw = useCmComInScheduleWid();

  if (!checkAccess('cm', 'EDIT')) return;

  return (
    <CmEditorEditComTool
      ccomw={ccomw}
      schw={schw}
      toolNode={
        <CmComTool
          title={translateBase(it => it.cm.com.tool[MenuComToolName.EditCom])}
          icon="PencilEdit02"
        />
      }
    />
  );
}
