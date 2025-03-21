import { ModalBody } from '#shared/ui/modal/Modal/ModalBody';
import { ModalHeader } from '#shared/ui/modal/Modal/ModalHeader';
import { bibleTitles } from '$bible/basis/lib/const/bibleTitlesJson';
import { bibleAllTranslates, translateDescriptions } from '$bible/basis/lib/const/consts';
import { useBibleMyTranslates } from '$bible/basis/lib/hooks/translates';
import { BibleModulesTranslationsRedactButton } from '$bible/entities/ModulesTranslationsRedactButton';
import React from 'react';
import { TheComCommentForExample } from './ForExample';

export function TheComCommentBibleTextsInfo() {
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
          <TheComCommentForExample>
            rst:1 Фес 1:2-3
            <br />
            rst:1пар2:13
          </TheComCommentForExample>
          <br />
          Пробелы и высота букв не обязательны. Но пробела после кода перевода (rst:) быть не должно
        </p>

        <p>
          Для вставки в Предисловие текста Писания обязательна приставка перевода с двоеточием (в предыдущем примере
          "rst:")
          <TheComCommentForExample>1 Фес 1:2-3</TheComCommentForExample> - такая ссылка не будет сопровождаться
          Библейским текстом
        </p>

        <p>
          Перевод задаётся латинскими буквами. На данный момент доступны такие переводы:
          {bibleAllTranslates.map(tName => {
            return (
              <React.Fragment key={tName}>
                <br />
                <span className="color--7">{tName}</span> - {translateDescriptions[tName]}
              </React.Fragment>
            );
          })}
        </p>

        <p>
          <span className="color--ko">Нужный перевод должен быть загружен!</span>
          {'Загруженные переводы: '}
          <span className="color--7">{myTranslates.join(', ')}</span>
          <span className="vertical-middle margin-gap">
            <BibleModulesTranslationsRedactButton />
          </span>
        </p>

        <p>
          Для идентификации Библейской книги укажите сокращение или полное название:
          {bibleTitles.titles.map(([fullName, shortName], titlei) => {
            return (
              <React.Fragment key={shortName}>
                <br />
                <span className="color--7">{shortName}</span> - {fullName}
                {titlei === 38 && <br />}
              </React.Fragment>
            );
          })}
        </p>
        <p>
          <br />
          Можно указывать пробел после цифры в названии книги
          <TheComCommentForExample>1 Цар и 1Цар</TheComCommentForExample> - одинаковые записи
        </p>
      </ModalBody>
    </div>
  );
}
