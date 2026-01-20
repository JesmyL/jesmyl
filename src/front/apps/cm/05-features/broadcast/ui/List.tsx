import { RolledContent } from '#shared/ui/fullscreen-content/RolledContent';
import { useCmCom } from '$cm/entities/com';
import { CmComOrderList } from '$cm/entities/com-order';
import { CmComOrderLine } from '$cm/entities/com-order-line';
import { cmComChordVisibleVariantAtom, cmComSpeedRollKfAtom } from '$cm/entities/index';
import { useAtomValue } from 'atomaric';
import { useEffect, useMemo } from 'react';
import { makeRegExp } from 'regexpert';
import styled from 'styled-components';
import { CmBroadcastSchWgtLiveDataValue } from '../model/model';

const _lineNamePrefix = 'live-broadcast-line-';

export const CmBroadcastLiveList = (props: CmBroadcastSchWgtLiveDataValue) => {
  const com = useCmCom(props.comw);
  const chordVisibleVariant = useAtomValue(cmComChordVisibleVariantAtom);
  const lineSum = useMemo(() => {
    let lastSum = 0;
    const sum = [lastSum];

    com?.orders?.forEach(order => {
      const count = order.text.split(makeRegExp('/\\n/')).length;
      sum.push((lastSum += count));
    });

    return sum;
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
            asHeaderComponent={props => {
              if (props.ord.isRealText()) return props.headerNode;

              return <div id={`${_lineNamePrefix}${lineSum[props.ordi]}`}>{props.headerNode}</div>;
            }}
            asLineComponent={props => {
              return (
                <div id={`${_lineNamePrefix}${lineSum[props.ordi] + props.textLinei}`}>
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
