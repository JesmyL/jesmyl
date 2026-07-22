import { addEventListenerPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { BibleBroadcastArchive } from '$bible/entities/broadcast-archive';
import { bibleAddressIndexesUpdate, takeJoinedAddressMaxValues } from '$bible/shared/hooks';
import { bibleJoinAddressAtom } from '$bible/shared/state/atoms';
import { bibleIDB } from '$bible/shared/state/bibleIDB';
import styled from '@emotion/styled';
import { JSX, memo, useEffect, useRef, useState } from 'react';
import { checkIsArray } from 'shared/utils/checkIs';
import { bibleBroadcastPlanClear } from '../lib/plan';

export const BibleBroadcastPlanArchive = memo(function BibleBroadcastPlanArchive(): JSX.Element {
  const plan = bibleIDB.useValue.broadcastPlan();
  const [selectedItemi, setSelectedItemi] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
                if (checkIsArray(item)) {
                  bibleAddressIndexesUpdate(...item);
                  bibleJoinAddressAtom.set(null);
                } else {
                  bibleJoinAddressAtom.set(item);
                  bibleAddressIndexesUpdate(...takeJoinedAddressMaxValues(item));
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
  }, [plan, selectedItemi]);

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
          onRemove={bibleBroadcastPlanClear}
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
