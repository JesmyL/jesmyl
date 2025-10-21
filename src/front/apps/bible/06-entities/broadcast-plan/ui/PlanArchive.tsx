import { addEventListenerPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { mylib } from '#shared/lib/my-lib';
import { useGetterJoinedAddressMaxValues, useSetBibleAddressIndexes } from '$bible/shared/hooks';
import { bibleJoinAddressAtom } from '$bible/shared/state/atoms';
import { JSX, memo, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { BibleBroadcastArchive } from '../../broadcast-archive/ui/Archive';
import { useBibleBroadcastPlan, useBibleBroadcastPlanClearSetter } from '../lib/plan';

export const BibleBroadcastPlanArchive = memo(function BibleBroadcastPlanArchive(): JSX.Element {
  const plan = useBibleBroadcastPlan();
  const clearPlan = useBibleBroadcastPlanClearSetter();
  const [selectedItemi, setSelectedItemi] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const setAddress = useSetBibleAddressIndexes();
  const getJoinAddressMaxes = useGetterJoinedAddressMaxValues();

  useEffect(() => {
    if (inputRef.current === null) return;
    const inputNode = inputRef.current;

    return hookEffectPipe()
      .pipe(
        addEventListenerPipe(window, 'keydown', event => {
          if (event.code === 'F1') {
            event.preventDefault();
            setSelectedItemi(0);
            inputNode.focus();
            return;
          }
        }),
        addEventListenerPipe(inputNode, 'keydown', event => {
          if (selectedItemi !== null) {
            switch (event.code) {
              case 'ArrowDown':
                event.preventDefault();
                event.stopPropagation();
                if (selectedItemi + 1 < plan.length) setSelectedItemi(selectedItemi + 1);
                break;
              case 'ArrowUp':
                event.preventDefault();
                event.stopPropagation();
                if (selectedItemi > 0) setSelectedItemi(selectedItemi - 1);
                break;
              case 'Enter': {
                event.stopPropagation();
                setSelectedItemi(null);
                inputNode.blur();
                const item = plan[selectedItemi];
                if (mylib.isArr(item)) {
                  setAddress(...item);
                  bibleJoinAddressAtom.set(null);
                } else {
                  bibleJoinAddressAtom.set(item);
                  setAddress(...getJoinAddressMaxes(item));
                }

                break;
              }
              case 'Escape':
                event.stopPropagation();
                setSelectedItemi(null);
                inputNode.blur();
                break;
            }
          }
        }),
        addEventListenerPipe(inputNode, 'blur', () => setSelectedItemi(null)),
      )
      .effect();
  }, [getJoinAddressMaxes, plan, selectedItemi, setAddress]);

  useEffect(() => {
    if (selectedItemi === null) return;

    const node = document.querySelector('[grid-plan] #archive-itemi-' + selectedItemi);
    if (node === null) return;

    node.classList.add('current');
    return () => node.classList.remove('current');
  }, [selectedItemi]);

  return (
    <>
      <Plan>
        <HiddenInput ref={inputRef} />
        <BibleBroadcastArchive
          title="План"
          list={plan}
          onRemove={clearPlan}
        />
      </Plan>
    </>
  );
});

const Plan = styled.div`
  .current {
    background-color: var(--color--2);
  }
`;

const HiddenInput = styled.input`
  position: absolute;
  opacity: 0;
  height: 0;
  width: 0;
`;
