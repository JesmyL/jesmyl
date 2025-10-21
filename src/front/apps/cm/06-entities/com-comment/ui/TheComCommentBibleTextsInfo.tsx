import { ModalBody, ModalHeader } from '#shared/ui/modal';
import {
  bibleAllTranslates,
  BibleModulesTranslationsRedactButton,
  bibleTitles,
  translateDescriptions,
  useBibleMyTranslates,
} from '$bible/ext';
import React from 'react';
import { CmComCommentForExample } from './ForExample';

export function TheCmComCommentBibleTextsInfo() {
  const [myTranslates] = useBibleMyTranslates();

  return (
    <div className="">
      <ModalHeader>Библейские тексты в Предисловии</ModalHeader>
      <ModalBody>
        <p>
          Если в тексте для Предисловия вставить Библейскую ссылку в определённом формате, то в Предисловие будет
          вставлен текст из Писания автоматически
        </p>

        <p>
          Последовательность Библейской ссылки выглядит так:
          <CmComCommentForExample>
            rst:1 Фес 1:2-3
            <br />
            rst:1пар2:13
          </CmComCommentForExample>
          <br />
          Пробелы и высота букв не обязательны. Но пробела после кода перевода (rst:) быть не должно
        </p>

        <p>
          Для вставки в Предисловие текста Писания обязательна приставка перевода с двоеточием (в предыдущем примере
          "rst:")
          <CmComCommentForExample>1 Фес 1:2-3</CmComCommentForExample> - такая ссылка не будет сопровождаться Библейским
          текстом
        </p>

        <p>
          Перевод задаётся латинскими буквами. На данный момент доступны такие переводы:
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
          <span className="text-xKO">Нужный перевод должен быть загружен!</span>
          {'Загруженные переводы: '}
          <span className="text-x7">{myTranslates.join(', ')}</span>
          <span className="align-middle m-2">
            <BibleModulesTranslationsRedactButton />
          </span>
        </p>

        <p>
          Для идентификации Библейской книги укажите сокращение или полное название:
          {bibleTitles.titles.map(({ full: fullName, short: shortName }, titlei) => {
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
          Можно указывать пробел после цифры в названии книги
          <CmComCommentForExample>1 Цар и 1Цар</CmComCommentForExample> - одинаковые записи
        </p>
      </ModalBody>
    </div>
  );
}
