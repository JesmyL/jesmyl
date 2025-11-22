import { useIndexValuesQuery } from '#basis/api/useIndexValuesQuery';
import { Button } from '#shared/components/ui/button';
import { useDebounceValue } from '#shared/lib/hooks/useDebounceValue';
import { indexTsjrpcClientMethods } from '$index/shared/tsjrpc';
import { useQuery } from '@tanstack/react-query';
import { atom, useAtomValue } from 'atomaric';
import { ReactNode } from 'react';
import { itIt } from 'shared/utils';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';
import { makeToastKOMoodConfig, Modal, ModalBody, ModalHeader } from '../modal';
import { TextInput } from '../TextInput';
import { TheIconLoading } from '../the-icon/IconLoading';
import { LazyIcon } from '../the-icon/LazyIcon';

const isOpenModalAtom = atom(false);
const iconOnLoadAtom = atom<KnownStameskaIconName | null>(null);
const pageSize = 54;
const pageAtom = atom(0, 'icons:setOfListPage');
const searchTermAtom = atom('', 'icons:setOfListSearchTerm');

interface Props {
  icon: KnownStameskaIconName;
  iconNode?: React.ReactNode;
  header: ReactNode;
  used?: (KnownStameskaIconName | und)[];
  onSend: (icon: KnownStameskaIconName) => Promise<unknown>;
  className?: string;
}

export default function IconConfigurator(props: Props) {
  const loadingIcon = useAtomValue(iconOnLoadAtom);

  return (
    <>
      <div className={props.className}>
        <Button
          onClick={isOpenModalAtom.do.toggle}
          isLoading={loadingIcon != null}
        >
          {props.iconNode ?? <LazyIcon icon={props.icon ?? 'HelpSquare'} />}
          Изменить иконку
        </Button>
      </div>

      <Modal openAtom={isOpenModalAtom}>
        <ModalInner {...props} />
      </Modal>
    </>
  );
}

const ModalInner = (props: Props) => {
  const page = useAtomValue(pageAtom);
  const searchTerm = useAtomValue(searchTermAtom);

  const usedSet = new Set(props.used);
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
                  iconOnLoadAtom.set(icon);

                  try {
                    await props.onSend(icon);
                  } catch (error) {
                    toast('' + error, makeToastKOMoodConfig());
                  }
                  iconOnLoadAtom.set(null);
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
    </>
  );
};
