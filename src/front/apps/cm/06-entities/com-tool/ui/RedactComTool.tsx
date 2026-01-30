import { useCheckUserAccessRightsInScope } from '#basis/lib/useCheckUserAccessRightsInScope';
import { CmEditorEditComTool } from '$cm+editor/ext';
import { useCmComLastOpenComw } from '$cm/entities/com';
import { useCmComInScheduleWid } from '$cm/shared/state/contexts';
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
          title="Редактировать"
          icon="PencilEdit02"
        />
      }
    />
  );
}
