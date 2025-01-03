import { mylib } from 'front/utils';
import { useMemo, useState } from 'react';
import DebouncedSearchInput from '../../../../../complect/DebouncedSearchInput';
import { useBottomPopup } from '../../../../../complect/absolute-popup/bottom-popup/useBottomPopup';
import EvaSendButton from '../../../../../complect/sends/eva-send-button/EvaSendButton';
import { IconMinusSignSquareStrokeRounded } from '../../../../../complect/the-icon/icons/minus-sign-square';
import { IconPlusSignCircleStrokeRounded } from '../../../../../complect/the-icon/icons/plus-sign-circle';
import useIsRedactArea from '../../../../../complect/useIsRedactArea';
import { useLeaderHumanListSortVariant } from '../../molecules';
import PhaseLeaderContainer from '../../phase-container/PhaseLeaderContainer';
import useLeaderContext from '../contexts/useContexts';
import HumanFace from './HumanFace';
import { HumansMoreContenter } from './HumansMore';
import { HumanImportable, HumanListComponentProps } from './People.model';

export default function HumanList({
  isAsPage,
  onMoreClick,
  fieldLabel,
  searcherClass,
  placeholder,
  asHumanMore,
  list,
  humansRef,
  excludedHumans,
  excludedLabel,
  humanMoreAdditions,
  onAddHuman,
  onRemoveHuman,
  className,
}: HumanListComponentProps) {
  const { humans } = useLeaderContext();
  const [term, setTerm] = useState('');
  const [humansMoreNode, openHumansMore] = useBottomPopup(HumansMoreContenter, {
    fieldLabel,
  });
  const [humanListSortVariant] = useLeaderHumanListSortVariant();
  const { editIcon, isRedact } = useIsRedactArea(true, null, true, true);

  const humanList = useMemo(() => {
    const memoHumans =
      (isRedact
        ? humans
        : (list?.map(wid => humans?.find(human => human.w === wid)).filter(human => human) as HumanImportable[])) ??
      humans ??
      [];
    const filteredHumans = [
      ...(term ? mylib.searchRate(memoHumans, term, ['name']).map(({ item: human }) => human) : memoHumans),
    ];

    if (!term) {
      if (humanListSortVariant === 'name') filteredHumans.sort(({ w: a }, { w: b }) => (a < b ? -1 : a > b ? 1 : 0));
      else filteredHumans.sort(({ ufp1: a1, ufp2: a2 }, { ufp1: b1, ufp2: b2 }) => a1 + a2 - (b1 + b2));
    }

    return filteredHumans;
  }, [isRedact, humans, list, term, humanListSortVariant]);

  if (humansRef) humansRef.current = humanList;

  const searcher = (
    <DebouncedSearchInput
      placeholder={placeholder ?? 'Поиск по личностям'}
      className={`debounced-searcher round-styled ${searcherClass || ''}`}
      initialTerm={term}
      debounce={500}
      onTermChange={term => setTerm(term.toLowerCase())}
    />
  );

  const humansNode = (
    term || !excludedHumans ? humanList : humanList?.filter(human => !excludedHumans.includes(human.w))
  )?.map((human, humani) => {
    return (
      <div key={humani}>
        <HumanFace
          human={human}
          asMore={
            isRedact
              ? () => {
                  return excludedHumans?.includes(human.w) ? (
                    <span className="color--3">{excludedLabel}</span>
                  ) : list?.some(humanw => humanw === human.w) ? (
                    <EvaSendButton
                      Icon={IconMinusSignSquareStrokeRounded}
                      className="color--ko"
                      onSend={onRemoveHuman && (() => onRemoveHuman(human))}
                    />
                  ) : (
                    <EvaSendButton
                      Icon={IconPlusSignCircleStrokeRounded}
                      className="color--7"
                      onSend={onAddHuman && (() => onAddHuman(human))}
                    />
                  );
                }
              : asHumanMore
          }
          humanMoreAdditions={humanMoreAdditions}
        />
      </div>
    );
  });

  return isAsPage ? (
    <PhaseLeaderContainer
      className="template-page-content"
      headClass="flex between full-width"
      onMoreClick={onMoreClick || openHumansMore}
      head={searcher}
      content={
        <>
          {humansMoreNode}
          <div>{editIcon}</div>
          {humansNode}
        </>
      }
    />
  ) : (
    <div className={className}>
      {searcher}
      {humansNode}
    </div>
  );
}
