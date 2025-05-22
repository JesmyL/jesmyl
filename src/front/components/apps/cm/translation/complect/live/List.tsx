import { RollControled } from '$cm/base/RolledContent';
import { useChordVisibleVariant } from '$cm/base/useChordVisibleVariant';
import { useCom } from '$cm/basis/lib/com-selections';
import { ComLine } from '$cm/col/com/line/ComLine';
import { ComOrders } from '$cm/col/com/orders/ComOrders';
import { useEffect, useMemo } from 'react';
import { makeRegExp } from 'regexpert';
import styled from 'styled-components';
import { CmSchWTranslationLiveDataValue } from './model';

const _lineNamePrefix = 'live-translation-line';

export const CmLiveTranslationList = (props: CmSchWTranslationLiveDataValue) => {
  const com = useCom(props.comw);
  const [chordVisibleVariant] = useChordVisibleVariant();
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
    <RollControled>
      <List
        className="flex"
        $querySelector={querySelector}
      >
        {com && (
          <ComOrders
            chordVisibleVariant={chordVisibleVariant}
            com={com}
            asLineComponent={props => {
              return (
                <div
                  className={_lineNamePrefix}
                  id={`${_lineNamePrefix}${lineVolumes.sum[props.ordi] + props.textLinei}`}
                >
                  <ComLine {...props} />
                </div>
              );
            }}
          />
        )}
      </List>
    </RollControled>
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
