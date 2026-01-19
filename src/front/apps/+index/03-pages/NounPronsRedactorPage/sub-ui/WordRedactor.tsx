import { Button } from '#shared/components/ui/button';
import { ButtonGroup } from '#shared/components/ui/button-group';
import { useDebounceValue } from '#shared/lib/hooks/useDebounceValue';
import { makeToastKOMoodConfig } from '#shared/ui/modal';
import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { TextInput } from '#shared/ui/TextInput';
import { indexTsjrpcClientMethods } from '$index/shared/tsjrpc';
import { useQuery } from '@tanstack/react-query';
import { Atom, useAtomValue } from 'atomaric';
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import styled from 'styled-components';

export const IndexNounPronsRedactorWordRedactor = (props: {
  atom: Atom<string>;
  wordKey: 'noun' | 'pron';
  checkIsDisabled?: (term: string) => boolean;
}) => {
  const term = useAtomValue(props.atom);
  const debounceTerm = useDebounceValue(term, 700).trim();
  const levelRef = useRef(0);
  const isDisabled = term.trim().length < 3;

  const query = useQuery({
    queryKey: ['IndexNounPronsRedactorWordRedactor', props.wordKey, debounceTerm],
    queryFn: () => indexTsjrpcClientMethods.getNounPron({ [props.wordKey]: debounceTerm }),
    enabled: () => debounceTerm.length > 2,
    staleTime: 0,
  });

  const isQueryInProcess = query.isLoading || query.isFetching;

  return (
    <DropStyled>
      <div className="drops">
        <div className="flex justify-between gap-3">
          <TextInput
            selectOnFocus
            className="word-input w-[100%]"
            value={term}
            onInput={props.atom.set}
          />
          <Button
            icon="DiceFaces03"
            disabled={isDisabled}
            isLoading={isQueryInProcess}
            withoutAnimation
            onClick={() => query.refetch()}
          />
          <TheIconSendButton
            icon="Sent"
            disabled={
              isQueryInProcess ||
              isDisabled ||
              query.data?.[`${props.wordKey}s`]?.includes(term.toUpperCase()) ||
              props.checkIsDisabled?.(term)
            }
            confirm={
              <>
                Для отправки убедись в адекватности словосочетания
                <span className="text-x7"> {query.data?.result}</span>
                <div>
                  И выбери уровень сложности слова
                  <Buttons
                    initLevel={levelRef.current}
                    onLevelChange={level => (levelRef.current = level)}
                  />
                </div>
              </>
            }
            onSend={() => {
              if (!levelRef.current) {
                toast('Нужно выбрать уровень сложности', makeToastKOMoodConfig());
                return;
              }

              return indexTsjrpcClientMethods
                .writeNounPron({ [props.wordKey]: debounceTerm.trim(), level: levelRef.current })
                .then(() => {
                  query.refetch();
                  levelRef.current = 0;
                });
            }}
          />
        </div>
        <div className="text-x7 my-3 h-3">{query.data?.result}</div>
      </div>
      <div className="drops-list relative opacity-0 pointers-none">
        {!query.data?.[`${props.wordKey}s`]?.length || (
          <div className="absolute bg-x2 p-3 rounded-sm">
            {query.data?.[`${props.wordKey}s`]?.map(word => <div key={word}>{word}</div>)}
          </div>
        )}
      </div>
    </DropStyled>
  );
};

const Buttons = ({ onLevelChange, initLevel }: { onLevelChange: (level: number) => void; initLevel: number }) => {
  const [level, setLevel] = useState(initLevel);

  return (
    <ButtonGroup.Root>
      {[1, 2, 3, 4, 5].map(l => {
        return (
          <Button
            key={l}
            variant={l === level ? 'destructive' : undefined}
            onClick={() => {
              setLevel(l);
              onLevelChange(l);
            }}
          >
            {l}
          </Button>
        );
      })}
    </ButtonGroup.Root>
  );
};

const DropStyled = styled.div`
  .drops:has(.word-input:focus) + .drops-list {
    opacity: 1;
  }
`;
