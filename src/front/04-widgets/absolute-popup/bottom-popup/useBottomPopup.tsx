import { mylib } from 'front/utils';
import { ReactNode, useCallback, useState } from 'react';
import { BottomPopup } from './BottomPopup';
import { bottomPopupContentPreparer } from './item-preparer';
import { BottomPopupContenter } from './model';

type OpenCallback = () => void;
type OpenWithPropsCallback<Props> = (props: Props) => void;

export function useBottomPopup<Props>(
  contenter: BottomPopupContenter<Props>,
  topProps?: Props,
): [ReactNode, OpenCallback, OpenWithPropsCallback<Props>] {
  const [props, setProps] = useState<Props | und>();
  const [isOpen, setIsOpen] = useState(false);
  const [isWasOpen, setIsWasOpen] = useState(false);
  const close = useCallback(() => setIsOpen(false), []);
  const contentScalar = contenter(isOpen, close, bottomPopupContentPreparer, props === undefined ? topProps! : props);

  let throwContent = null;
  let content = null;
  let afterOpenNode = null;

  if (mylib.isArr(contentScalar)) {
    [throwContent, content, afterOpenNode] = contentScalar;
  } else content = contentScalar;

  return [
    <>
      {throwContent}
      {isWasOpen && afterOpenNode}
      {isOpen && <BottomPopup onClose={close}>{content}</BottomPopup>}
    </>,
    () => {
      setIsOpen(true);
      setIsWasOpen(true);
    },
    props => {
      setProps(props);
      setIsOpen(true);
      setIsWasOpen(true);
    },
  ];
}
