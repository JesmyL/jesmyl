import { IconPencilEdit02StrokeRounded } from '../../../../../../../complect/the-icon/icons/pencil-edit-02';
import { useAuth } from '../../../../../../index/molecules';
import { ComTool } from '../ComTool';
import { useComToolsCcomContext } from '../useMigratableComTools';

export default function RedactComTool() {
  const auth = useAuth();
  const ccom = useComToolsCcomContext();

  return (
    auth.level > 49 && (
      <ComTool
        title="Редактировать"
        Icon={IconPencilEdit02StrokeRounded}
        path={ccom && `/cm/edit/coms/${ccom.wid}`}
      />
    )
  );
}
