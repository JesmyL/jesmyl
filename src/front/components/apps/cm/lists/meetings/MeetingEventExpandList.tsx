import { useState } from 'react';
import Dropdown from '../../../../../complect/dropdown/Dropdown';
import EvaButton from '../../../../../complect/eva-icon/EvaButton';
import EvaIcon from '../../../../../complect/eva-icon/EvaIcon';
import mylib from '../../../../../complect/my-lib/MyLib';
import useCmNav from '../../base/useCmNav';
import ComFace from '../../col/com/face/ComFace';
import { MeetingsEvent } from './MeetingsEvent';
import { useMeetings } from './useMeetings';

enum CopyMode {
  All,
  ExpandedOnly,
  WithoutExpanded,
}

export default function MeetingEventExpandList() {
  const { meetings } = useMeetings();
  const {
    appRouteData: { eventContext = [] },
  } = useCmNav();
  let currentEventListPathName = '';
  const [expandedEventLists, setExpandedEventLists] = useState<number[]>([]);
  const [copyMode, setCopyMode] = useState(CopyMode.All);

  if (!meetings) return null;

  const events = meetings.events
    ?.sort((a, b) => {
      const aCtx = meetings.contexts[a.contextw].context;
      const bCtx = meetings.contexts[b.contextw].context;
      return mylib.findMap(aCtx, (ctx, ctxi) => ctx - bCtx[ctxi], 0) || aCtx.length - bCtx.length;
    })
    .filter((event) => {
      const context = meetings.contexts[event.contextw].context;

      return !eventContext.some((ctx, ctxi) => context[ctxi] !== ctx);
    });

  const prepareCopyText = () => {
    const eventGroups: MeetingsEvent[][] = [];
    let lastContextw = 0;

    events?.forEach((event) => {
      if (
        copyMode === CopyMode.All ||
        (copyMode === CopyMode.ExpandedOnly
          ? expandedEventLists.includes(event.wid)
          : !expandedEventLists.includes(event.wid))
      ) {
        if (event.contextw === lastContextw) eventGroups.at(-1)?.push(event);
        else eventGroups.push([event]);

        lastContextw = event.contextw;
      }
    });
    return eventGroups
      .map((group) => {
        return group
          .map((event) => {
            const context = meetings.contexts[event.contextw].context;
            const titles = context.slice(eventContext.length).map((ctx) => meetings.names[ctx]);

            return `${event.name}${titles.length ? ` (${titles.join(' - ')})` : ''}\n${event.coms
              ?.map((com) => `${com.number}. ${com.name.trim()}`)
              .join('\n')}`;
          })
          .join('\n\n');
      })
      .join('\n\n');
  };

  return (
    <>
      {events?.map((event, eventi) => {
        const context = meetings.contexts[event.contextw].context;

        if (eventContext.some((ctx, ctxi) => context[ctxi] !== ctx)) return null;
        const names = meetings.names;
        const isWithPathTitle = currentEventListPathName !== '' + context;

        currentEventListPathName = '' + context;
        const isExpanded = expandedEventLists.includes(event.wid);
        const titles = context.slice(eventContext.length).map((ctx) => names[ctx]);

        return (
          <div key={eventi}>
            {isWithPathTitle && <h3 className="color--7">{titles.join(' - ')}</h3>}
            <h3
              className="flex pointer"
              onClick={() => {
                if (isExpanded) {
                  setExpandedEventLists((list) => list.filter((li) => li !== event.wid));
                  if (expandedEventLists.length === 1) setCopyMode(CopyMode.All);
                } else {
                  setExpandedEventLists((list) => [...list, event.wid]);
                  if (expandedEventLists.length === 0) setCopyMode(CopyMode.ExpandedOnly);
                }
              }}
            >
              {event.name}
              <EvaButton name={isExpanded ? 'chevron-up' : 'chevron-down'} />
            </h3>
            {isExpanded &&
              event.coms?.map((com) => {
                return <ComFace key={com.wid} com={com} importantOnClick={() => {}} />;
              })}
          </div>
        );
      })}
      <div className="flex flex-gap">
        <Dropdown
          items={[
            {
              id: CopyMode.All,
              title: 'Копировать всё',
            },
            {
              id: CopyMode.ExpandedOnly,
              title: 'Копировать открытые',
            },
            {
              id: CopyMode.WithoutExpanded,
              title: 'Копировать без открытых',
            },
          ]}
          id={copyMode}
          onSelect={({ id }) => setCopyMode(id)}
        />
        <div className="full-width flex center">
          <span className="flex flex-gap pointer" onClick={() => navigator.clipboard.writeText(prepareCopyText())}>
            Копировать
            <EvaIcon name="copy-outline" />
          </span>
        </div>
      </div>
    </>
  );
}
