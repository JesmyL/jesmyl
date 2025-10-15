import { hookEffectPipe, setTimeoutPipe } from '#shared/lib/hookEffectPipe';
import { CopyTextButton } from '#shared/ui/CopyTextButton';
import { ModalBody } from '#shared/ui/modal/Modal/ModalBody';
import { ModalFooter } from '#shared/ui/modal/Modal/ModalFooter';
import { ModalHeader } from '#shared/ui/modal/Modal/ModalHeader';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { CmCom, useCmComChordVisibleVariant } from '$cm/entities/com';
import {
  CmComToolChordsVariant,
  CmComToolIsComToolIconItemsContext,
  CmComToolMiniAnchorSwitch,
} from '$cm/entities/com-tool';
import { cmComIsComMiniAnchorAtom } from '$cm/entities/index';
import { TheCmComCurrent } from '$cm/widgets/com';
import { useAtomValue } from 'atomaric';
import { useEffect, useState } from 'react';
import { makeRegExp } from 'regexpert';

export const CmComCopyTextModalInner = ({ com }: { com: CmCom }) => {
  const [text, setText] = useState('');
  const [chordVisibleVariant] = useCmComChordVisibleVariant();
  const isMiniAnchor = useAtomValue(cmComIsComMiniAnchorAtom);

  useEffect(() => {
    return hookEffectPipe()
      .pipe(
        setTimeoutPipe(() => {
          const text =
            com.orders
              ?.map((ord, ordi) => {
                const isShowChordsInText = ord.isCanShowChordsInText(chordVisibleVariant);

                const isMini =
                  isMiniAnchor && (ord.me.isAnchor || ord.me.isAnchorInherit || ord.me.isAnchorInheritPlus);
                const header = ord.me.isInherit ? '' : ord.me.header({ isTexted: !isMini });

                if (isMini) return header && `\n${header}.`;
                const chordLabels = ord.chordLabels ?? com.chordLabels[ordi];

                if (!ord.text)
                  return `\n${ord.me.header()}.${isShowChordsInText ? `\n${chordLabels?.map(line => line.join(' ')).join('\n') ?? ''}` : ''}`;

                const preparedText = ord.repeatedText().replace(makeRegExp('/&nbsp;/g'), ' ');
                if (!isShowChordsInText) return `${header && `\n${header}\n`}${preparedText}`;

                const textLines = preparedText.split('\n');
                const chordLines = chordLabels.map((line, linei) =>
                  line.slice(0, ord.positions?.[linei]?.length ?? 0).join(' '),
                );
                const lines: string[] = [];
                for (const textLinei in textLines) {
                  lines.push(chordLines[textLinei], textLines[textLinei]);
                }

                return `${header ? `\n${header}\n` : ''}${isMini ? '' : lines.join('\n')}`;
              })
              .join('\n') ?? '';

          setText(text);
        }, 200),
      )
      .effect();
  }, [chordVisibleVariant, com.chordLabels, com.orders, isMiniAnchor]);

  return (
    <>
      <ModalHeader className="flex gap-2">
        <LazyIcon icon="Copy01" />
        {com.name}
      </ModalHeader>
      <ModalBody>
        <TheCmComCurrent com={com} />
      </ModalBody>
      <ModalFooter className="flex w-full justify-between!">
        <div className="flex gap-2">
          <CmComToolIsComToolIconItemsContext value>
            <CmComToolChordsVariant />
            <CmComToolMiniAnchorSwitch />
          </CmComToolIsComToolIconItemsContext>
        </div>
        <CopyTextButton text={text} />
      </ModalFooter>
    </>
  );
};
