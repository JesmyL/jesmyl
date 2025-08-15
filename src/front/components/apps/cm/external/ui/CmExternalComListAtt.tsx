import { useMeetingComFaceList } from '$cm/lists/meetings/useMeetingComFaceList';
import { useNavigate } from '@tanstack/react-router';
import { ScheduleDayEventScopeProps } from 'shared/api';

interface Props {
  scopeProps: ScheduleDayEventScopeProps;
}

export function CmExternalComListAtt({ scopeProps }: Props) {
  const navigate = useNavigate();

  const { comFaceListNode } = useMeetingComFaceList({
    schw: scopeProps.schw,
    dayi: scopeProps.dayi,
    eventMi: scopeProps.eventMi,
    isPutCcomFaceOff: true,
    comImportantOnClick: ({ com }) => {
      navigate({
        to: '.',
        params: { appName: 'cm' },
        search: {
          attKey: '[cm]:coms',
          dayi: scopeProps.dayi,
          eventMi: scopeProps.eventMi,
          schw: scopeProps.schw,
          comw: com.wid,
        },
      });
    },
  });

  return <>{comFaceListNode}</>;
}
