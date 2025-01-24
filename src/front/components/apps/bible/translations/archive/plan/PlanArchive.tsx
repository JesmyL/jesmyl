import { mylib } from 'front/utils';
import { memo, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import {
  useBibleTranslationJoinAddressSetter,
  useGetterJoinedAddressMaxValues,
  useSetBibleAddressIndexes,
} from '../../../hooks/address/address';
import BibleTranslationArchive from '../Archive';
import { useBibleClearTranslationPlanSetter, useBibleTranslationPlan } from './hooks/plan';

export default memo(function BibleTranslationPlanArchive(): JSX.Element {
  const plan = useBibleTranslationPlan();
  const clearPlan = useBibleClearTranslationPlanSetter();
  const [selectedItemi, setSelectedItemi] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const setAddress = useSetBibleAddressIndexes();
  const setJoinAddress = useBibleTranslationJoinAddressSetter();
  const getJoinAddressMaxes = useGetterJoinedAddressMaxValues();

  useEffect(() => {
    if (inputRef.current === null) return;
    const inputNode = inputRef.current;

    return hookEffectLine()
      .addEventListener(window, 'keydown', event => {
        if (event.code === 'F1') {
          event.preventDefault();
          setSelectedItemi(0);
          inputNode.focus();
          return;
        }
      })
      .addEventListener(inputNode, 'keydown', event => {
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
            case 'Enter':
              event.stopPropagation();
              setSelectedItemi(null);
              inputNode.blur();
              const item = plan[selectedItemi];
              if (mylib.isArr(item)) {
                setAddress(...item);
                setJoinAddress(null);
              } else {
                setJoinAddress(item);
                setAddress(...getJoinAddressMaxes(item));
              }

              break;
            case 'Escape':
              event.stopPropagation();
              setSelectedItemi(null);
              inputNode.blur();
              break;
          }
        }
      })
      .addEventListener(inputNode, 'blur', () => setSelectedItemi(null))
      .effect();
  }, [getJoinAddressMaxes, plan, selectedItemi, setAddress, setJoinAddress]);

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
        <BibleTranslationArchive
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
