import { InputWithLoadingIcon } from '#basis/ui/InputWithLoadingIcon';
import { Badge } from '#shared/components/ui/badge';
import { questionerTextIncludeSymbols, takeQuestionerTextIncludeSymbols } from '#shared/lib/const/q/textIncludeSymbols';
import { MyLib } from '#shared/lib/my-lib';
import { questionerAdminTsjrpcClient } from '$q/processes/tsjrpc/admin.tsjrpc';
import { useState } from 'react';
import { QuestionerAdminTemplateContentProps, QuestionerType } from 'shared/model/q';
import { QuestionerTextIncludeResultText } from '../-inner-ui/TextIncludeResultText';

export const QuestionerAdminTextIncludeTemplateCardContent = ({
  blank,
  onUpdate,
  template,
  templateId,
}: QuestionerAdminTemplateContentProps<QuestionerType.TextInclude>) => {
  const allIncludeSymbols = takeQuestionerTextIncludeSymbols(template).split('');
  const availableSymbols = template.symbols?.split('') ?? allIncludeSymbols;
  const [isSymbolsUpdate, setIsSymbolsUpdate] = useState(false);
  const correctReplacements = template.correct ?? {};

  return (
    <>
      <div className="flex gap-3 my-3">
        <span>
          Вставьте <span className="font-bold">НЕПОСРЕДСТВЕННО</span> перед/в середине/после пропущенного слова такие
          символы (можно несколько подряд)
        </span>
        <div className="flex gap-2 flex-wrap flex-max">
          {questionerTextIncludeSymbols.split('').map(symbol => {
            return (
              <Badge
                key={symbol}
                className={isSymbolsUpdate ? 'disabled' : availableSymbols.includes(symbol) ? '' : 'opacity-50'}
                onClick={async () => {
                  setIsSymbolsUpdate(true);
                  try {
                    await questionerAdminTsjrpcClient.switchTemplateSymbolExistance({
                      symbol,
                      blankw: blank.w,
                      templateId,
                    });
                  } catch (_) {
                    //
                  }
                  setIsSymbolsUpdate(false);
                  onUpdate();
                }}
              >
                {symbol}
              </Badge>
            );
          })}
          <div className="opacity-50">Для корректировки набора употребляемых символов нажимайте на них</div>
        </div>
      </div>
      <InputWithLoadingIcon
        icon="TextAlignLeft"
        multiline
        defaultValue={template.text}
        strongDefaultValue
        onChanged={text =>
          questionerAdminTsjrpcClient.switchTemplateTextValue({ blankw: blank.w, templateId, text }).then(onUpdate)
        }
      />
      <div>Для обновления результата уберите фокус из текстового поля</div>

      <QuestionerTextIncludeResultText
        correctReplacements={correctReplacements}
        template={template}
      />

      <div>
        {MyLib.entries(template.correct ?? {}).map(([textCode, textValue]) => {
          return (
            <InputWithLoadingIcon
              key={textCode}
              icon="Text"
              label={textCode}
              defaultValue={textValue}
              strongDefaultValue
              onChanged={textValue =>
                questionerAdminTsjrpcClient
                  .switchTemplateReplacementTextValue({
                    blankw: blank.w,
                    templateId,
                    textValue,
                    textCode,
                  })
                  .then(onUpdate)
              }
            />
          );
        })}
      </div>
    </>
  );
};
