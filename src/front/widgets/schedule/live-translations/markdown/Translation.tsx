import { NewWindow } from '#shared/ui/tags/NewWindow';
import { useScheduleWidgetRightsContext } from '#widgets/schedule/useScheduleWidget';
import { useAtomSet } from 'atomaric';
import { useAuth } from 'front/components/index/atoms';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { markdownTranslationAtom } from './atoms';
import { ScheduleWidgetMarkdownTranslationWindow } from './Window';

interface Props {
  md?: string;
}

export const ScheduleWidgetMarkdownTranslation = ({ md = '' }: Props) => {
  const rights = useScheduleWidgetRightsContext();
  const auth = useAuth();
  const [markdown, setMarkdown] = useState(md);
  const setMd = useAtomSet(markdownTranslationAtom);
  const subscribeData = `index-sch-${rights.schedule.w}:${auth.login}` as const;

  useEffect(() => setMarkdown(md), [md]);

  useEffect(() => {
    return hookEffectLine()
      .setTimeout(() => setMd(markdown), 300)
      .effect();
  }, [markdown, setMd]);

  useEffect(() => {
    return setTimeoutEffect(() => {
      if (!auth.fio) return;

      // const liveData: IndexSchWTranslationLiveDataValue = {
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
        target={`schedule-translation-window/${rights.schedule.w}`}
      >
        <ScheduleWidgetMarkdownTranslationWindow />
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
