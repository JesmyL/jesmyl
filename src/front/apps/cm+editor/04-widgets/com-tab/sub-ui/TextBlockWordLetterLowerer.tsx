import { Button } from '#shared/components';
import { ModalBody, ModalFooter, ModalHeader } from '#shared/ui/modal';
import { cmEditComClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { CmCom } from '$cm/ext';
import { useState } from 'react';
import { makeRegExp } from 'regexpert';
import { twMerge } from 'tailwind-merge';

const mappers: ((word: string) => string)[] = [
  word => word.toUpperCase(),
  word => {
    const wordi = word.search(makeRegExp('/[а-яё]/i'));
    return word.slice(0, wordi) + word[wordi].toUpperCase() + word.slice(wordi + 1).toLowerCase();
  },
  word => word.toLowerCase(),
];

export const CmEditorComTabTextBlockWordLetterLowerer = ({ com }: { com: CmCom }) => {
  const comTextBlocks = com.texts?.map(text => text.trim().split(makeRegExp('/(\\s+)/'))) ?? [];

  const [{ texts, texti, wordi }, setWordState] = useState(() => ({
    texts: comTextBlocks,
    texti: -1,
    wordi: -1,
  }));

  const selectedWord = texts[texti]?.[wordi];

  return (
    <>
      <ModalHeader className="flex flex-end">
        <Button
          icon="Telegram"
          onClick={() =>
            cmEditComClientTsjrpcMethods.textCaps({
              comw: com.wid,
              texts: texts.map(words => words.join('')),
            })
          }
        />
      </ModalHeader>
      <ModalBody className="max-h-[70vh]!">
        {comTextBlocks.map((words, itTexti) => (
          <div
            key={itTexti}
            className="my-5"
          >
            {words.map((itWord, itWordi) => {
              if (itWord === itWord.toLowerCase()) return itWord;
              const word = texts[itTexti]?.[itWordi];

              return (
                <Button
                  key={itWordi}
                  size="sx"
                  className={twMerge(
                    texti === itTexti && wordi === itWordi && 'bg-x7! text-x1',
                    word !== itWord && 'underline',
                  )}
                  onClick={() => setWordState(prev => ({ ...prev, texti: itTexti, wordi: itWordi }))}
                >
                  {word}
                </Button>
              );
            })}
          </div>
        ))}
      </ModalBody>
      {selectedWord && (
        <ModalFooter className="flex flex-col w-full min-h-10 gap-3">
          {mappers.map((mapper, mapperi) => {
            const mappedWord = mapper(selectedWord);

            return (
              <Button
                key={mapperi}
                size="sm"
                className={twMerge(
                  mappedWord === comTextBlocks[texti]?.[wordi] && 'underline',
                  mappedWord === selectedWord && 'bg-x3! text-x1',
                )}
                onClick={() => {
                  const newTexts = [...texts];
                  newTexts[texti] = [...newTexts[texti]];
                  newTexts[texti][wordi] = mappedWord;

                  setWordState(prev => ({ ...prev, texts: newTexts }));
                }}
              >
                {mappedWord}
              </Button>
            );
          })}
        </ModalFooter>
      )}
    </>
  );
};
