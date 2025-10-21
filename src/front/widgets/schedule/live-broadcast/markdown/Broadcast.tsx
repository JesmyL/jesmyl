import { hookEffectPipe, setTimeoutPipe } from '#shared/lib/hookEffectPipe';
import { NewWindow } from '#shared/ui/tags/NewWindow';
import { useScheduleWidgetRightsContext } from '#widgets/schedule/contexts';
import { useAuth } from '$index/shared/state';
import { useAtomSet } from 'atomaric';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { markdownBroadcastAtom } from './atoms';
import { ScheduleWidgetMarkdownBroadcastWindow } from './Window';

interface Props {
  md?: string;
}

export const ScheduleWidgetMarkdownBroadcast = ({ md = '' }: Props) => {
  const rights = useScheduleWidgetRightsContext();
  const auth = useAuth();
  const [markdown, setMarkdown] = useState(md);
  const setMd = useAtomSet(markdownBroadcastAtom);
  const subscribeData = `index-sch-${rights.schedule.w}:${auth.login}` as const;

  useEffect(() => setMarkdown(md), [md]);

  useEffect(() => {
    return hookEffectPipe()
      .pipe(setTimeoutPipe(() => setMd(markdown), 300))
      .effect();
  }, [markdown, setMd]);

  useEffect(() => {
    return setTimeoutEffect(() => {
      if (!auth.fio) return;

      // const liveData: IndexSchWBroadcastLiveDataValue = {
      //   fio: auth.fio,
      //   markdown,
      // };

      // soki.send({ liveData, subscribeData }, 'index');
    }, 300);
  }, [auth.fio, subscribeData, markdown]);

  useEffect(
    () => () => {
      // soki.send({ liveData: null, subscribeData }, 'index');
    },
    [subscribeData],
  );

  return (
    <>
      <NewWindow
        onInit={win => win.document.querySelector('html')?.classList.add('dark')}
        features="top=100,left=30000,width=400,height=200"
        target={`schedule-broadcast-window/${rights.schedule.w}`}
      >
        <ScheduleWidgetMarkdownBroadcastWindow />
      </NewWindow>
      <StyledTextRedactor
        onChange={event => setMarkdown(event.currentTarget.value)}
        value={markdown}
      />
    </>
  );
};

const StyledTextRedactor = styled.textarea`
  width: 100%;
  height: 100%;
`;
