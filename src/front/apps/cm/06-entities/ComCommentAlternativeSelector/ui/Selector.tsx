import { Button } from '#shared/components';
import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import { Modal, usePrompt } from '#shared/ui/modal';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { WithAtom } from '#shared/ui/WithAtom';
import { cmComCommentCurrentOpenedAltKeyAtom, cmComCommentRegisteredAltKeysAtom } from '$cm/entities/com-comment';
import { cmConstantsConfigAtom, cmIDB } from '$cm/ext';
import { useAtomValue } from 'atomaric';
import { CmComWid } from 'shared/api';
import { toast } from 'sonner';
import { CmComCommentAlternativeSelectorTransferModalInner } from './TransferAltCommentModalInner';

export const CmComCommentAlternativeSelector = ({ comw }: { comw: CmComWid }) => {
  const altCommentKeys = useAtomValue(cmComCommentCurrentOpenedAltKeyAtom);
  const altCommentKey = altCommentKeys[comw] ?? altCommentKeys.last;

  const { maxComCommentAlternativesCount } = useAtomValue(cmConstantsConfigAtom);
  const prompt = usePrompt();
  const registeredAltKeys = useAtomValue(cmComCommentRegisteredAltKeysAtom);

  return (
    <>
      <Dropdown<string | null>
        id={altCommentKey}
        nullTitle={<span className="text-x7">Общ</span>}
        onSelectId={last => cmComCommentCurrentOpenedAltKeyAtom.do.setPartial({ last, [comw]: last ?? undefined })}
        items={Array.from(registeredAltKeys).map(key => ({ id: key, title: key }))}
        renderItem={({ node }) => (
          <>
            <LazyIcon icon="TextAlignLeft" />
            {node}
          </>
        )}
        addContent={
          <div className="flex flex-col gap-3">
            <Button
              asSpan
              className="text-x7 w-full"
              disabled={registeredAltKeys.size >= maxComCommentAlternativesCount}
              onClick={async () => {
                if (cmComCommentRegisteredAltKeysAtom.get().size >= maxComCommentAlternativesCount) {
                  toast('Добавлено максимальное количество альтернатив');
                  return;
                }

                const altCommentKey = (await prompt('Добавить новую альтернативу'))?.toLowerCase();
                const localComment = await cmIDB.tb.localComCommentBlocks.get(comw);

                if (!altCommentKey || (localComment?.alt && altCommentKey in localComment.alt)) {
                  return;
                }
                const maxLen = 10;

                if (altCommentKey.length > maxLen) {
                  toast(`Слишком длинное название (${maxLen}+)`);
                  return;
                }

                await cmIDB.tb.localComCommentBlocks.put({
                  ...localComment,
                  comw,
                  m: Date.now(),
                  alt: { ...localComment?.alt, [altCommentKey]: {} },
                });

                cmComCommentRegisteredAltKeysAtom.do.add(altCommentKey);
              }}
            >
              <LazyIcon icon="PlusSign" />
              Добавить
            </Button>

            <WithAtom init={false}>
              {isOpenTransferModalAtom => (
                <>
                  <Button
                    asSpan
                    className="text-x7"
                    onClick={isOpenTransferModalAtom.do.toggle}
                  >
                    <LazyIcon icon="ArrowDataTransferHorizontal" />
                    Обмен
                  </Button>

                  <Modal openAtom={isOpenTransferModalAtom}>
                    <CmComCommentAlternativeSelectorTransferModalInner comw={comw} />
                  </Modal>
                </>
              )}
            </WithAtom>
          </div>
        }
      />
    </>
  );
};
