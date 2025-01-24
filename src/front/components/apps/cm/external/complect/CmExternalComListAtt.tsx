import { useNavigate } from 'react-router-dom';
import { ScheduleDayEventScopeProps } from 'shared/api';
import useMeetingComFaceList from '../../lists/meetings/useMeetingComFaceList';

interface Props {
  scopeProps: ScheduleDayEventScopeProps;
  listPath: string;
}

export default function CmExternalComListAtt({ scopeProps, listPath }: Props) {
  const navigate = useNavigate();
  const { comFaceListNode } = useMeetingComFaceList(scopeProps.schw, scopeProps.dayi, scopeProps.eventMi, com =>
    navigate(`${listPath}/${com.wid}`),
  );

  return <>{comFaceListNode}</>;
}
