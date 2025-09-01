import { MyLib } from '#shared/lib/my-lib';
import { atom } from 'atomaric';
import { ReactNode, useState } from 'react';
import { StameskaIconName, stameskaIconPack } from 'stameska-icon';
import { Modal } from '../modal/Modal/Modal';
import { ModalBody } from '../modal/Modal/ModalBody';
import { ModalHeader } from '../modal/Modal/ModalHeader';
import { useToast } from '../modal/useToast';
import { LazyIcon } from '../the-icon/LazyIcon';
import { TheIconButton } from '../the-icon/TheIconButton';
import { TheButton } from '../TheButton';

const isOpenModalAtom = atom(false);

export default function IconConfigurator(props: {
  icon: StameskaIconName;
  header: ReactNode;
  used?: (StameskaIconName | und)[];
  onSend: (icon: StameskaIconName) => Promise<unknown>;
}) {
  const [limit, setLimit] = useState(36);
  const [loadingIcon, setLoadingIcon] = useState<StameskaIconName | null>(null);
  const usedSet = new Set(props.used);
  const toast = useToast();
  const iconNames = MyLib.keys(stameskaIconPack);
  const limitedIconNames = iconNames.slice(0, limit);

  return (
    <>
      <TheIconButton
        icon={props.icon ?? 'HelpSquare'}
        postfix="Изменить иконку"
        onClick={isOpenModalAtom.do.toggle}
        className="flex-max margin-gap-v"
        isLoading={loadingIcon != null}
      />

      <Modal openAtom={isOpenModalAtom}>
        <ModalHeader className="flex gap-2">{props.header}</ModalHeader>
        <ModalBody>
          <div className="flex flex-wrap justify-between">
            {limitedIconNames.map(icon => {
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
          {iconNames.length !== limitedIconNames.length && (
            <div className="flex justify-center">
              <TheButton onClick={() => setLimit(prev => prev + 36)}>Загрузить ещё</TheButton>
            </div>
          )}
        </ModalBody>
      </Modal>
    </>
  );
}
