import { CmEditorEditComForSchEvent } from '$cm+editor/entities/EditComForSchEvent';
import { Link } from '@tanstack/react-router';
import { CmComWid, IScheduleWidgetWid } from 'shared/api';

export const CmEditorEditComTool = ({
  ccomw,
  toolNode,
  schw,
}: {
  toolNode: React.ReactNode;
  ccomw: CmComWid | nil;
  schw: IScheduleWidgetWid | nil;
}) => {
  const linkNode = (
    <Link
      to="/cm/edit/coms/$comw/$tab"
      params={{ comw: `${ccomw ?? 0}`, tab: 'watch' }}
    >
      {toolNode}
    </Link>
  );

  if (schw != null)
    return (
      <CmEditorEditComForSchEvent
        schw={schw}
        comw={ccomw}
        toolNode={toolNode}
        linkNode={linkNode}
      />
    );

  return linkNode;
};
