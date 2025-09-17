import { indexTsjrpcClientMethods } from '$index/tsjrpc.methods';
import { atom, useAtomValue } from 'atomaric';
import { ReactNode, useEffect, useState } from 'react';
import { StameskaIconPack } from 'stameska-icon/utils';
import { Modal } from '../modal/Modal/Modal';
import { ModalBody } from '../modal/Modal/ModalBody';
import { ModalHeader } from '../modal/Modal/ModalHeader';
import { useToast } from '../modal/useToast';
import { TextInput } from '../TextInput';
import { LazyIcon } from '../the-icon/LazyIcon';
import { TheIconButton } from '../the-icon/TheIconButton';

const isOpenModalAtom = atom(false);
const pageSize = 54;
const offsetAtom = atom(0, 'icons:setOfListOffset');

export default function IconConfigurator(props: {
  icon: KnownStameskaIconName;
  header: ReactNode;
  used?: (KnownStameskaIconName | und)[];
  onSend: (icon: KnownStameskaIconName) => Promise<unknown>;
}) {
  const offset = useAtomValue(offsetAtom);
  const [loadingIcon, setLoadingIcon] = useState<KnownStameskaIconName | null>(null);
  const [iconPacks, setIconPacks] = useState<StameskaIconPack[]>([]);
  const usedSet = new Set(props.used);
  const toast = useToast();

  useEffect(() => {
    (async () => {
      const { packs } = await indexTsjrpcClientMethods.getIconExistsPacks({
        limit: pageSize,
        offset: offset < 0 ? offset - pageSize : offset,
      });
      setIconPacks(packs);
    })();
  }, [offset]);

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
        <ModalHeader className="flex gap-2">{props.header}</ModalHeader>
        <ModalBody>
          <div className="flex flex-wrap justify-between">
            {iconPacks.map(pack => {
              const icon = pack[0] as KnownStameskaIconName;

              return (
                <LazyIcon
                  key={icon}
                  icon={icon}
                  pack={pack}
                  className={'p-2 pointer ' + (props.icon === icon || usedSet.has(icon) ? ' text-x7' : '')}
                  withoutAnimation
                  onClick={async () => {
                    setLoadingIcon(icon);

                    try {
                      await props.onSend(icon);
                      isOpenModalAtom.set(false);
                    } catch (error) {
                      toast('' + error);
                    }
                    setLoadingIcon(null);
                  }}
                />
              );
            })}
          </div>
          <div className="mt-5 flex justify-between">
            <LazyIcon
              icon="ArrowLeft02"
              onClick={() => offsetAtom.do.increment(-pageSize)}
            />

            <TextInput
              value={`${Math.trunc(offset / iconPacks.length)}`}
              onChanged={value => offsetAtom.set(isNaN(+value) ? 0 : +value * pageSize)}
              className="w-[5em]! text-center"
            />

            <LazyIcon
              icon="ArrowRight02"
              onClick={() => offsetAtom.do.increment(pageSize)}
            />
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}
