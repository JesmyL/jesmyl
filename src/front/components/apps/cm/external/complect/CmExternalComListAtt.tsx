import { useMeetingComFaceList } from '@cm/lists/meetings/useMeetingComFaceList';
import { useNavigate } from 'react-router-dom';
import { ScheduleDayEventScopeProps } from 'shared/api';

interface Props {
  scopeProps: ScheduleDayEventScopeProps;
  listPath: string;
}

export function CmExternalComListAtt({ scopeProps, listPath }: Props) {
  const navigate = useNavigate();
  const { comFaceListNode } = useMeetingComFaceList(scopeProps.schw, scopeProps.dayi, scopeProps.eventMi, com =>
    navigate(`${listPath}/${com.wid}`),
  );

  return <>{comFaceListNode}</>;
}
