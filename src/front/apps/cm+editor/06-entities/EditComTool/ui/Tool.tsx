import { CmEditorEditComEventInterpretation } from '$cm+editor/entities/EditComEventInterpretation';
import { Link } from '@tanstack/react-router';
import { CmComWid, ScheduleWidgetWid } from 'shared/api';

export const CmEditorEditComTool = ({
  ccomw,
  toolNode,
  schw,
}: {
  toolNode: React.ReactNode;
  ccomw: CmComWid | nil;
  schw: ScheduleWidgetWid | nil;
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
      <CmEditorEditComEventInterpretation
        schw={schw}
        comw={ccomw}
        toolNode={toolNode}
        linkNode={linkNode}
      />
    );

  return linkNode;
};
