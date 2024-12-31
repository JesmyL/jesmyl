import { ReactNode, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAtom } from '../../../../../complect/atoms';
import BrutalItem from '../../../../../complect/brutal-item/BrutalItem';
import IconButton from '../../../../../complect/the-icon/IconButton';
import { IconCalendar01SolidSharp } from '../../../../../complect/the-icon/icons/calendar-01';
import { IconCalendar02StrokeRounded } from '../../../../../complect/the-icon/icons/calendar-02';
import { IconFolder01StrokeRounded } from '../../../../../complect/the-icon/icons/folder-01';
import { IconStarSolidRounded, IconStarStrokeRounded } from '../../../../../complect/the-icon/icons/star';
import { useActualRef } from '../../../../../complect/useActualRef';
import { cmEventContextAtom, cmMolecule } from '../../molecules';
import { Meetings } from './Meetings';
import { MeetingsEvent } from './MeetingsEvent';

const favoriteMeetingsAtom = cmMolecule.select(s => s.favoriteMeetings);

export default function MeetingsInner<Meets extends Meetings>({
  meetings,
  onEventClick,
  asEventBox,
  onContextNavigate,
}: {
  meetings: Meets;
  onEventClick?: (event: NonUndefined<Meets['event']>) => void;
  onContextNavigate?: (context: number[]) => void;
  asEventBox?: (event: MeetingsEvent) => ReactNode;
}) {
  const [eventContext, setEventContext] = useAtom(cmEventContextAtom);
  const [favorites, setFavorites] = useAtom(favoriteMeetingsAtom);
  const setCurrContextRef = useActualRef((eventContext: number[]) => setEventContext(eventContext));
  const onContextNavigateRef = useActualRef(onContextNavigate);
  const eventContextRef = useActualRef(eventContext);

  useEffect(() => {
    onContextNavigateRef.current?.(eventContextRef.current);
  }, [eventContextRef, onContextNavigateRef, setCurrContextRef]);

  if (!meetings) return null;

  const [contexts, currContextw] = meetings.getContexts(eventContextRef.current);
  const names = eventContextRef.current.map((context, contexti) => (
    <span
      key={contexti}
      onClick={() => setCurrContextRef.current([...eventContextRef.current].slice(0, contexti + 1))}
    >
      {contexti ? ' - ' : ''}
      {meetings.names[context]}
    </span>
  ));

  return (
    <>
      <div className="margin-gap-v pointer">
        <span onClick={() => setCurrContextRef.current([])}>Контекст: </span>
        {names.length ? names : 'Все'}
      </div>
      {eventContextRef.current.length ? null : (
        <>
          {favorites.contexts.map((contextw, contextwi) => {
            const context = meetings.contexts[contextw];
            if (!context) return null;

            return (
              <div
                key={contextwi}
                className="relative"
              >
                <BrutalItem
                  icon={<IconFolder01StrokeRounded />}
                  title={meetings.names[context.context[context.context.length - 1]]}
                  onClick={() => setCurrContextRef.current(context.context)}
                  box={<IconStarSolidRounded className="fade-05" />}
                />
                <div className="absolute flex center full-width pos-bottom fade-05 pointers-none">
                  {context.context
                    ?.slice(0, -1)
                    .map(context => meetings.names[context])
                    .join(' - ')}
                </div>
              </div>
            );
          })}
          {favorites.events.map((eventw, eventwi) => {
            const event = meetings.events?.find(event => event.wid === eventw);
            if (!event) return null;
            const { context } = meetings.contexts[event.contextw] || {};
            const node = (
              <BrutalItem
                key={eventwi}
                icon={<IconCalendar01SolidSharp />}
                title={event.name}
                onClick={onEventClick && (() => onEventClick(event as never))}
                box={asEventBox ? asEventBox(event) : <IconStarSolidRounded className="fade-05" />}
                description={
                  <span
                    onClick={event => {
                      event.stopPropagation();
                      event.preventDefault();
                      setCurrContextRef.current(context);
                    }}
                  >
                    {context?.map(context => meetings.names[context]).join(' - ')}
                  </span>
                }
              />
            );

            return onEventClick ? (
              node
            ) : (
              <Link
                key={eventwi}
                to={`${event.wid}`}
              >
                {node}
              </Link>
            );
          })}
        </>
      )}
      {contexts.map(([contexti, contextn, contextw], groupi) => {
        const isFavorite = favorites.contexts.indexOf(contextw) > -1;

        return (
          <BrutalItem
            key={groupi}
            icon={<IconFolder01StrokeRounded />}
            title={contextn}
            onClick={() => setCurrContextRef.current([...eventContextRef.current, contexti])}
            box={
              eventContextRef.current.length ? (
                <IconButton
                  Icon={isFavorite ? IconStarSolidRounded : IconStarStrokeRounded}
                  onClick={e => {
                    e.stopPropagation();

                    setFavorites({
                      ...favorites,
                      contexts: isFavorite
                        ? favorites.contexts.filter(context => context !== contextw)
                        : [...favorites.contexts, contextw],
                    });
                  }}
                />
              ) : null
            }
          />
        );
      })}
      {meetings.events?.map((event, eventi) => {
        if (event.contextw && event.contextw !== currContextw) return null;
        const isFavorite = favorites.events.indexOf(event.wid) > -1;

        return (node =>
          onEventClick ? (
            node
          ) : (
            <Link
              key={eventi}
              to={`${event.wid}`}
            >
              {node}
            </Link>
          ))(
          <BrutalItem
            key={eventi}
            icon={<IconCalendar02StrokeRounded />}
            title={event.name}
            onClick={onEventClick && (() => onEventClick(event as never))}
            box={
              asEventBox ? (
                asEventBox(event)
              ) : eventContextRef.current.length ? (
                <IconButton
                  Icon={isFavorite ? IconStarSolidRounded : IconStarStrokeRounded}
                  onClick={e => {
                    e.stopPropagation();
                    e.preventDefault();

                    setFavorites({
                      ...favorites,
                      events: isFavorite
                        ? favorites.events.filter(eventw => eventw !== event.wid)
                        : [...favorites.events, event.wid],
                    });
                  }}
                />
              ) : null
            }
          />,
        );
      })}
    </>
  );
}
