import { MyLib } from '#shared/lib/my-lib';
import { atom } from 'atomaric';
import { ReactNode, useState } from 'react';
import { Modal } from '../modal/Modal/Modal';
import { ModalBody } from '../modal/Modal/ModalBody';
import { ModalHeader } from '../modal/Modal/ModalHeader';
import { useToast } from '../modal/useToast';
import { LazyIcon } from '../the-icon/LazyIcon';
import { theIconKnownPack } from '../the-icon/pack';
import { TheIconButton } from '../the-icon/TheIconButton';
import { TheButton } from '../TheButton';

const isOpenModalAtom = atom(false);

export default function IconConfigurator(props: {
  icon: TheIconKnownName;
  header: ReactNode;
  used?: (TheIconKnownName | und)[];
  onSend: (icon: TheIconKnownName) => Promise<unknown>;
}) {
  const [limit, setLimit] = useState(36);
  const [loadingIcon, setLoadingIcon] = useState<TheIconKnownName | null>(null);
  const usedSet = new Set(props.used);
  const toast = useToast();

  return (
    <>
      <TheIconButton
        icon={props.icon ?? 'HelpSquare'}
        postfix="Изменить иконку"
        onClick={isOpenModalAtom.toggle}
        className="flex-max margin-gap-v"
        isLoading={loadingIcon != null}
      />

      <Modal openAtom={isOpenModalAtom}>
        <ModalHeader className="flex gap-2">{props.header}</ModalHeader>
        <ModalBody>
          <div className="flex flex-wrap">
            {MyLib.keys(theIconKnownPack)
              .slice(0, limit)
              .map(icon => {
                return (
                  <LazyIcon
                    key={icon}
                    icon={icon}
                    className={'p-2 pointer ' + (props.icon === icon || usedSet.has(icon) ? ' text-x7' : '')}
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
                    withoutAnimation
                  />
                );
              })}
          </div>
          <div className="flex justify-center">
            <TheButton onClick={() => setLimit(prev => prev + 36)}>Загрузить ещё</TheButton>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}
