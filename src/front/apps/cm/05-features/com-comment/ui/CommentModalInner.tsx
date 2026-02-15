import { Button } from '#shared/components/ui/button';
import { ModalBody, ModalFooter, ModalHeader } from '#shared/ui/modal';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { WithAtomValue } from '#shared/ui/WithAtomValue';
import {
  cmComCommentCurrentOpenedAltKeyAtom,
  cmComCommentRedactOrdSelectorIdAtom,
  cmComCommentRegisteredAltKeysAtom,
} from '$cm/entities/com-comment';
import { CmComOrder } from '$cm/entities/com-order';
import { CmComCommentAlternativeSelector } from '$cm/entities/ComCommentAlternativeSelector';
import { CmComCommentSavedLocalMarker } from '$cm/entities/ComCommentSavedLocalMarker';
import { CmCom } from '$cm/ext';
import { cmIsShowMyCommentsAtom } from '$cm/shared/state';
import { Atom, atom, useAtomValue } from 'atomaric';
import { CmComCommentBlockSpecialSelector } from 'shared/api';
import { CmComCommentKindComments } from './KindComments';
import { CmComCommentSimpleComments } from './SimpleComments';

let isKindCommentsAtom: Atom<boolean>;

export const CmComCommentModalInner = ({ com }: { com: CmCom }) => {
  isKindCommentsAtom ??= atom(true);

  const ordSelectorId = useAtomValue(cmComCommentRedactOrdSelectorIdAtom);
  const altCommentKeys = useAtomValue(cmComCommentCurrentOpenedAltKeyAtom);
  const altCommentKey = altCommentKeys[com.wid] ?? altCommentKeys.last;
  const isKindComments = useAtomValue(isKindCommentsAtom);

  if (ordSelectorId === null) return;
  const isHeadComment = ordSelectorId === CmComCommentBlockSpecialSelector.Head;

  cmComCommentRegisteredAltKeysAtom.do.init();

  let ord: CmComOrder | und;
  let ordNN = 0;

  if (ordSelectorId !== CmComCommentBlockSpecialSelector.Head) {
    const { ord: ordBySelector, visibleOrdi } = com.getOrderBySelector(ordSelectorId);

    ord = ordBySelector;
    ordNN = visibleOrdi + 1;
  }

  return (
    <>
      <ModalHeader className="flex gap-2 justify-between @container">
        <span className="flex gap-2 w-[calc(100cqw-44px*2)]">
          <LazyIcon icon="TextAlignLeft" />
          <span className="text-x7 nowrap">
            {isKindComments || !ordNN || <>#{ordNN} </>}
            {ord?.me.header()}
          </span>
          <span className="text-x3 ellipsis">{com.name}</span>
        </span>

        <div className="flex gap-2">
          {isKindComments ? (
            <Button
              icon="TextFirstlineRight"
              iconKind="BulkRounded"
              className="text-x7"
              onClick={isKindCommentsAtom.do.toggle}
            />
          ) : (
            <Button
              icon="TextFirstlineRight"
              onClick={isKindCommentsAtom.do.toggle}
            />
          )}

          {isHeadComment || (
            <Button
              icon="TextFont"
              onClick={() => cmComCommentRedactOrdSelectorIdAtom.set(CmComCommentBlockSpecialSelector.Head)}
            />
          )}
        </div>
      </ModalHeader>

      <WithAtomValue atom={cmIsShowMyCommentsAtom}>
        {isShowComments =>
          !isShowComments ? (
            <ModalBody className="text-xKO">Комментарии скрыты</ModalBody>
          ) : (
            <>
              <ModalBody>
                {isKindComments ? (
                  <CmComCommentKindComments
                    altCommentKey={altCommentKey}
                    com={com}
                  />
                ) : (
                  <CmComCommentSimpleComments
                    altCommentKey={altCommentKey}
                    ordSelectorId={ordSelectorId}
                    comw={com.wid}
                  />
                )}
              </ModalBody>
              <ModalFooter className="flex gap-2">
                <CmComCommentSavedLocalMarker
                  comw={com.wid}
                  ordSelectorId={ordSelectorId}
                />
                <CmComCommentAlternativeSelector comw={com.wid} />
              </ModalFooter>
            </>
          )
        }
      </WithAtomValue>
    </>
  );
};
