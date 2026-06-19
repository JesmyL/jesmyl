import { Button } from '#shared/components';
import { mylib } from '#shared/lib/my-lib';
import { ModalBody, ModalHeader } from '#shared/ui/modal';
import { cmEditComClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { useState } from 'react';
import { makeRegExp } from 'regexpert';
import { CmCom } from 'shared/const/cm/Com';
import { emptyAsyncFunc } from 'shared/utils';
import { checkIsNotNil } from 'shared/utils/checkIs';
import { textToCapitalizeSlavicCase, textToLowerCase } from 'shared/utils/string.utils';
import { twMerge } from 'tailwind-merge';
import { CmEditorComTabRedactTextWithIncorrectMessage } from './RedactTextWithIncorrectMessage';

export const CmEditorComTabTextBlockWordLetterLowerer = ({ com, onUpdate }: { com: CmCom; onUpdate: () => void }) => {
  const splitReg = makeRegExp('/(\\s+)/');
  const [initialTexts, setInitialTexts] = useState(() => com.texts?.map(text => text.trim().split(splitReg)) ?? []);

  const [textiOnEdit, setTextiOnEdit] = useState<number | nil>(null);
  const [isError, setIsError] = useState(false);

  const [{ texts, texti, wordi }, setWordState] = useState(() => ({
    texts: initialTexts,
    texti: -1,
    wordi: -1,
  }));

  return (
    <>
      <ModalHeader className="flex flex-end">
        <Button
          icon="Telegram"
          disabled={isError || mylib.isEq(texts, initialTexts)}
          onClick={async () => {
            await cmEditComClientTsjrpcMethods.textCaps({
              comw: com.wid,
              texts: texts.map(words => words.join('')),
            });

            setInitialTexts(texts);
            onUpdate();
          }}
        >
          Отправить
        </Button>
      </ModalHeader>
      <ModalBody>
        {initialTexts.map((words, itTexti) => {
          const isOnEdit = textiOnEdit === itTexti;
          let textValue;

          return (
            <div key={itTexti}>
              <div className="flex w-full flex-end">
                {isOnEdit ? (
                  <Button
                    icon="CheckmarkCircle01"
                    disabled={isError}
                    onClick={() => {
                      setTextiOnEdit(null);
                      setWordState(prev => ({ ...prev, texts: texts.with(itTexti, initialTexts[itTexti]) }));
                    }}
                  />
                ) : (
                  <Button
                    icon="Edit02"
                    disabled={checkIsNotNil(textiOnEdit) || !mylib.isEq(initialTexts[itTexti], texts[itTexti])}
                    onClick={() => setTextiOnEdit(itTexti)}
                  />
                )}
              </div>

              {isOnEdit ? (
                <CmEditorComTabRedactTextWithIncorrectMessage
                  defaultValue={(textValue = words.join(''))}
                  text={textValue}
                  onInput={value => setInitialTexts(initialTexts.with(itTexti, value.split(splitReg)))}
                  onChanged={emptyAsyncFunc}
                  className="[&_.stameska-icon]:hidden gap-0"
                  setIsError={setIsError}
                />
              ) : (
                words.map((itWord, itWordi) => {
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
                        const mappers = [textToCapitalizeSlavicCase, textToLowerCase];

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
                })
              )}
            </div>
          );
        })}
      </ModalBody>
    </>
  );
};
