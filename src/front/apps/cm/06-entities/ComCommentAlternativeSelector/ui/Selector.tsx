import { constantsConfigAtom } from '#basis/state/constantsAtom';
import { Button } from '#shared/components';
import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import { usePrompt } from '#shared/ui/modal';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { cmComCommentCurrentComw2OpenAltiDictAtom, cmComCommentRegisteredAltKeysAtom } from '$cm/entities/com-comment';
import { useAtomValue } from 'atomaric';
import { CmComWid } from 'shared/api';
import { toast } from 'sonner';

export const CmComCommentAlternativeSelector = ({ comw }: { comw: CmComWid }) => {
  const altCommentKeys = useAtomValue(cmComCommentCurrentComw2OpenAltiDictAtom);
  const commentAlti = altCommentKeys[comw] ?? altCommentKeys.lasti;

  const { maxComCommentAlternativesCount } = useAtomValue(constantsConfigAtom);
  const prompt = usePrompt();
  const registeredAltKeys = useAtomValue(cmComCommentRegisteredAltKeysAtom);

  return (
    <>
      <Dropdown<number>
        id={commentAlti}
        onSelectId={last =>
          cmComCommentCurrentComw2OpenAltiDictAtom.do.setPartial({ lasti: last, [comw]: last || undefined })
        }
        items={registeredAltKeys.map((key, keyi) => ({
          id: keyi,
          title: keyi ? key : <span className="text-x7">Общ</span>,
        }))}
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
              disabled={registeredAltKeys.length >= maxComCommentAlternativesCount}
              onClick={async () => {
                if (registeredAltKeys.length >= maxComCommentAlternativesCount) {
                  toast('Добавлено максимальное количество альтернатив');
                  return;
                }

                const commentAlti = (await prompt('Добавить новую альтернативу'))?.toLowerCase();

                if (!commentAlti) return;

                const maxLen = 10;

                if (commentAlti.length > maxLen) {
                  toast(`Слишком длинное название (${maxLen}+)`);
                  return;
                }

                // TODO
                toast('Функционал не доступен');
              }}
            >
              <LazyIcon icon="PlusSign" />
              Добавить
            </Button>
          </div>
        }
      />
    </>
  );
};
