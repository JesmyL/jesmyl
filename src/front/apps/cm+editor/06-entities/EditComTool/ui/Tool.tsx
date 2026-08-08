import { CmEditorEditComEventInterpretation } from '$cm+editor/entities/EditComEventInterpretation';
import { Link } from '@tanstack/react-router';
import { CmComWid, ScheduleWidgetWid } from 'shared/api';

export const CmEditorEditComTool = ({
  comw,
  toolNode,
  schw,
}: {
  toolNode: React.ReactNode;
  comw: CmComWid | nil;
  schw: ScheduleWidgetWid | nil;
}) => {
  const linkNode = (
    <Link
      to="/cm/edit/coms/$comw/$tab"
      params={{ comw: `${comw ?? 0}`, tab: 'watch' }}
    >
      {toolNode}
    </Link>
  );

  if (schw != null)
    return (
      <CmEditorEditComEventInterpretation
        schw={schw}
        comw={comw}
        toolNode={toolNode}
        linkNode={linkNode}
      />
    );

  return linkNode;
};
