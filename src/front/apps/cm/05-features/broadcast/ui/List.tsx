import { RolledContent } from '#shared/ui/fullscreen-content/RolledContent';
import { useCmCom, useCmComChordVisibleVariant } from '$cm/entities/com';
import { CmComOrderList } from '$cm/entities/com-order';
import { CmComOrderLine } from '$cm/entities/com-order-line';
import { cmComSpeedRollKfAtom } from '$cm/entities/index';
import { useEffect, useMemo } from 'react';
import { makeRegExp } from 'regexpert';
import styled from 'styled-components';
import { CmBroadcastSchWgtLiveDataValue } from '../model/model';

const _lineNamePrefix = 'live-broadcast-line';

export const CmBroadcastLiveList = (props: CmBroadcastSchWgtLiveDataValue) => {
  const com = useCmCom(props.comw);
  const [chordVisibleVariant] = useCmComChordVisibleVariant();
  const lineVolumes = useMemo(() => {
    const sum: number[] = [0];
    const counts = [] as number[];
    let lastSum = 0;

    com?.orders?.forEach(unit => {
      if (unit.texti === null || !unit.isVisible) {
        sum.push(lastSum);
        return;
      }
      const count = unit.text.split(makeRegExp('/\\n/')).length;
      counts.push(count);
      sum.push((lastSum += count));
    });

    return { sum, counts };
  }, [com]);

  const querySelector = useMemo(() => {
    const queries = [];
    for (let linei = props.fromLinei; linei < props.toLinei; linei++) {
      queries.push(`#${_lineNamePrefix}${linei}`);
    }
    return queries.join(', ');
  }, [props.fromLinei, props.toLinei]);

  useEffect(() => {
    try {
      document.querySelector(querySelector)?.scrollIntoView({ block: 'center', behavior: 'smooth' });
    } catch (_error) {
      //
    }
  }, [querySelector]);

  return (
    <RolledContent speedKfAtom={cmComSpeedRollKfAtom}>
      <List
        className="flex"
        $querySelector={querySelector}
      >
        {com && (
          <CmComOrderList
            chordVisibleVariant={chordVisibleVariant}
            com={com}
            asLineComponent={props => {
              return (
                <div
                  className={_lineNamePrefix}
                  id={`${_lineNamePrefix}${lineVolumes.sum[props.ordi] + props.textLinei}`}
                >
                  <CmComOrderLine {...props} />
                </div>
              );
            }}
          />
        )}
      </List>
    </RolledContent>
  );
};

const List = styled.div<{ $querySelector: string }>`
  .com-ord-list {
    margin: auto;
    max-width: 100vw;
    padding-right: var(--main-gap);
    white-space: normal;
  }

  ${props => props.$querySelector} {
    background-color: var(--color--2);
  }

  .${_lineNamePrefix} {
    transition: background-color 0.3s;
  }
`;
