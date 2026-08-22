import { useCmMeetingComwList } from '$cm/entities/meeting';
import { CmComFaceList } from '$cm/ext';
import { useNavigate } from '@tanstack/react-router';
import { ScheduleDayEventScopeProps } from 'shared/api';

interface Props {
  scopeProps: ScheduleDayEventScopeProps;
}

export function CmExternalComListAtt({ scopeProps }: Props) {
  const navigate = useNavigate();

  const pack = useCmMeetingComwList({
    schw: scopeProps.schw,
    dayi: scopeProps.dayi,
    eventMi: scopeProps.eventMi,
  });

  return (
    <CmComFaceList
      list={pack.s}
      isPutCcomFaceOff
      importantOnClick={({ com }) => {
        navigate({
          to: '.',
          params: { appName: 'cm' },
          search: {
            attKey: '[cm]:coms',
            dayi: scopeProps.dayi,
            eventMi: scopeProps.eventMi,
            schw: scopeProps.schw,
            comw: com.w,
          },
        });
      }}
    />
  );
}
