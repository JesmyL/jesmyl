import { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { makeRegExp } from '../../../../../../../back/complect/makeRegExp';
import RollControled from '../../../base/RolledContent';
import { useChordVisibleVariant } from '../../../base/useChordVisibleVariant';
import { Com } from '../../../col/com/Com';
import ComLine from '../../../col/com/line/ComLine';
import ComOrders from '../../../col/com/orders/ComOrders';
import { CmSchWTranslationLiveDataValue } from './model';

interface Props extends CmSchWTranslationLiveDataValue {
  com?: Com;
}

const _lineNamePrefix = 'live-translation-line';

export const CmLiveTranslationList = (props: Props) => {
  const [chordVisibleVariant] = useChordVisibleVariant();
  const lineVolumes = useMemo(() => {
    const sum: number[] = [0];
    const counts = [] as number[];
    let lastSum = 0;

    props.com?.orders?.forEach(unit => {
      if (unit.texti === null || !unit.isVisible) {
        sum.push(lastSum);
        return;
      }
      const count = unit.text.split(makeRegExp('/\\n/')).length;
      counts.push(count);
      sum.push((lastSum += count));
    });

    return { sum, counts };
  }, [props.com]);

  const queries = [];
  for (let linei = props.fromLinei; linei < props.toLinei; linei++) {
    queries.push(`#${_lineNamePrefix}${linei}`);
  }
  const querySelector = queries.join(', ');

  useEffect(() => {
    try {
      document.querySelector(querySelector)?.scrollIntoView({ block: 'center' });
    } catch (error) {}
  }, [querySelector]);

  return (
    <RollControled>
      <List
        className="flex"
        $querySelector={querySelector}
      >
        {props.com && (
          <ComOrders
            chordVisibleVariant={chordVisibleVariant}
            com={props.com}
            asLineComponent={props => {
              return (
                <div
                  className={_lineNamePrefix}
                  id={`${_lineNamePrefix}${lineVolumes.sum[props.orderUniti] + props.textLinei}`}
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
