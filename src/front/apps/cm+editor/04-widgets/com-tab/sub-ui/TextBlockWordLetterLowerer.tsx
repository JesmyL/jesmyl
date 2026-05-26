import { Button } from '#shared/components';
import { mylib } from '#shared/lib/my-lib';
import { ModalBody, ModalHeader } from '#shared/ui/modal';
import { cmEditComClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { CmCom } from '$cm/ext';
import { useState } from 'react';
import { makeRegExp } from 'regexpert';
import { itIt } from 'shared/utils';
import { twMerge } from 'tailwind-merge';

const mappers: ((word: string) => string)[] = [
  word => {
    const wordi = word.search(makeRegExp('/[а-яё]/i'));
    return word.slice(0, wordi) + word[wordi].toUpperCase() + word.slice(wordi + 1).toLowerCase();
  },
  word => word.toLowerCase(),
  word => word.toUpperCase(),
  itIt,
];

export const CmEditorComTabTextBlockWordLetterLowerer = ({ com }: { com: CmCom }) => {
  const comTextBlocks = com.texts?.map(text => text.trim().split(makeRegExp('/(\\s+)/'))) ?? [];

  const [{ texts, texti, wordi }, setWordState] = useState(() => ({
    texts: comTextBlocks,
    texti: -1,
    wordi: -1,
  }));

  return (
    <>
      <ModalHeader className="flex flex-end">
        <Button
          icon="Telegram"
          disabled={mylib.isEq(texts, comTextBlocks)}
          onClick={() =>
            cmEditComClientTsjrpcMethods.textCaps({
              comw: com.wid,
              texts: texts.map(words => words.join('')),
            })
          }
        >
          Отправить
        </Button>
      </ModalHeader>
      <ModalBody>
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
                  onClick={() => {
                    const selectedWord = texts[itTexti]?.[itWordi];
                    let nextMapi = mappers.findIndex(mapper => mapper(selectedWord) === selectedWord) + 1;
                    if (!mappers[nextMapi]) nextMapi = 0;

                    const newTexts = [...texts];
                    newTexts[itTexti] = [...(newTexts[itTexti] || [])];
                    newTexts[itTexti][itWordi] = mappers[nextMapi](itWord);

                    setWordState(prev => ({
                      ...prev,
                      texti: itTexti,
                      wordi: itWordi,
                      texts: newTexts,
                      mapi: nextMapi,
                    }));
                  }}
                >
                  {word}
                </Button>
              );
            })}
          </div>
        ))}
      </ModalBody>
    </>
  );
};
