import { useIndexValuesQuery } from '#basis/api/useIndexValuesQuery';
import { Button } from '#shared/components/ui/button';
import { useDebounceValue } from '#shared/lib/hooks/useDebounceValue';
import { indexTsjrpcClientMethods } from '$index/tsjrpc.methods';
import { useQuery } from '@tanstack/react-query';
import { atom, useAtomValue } from 'atomaric';
import { ReactNode, useState } from 'react';
import { itIt } from 'shared/utils';
import { twMerge } from 'tailwind-merge';
import { Modal } from '../modal/Modal/Modal';
import { ModalBody } from '../modal/Modal/ModalBody';
import { ModalHeader } from '../modal/Modal/ModalHeader';
import { useToast } from '../modal/useToast';
import { TextInput } from '../TextInput';
import { TheIconLoading } from '../the-icon/IconLoading';
import { LazyIcon } from '../the-icon/LazyIcon';
import { TheIconButton } from '../the-icon/TheIconButton';

const isOpenModalAtom = atom(false);
const pageSize = 54;
const pageAtom = atom(0, 'icons:setOfListPage');
const searchTermAtom = atom('', 'icons:setOfListSearchTerm');

export default function IconConfigurator(props: {
  icon: KnownStameskaIconName;
  header: ReactNode;
  used?: (KnownStameskaIconName | und)[];
  onSend: (icon: KnownStameskaIconName) => Promise<unknown>;
}) {
  const page = useAtomValue(pageAtom);
  const searchTerm = useAtomValue(searchTermAtom);

  const [loadingIcon, setLoadingIcon] = useState<KnownStameskaIconName | null>(null);
  const usedSet = new Set(props.used);
  const toast = useToast();
  const searchTermDebounce = useDebounceValue(searchTerm, 1000);
  const { data: { iconSearchLink } = {}, isLoading: isIconSearchLinkLoading } = useIndexValuesQuery();

  const { data: { packs: iconPacks = [] } = {}, isPending } = useQuery({
    queryKey: ['IconConfigurator-iconsPage', page, searchTermDebounce],
    placeholderData: itIt,
    queryFn: () =>
      indexTsjrpcClientMethods.getIconExistsPacks({
        pageSize,
        searchTerm: searchTermDebounce,
        page: page < 0 ? page - 1 : page,
      }),
  });

  return (
    <>
      <TheIconButton
        icon={props.icon ?? 'HelpSquare'}
        postfix="Изменить иконку"
        onClick={isOpenModalAtom.do.toggle}
        className="flex-max my-2"
        isLoading={loadingIcon != null}
      />

      <Modal openAtom={isOpenModalAtom}>
        <ModalHeader className="flex gap-2 justify-between">{props.header}</ModalHeader>
        <ModalBody>
          <div className="flex gap-2 mb-5">
            <TextInput
              value={searchTerm}
              className="w-full"
              onFocus={event => event.currentTarget.select()}
              onInput={value => {
                searchTermAtom.set(value);
                pageAtom.reset();
              }}
            />
            {isIconSearchLinkLoading ? (
              <TheIconLoading />
            ) : (
              <a
                href={iconSearchLink}
                target="_blank"
              >
                <Button size="icon">
                  <LazyIcon icon="LinkSquare02" />
                </Button>
              </a>
            )}
          </div>
          <div className="flex flex-wrap justify-between">
            {iconPacks.map(pack => {
              const icon = pack[0] as KnownStameskaIconName;

              return (
                <LazyIcon
                  key={icon}
                  icon={icon}
                  pack={pack}
                  className={twMerge('p-2 pointer', (props.icon === icon || usedSet.has(icon)) && 'text-x7')}
                  withoutAnimation
                  onClick={async () => {
                    isOpenModalAtom.set(false);
                    setLoadingIcon(icon);

                    try {
                      await props.onSend(icon);
                    } catch (error) {
                      toast('' + error);
                    }
                    setLoadingIcon(null);
                  }}
                />
              );
            })}
          </div>
          <div className="mt-5 flex justify-between @container">
            <Button
              size="icon"
              onClick={() => pageAtom.do.increment(-1)}
            >
              <TheIconLoading
                icon="ArrowLeft02"
                isLoading={isPending}
              />
            </Button>

            <span className="flex gap-2">
              <TextInput
                value={page}
                onInput={value => pageAtom.set(isNaN(+value) ? 0 : +value)}
                className="w-[5em]! text-center"
              />
            </span>

            <Button
              size="icon"
              onClick={() => pageAtom.do.increment(1)}
            >
              <TheIconLoading
                icon="ArrowRight02"
                isLoading={isPending}
              />
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}
