import { currentLangiAtom, translateBase } from '#basis/locale';
import { ModalBody, ModalHeader } from '#shared/ui/modal';
import {
  bibleAllTranslates,
  bibleMyTranslatesAtom,
  BibleTranslateModulesRedactButton,
  takeBibleLangBooks,
  translateDescriptions,
} from '$bible/ext';
import { useAtomValue } from 'atomaric';
import React from 'react';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { CmComCommentForExample } from './ForExample';

export function TheCmComCommentBibleTextsInfo() {
  const myTranslates = useAtomValue(bibleMyTranslatesAtom);
  const langi = useAtomValue(currentLangiAtom);

  return (
    <div className="">
      <ModalHeader>{translateBase(BaseLocaleKey.BiblePrefaceTexts)}</ModalHeader>
      <ModalBody>
        <p>{translateBase(BaseLocaleKey.BiblePreface1)}</p>

        <p>
          {translateBase(BaseLocaleKey.BiblePreface2)}
          <CmComCommentForExample>
            rst:1 Фес 1:2-3
            <br />
            rst:1пар2:13
          </CmComCommentForExample>
          <br />
          {translateBase(BaseLocaleKey.BiblePreface3)}
        </p>

        <p>
          {translateBase(BaseLocaleKey.BiblePreface4)}
          <CmComCommentForExample>1 Фес 1:2-3</CmComCommentForExample>
        </p>

        <p>
          {translateBase(BaseLocaleKey.BiblePreface5)}
          {bibleAllTranslates.map(tName => {
            return (
              <React.Fragment key={tName}>
                <br />
                <span className="text-x7">{tName}</span> - {translateDescriptions[tName]}
              </React.Fragment>
            );
          })}
        </p>

        <p>
          <span className="text-xKO">{translateBase(BaseLocaleKey.BibleTranslationsMustBeLoaded)}</span>
          {translateBase(BaseLocaleKey.BibleLoadedTranslations)}:{' '}
          <span className="text-x7">{myTranslates.join(', ')}</span>
          <span className="align-middle m-2">
            <BibleTranslateModulesRedactButton />
          </span>
        </p>

        <p>
          {translateBase(BaseLocaleKey.BiblePreface6)}
          {takeBibleLangBooks(langi).map(({ full: fullName, short: shortName }, titlei) => {
            return (
              <React.Fragment key={shortName}>
                <br />
                <span className="text-x7">{shortName}</span> - {fullName}
                {titlei === 38 && <br />}
              </React.Fragment>
            );
          })}
        </p>
        <p>
          <br />
          {translateBase(BaseLocaleKey.BiblePreface7)}
          <CmComCommentForExample>1 Цар и 1Цар</CmComCommentForExample>
        </p>
      </ModalBody>
    </div>
  );
}
