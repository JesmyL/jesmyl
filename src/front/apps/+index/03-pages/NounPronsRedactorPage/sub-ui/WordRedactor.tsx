import { Button } from '#shared/components/ui/button';
import { useDebounceValue } from '#shared/lib/hooks/useDebounceValue';
import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { TextInput } from '#shared/ui/TextInput';
import { indexTsjrpcClientMethods } from '$index/shared/tsjrpc';
import { useQuery } from '@tanstack/react-query';
import { Atom, useAtomValue } from 'atomaric';
import { itIt } from 'shared/utils';
import styled from 'styled-components';

export const IndexNounPronsRedactorWordRedactor = (props: {
  atom: Atom<string>;
  wirdKey: 'noun' | 'pron';
  checkIsDisabled?: (term: string) => boolean;
}) => {
  const term = useAtomValue(props.atom);
  const debounceTerm = useDebounceValue(term);

  const query = useQuery({
    queryKey: ['IndexNounPronsRedactorWordRedactor', props.wirdKey, debounceTerm],
    queryFn: () => indexTsjrpcClientMethods.getNounPron({ [props.wirdKey]: debounceTerm }),
    enabled: () => term.length > 2,
    placeholderData: itIt,
  });

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
            disabled={term.length < 3}
            onClick={() => query.refetch()}
          />
          <TheIconSendButton
            icon="Sent"
            disabled={query.data?.[`${props.wirdKey}s`]?.includes(term) || props.checkIsDisabled?.(term)}
            confirm={
              <>
                Для отправки убедись в адекватности словосочетания
                <span className="text-x7"> {query.data?.result}</span>
              </>
            }
            onSend={() => indexTsjrpcClientMethods.writeNounPron({ [props.wirdKey]: term }).then(() => query.refetch())}
          />
        </div>
        <div className="text-x7 my-3">{query.data?.result}</div>
      </div>
      <div className="drops-list relative">
        {!query.data?.[`${props.wirdKey}s`]?.length || (
          <div className="absolute bg-x2 p-3 rounded-sm">
            {query.data?.[`${props.wirdKey}s`]?.map(word => <div key={word}>{word}</div>)}
          </div>
        )}
      </div>
    </DropStyled>
  );
};

const DropStyled = styled.div`
  .drops-list {
    opacity: 0;
  }

  .drops:has(.word-input:focus) + .drops-list {
    opacity: 1;
  }
`;
