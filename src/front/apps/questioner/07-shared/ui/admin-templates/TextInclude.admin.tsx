import { translateBase } from '#basis/locale';
import { InputWithLoadingIcon } from '#basis/ui/InputWithLoadingIcon';
import { Badge } from '#shared/components/ui/badge';
import { Button } from '#shared/components/ui/button';
import { questionerAdminTsjrpcClient } from '$q/shared/tsjrpc/admin.tsjrpc';
import { useState } from 'react';
import { questionerTextIncludeSymbols, takeQuestionerTextIncludeSymbols } from 'shared/const/q/textIncludeSymbols';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { QuestionerAdminTemplateContentProps, QuestionerType } from 'shared/model/q';
import { itNIt } from 'shared/utils';
import { mapObjectEntries } from 'shared/utils/object.utils';
import { QuestionerTextIncludeResultText } from '../-inner-ui/TextIncludeResultText';

export const QuestionerAdminTextIncludeTemplateCardContent = ({
  blank,
  template,
  templateId,
}: QuestionerAdminTemplateContentProps<QuestionerType.TextInclude>) => {
  const allIncludeSymbols = takeQuestionerTextIncludeSymbols(template).split('');
  const availableSymbols = template.symbols?.split('') ?? allIncludeSymbols;
  const [isSymbolsUpdate, setIsSymbolsUpdate] = useState(false);
  const [focusedVariant, setFocusedVariant] = useState<string | null>(null);
  const correctReplacements = template.correct ?? {};

  return (
    <>
      <div className="flex gap-3 my-3">
        <span dangerouslySetInnerHTML={{ __html: translateBase(BaseLocaleKey.QuestionerTextIncorrectHint) }} />
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
                }}
              >
                {symbol}
              </Badge>
            );
          })}
          <div className="opacity-50">{translateBase(BaseLocaleKey.QuestionerSymbolsAdjustHint)}</div>
        </div>
      </div>
      <InputWithLoadingIcon
        icon="TextAlignLeft"
        multiline
        defaultValue={template.text}
        strongDefaultValue
        onChanged={text => questionerAdminTsjrpcClient.switchTemplateTextValue({ blankw: blank.w, templateId, text })}
      />
      <div>{translateBase(BaseLocaleKey.QuestionerResultUpdateHint)}</div>

      <QuestionerTextIncludeResultText
        correctReplacements={correctReplacements}
        template={template}
        focused={focusedVariant}
      />

      <div>
        {mapObjectEntries(template.correct, (textCode, textValue) => {
          return (
            <InputWithLoadingIcon
              key={textCode}
              icon="Text"
              label={textCode}
              defaultValue={textValue}
              strongDefaultValue
              onFocus={() => setTimeout(setFocusedVariant, 100, textCode)}
              onBlur={() => setFocusedVariant(null)}
              onChanged={textValue =>
                questionerAdminTsjrpcClient.switchTemplateReplacementTextValue({
                  blankw: blank.w,
                  templateId,
                  textValue,
                  textCode,
                })
              }
            />
          );
        })}
      </div>

      <div className="mt-7">{translateBase(BaseLocaleKey.QuestionerExtraVariants)}</div>

      {template.addTexts?.map((text, texti) => {
        return (
          <InputWithLoadingIcon
            key={texti}
            icon="Text"
            defaultValue={text}
            onChanged={text =>
              questionerAdminTsjrpcClient.changeTemplateTextValue({ blankw: blank.w, templateId, text, texti })
            }
          />
        );
      })}

      <Button
        icon="Add02"
        className="mt-5"
        disabled={template.addTexts?.some(itNIt)}
        disabledReason={translateBase(BaseLocaleKey.QuestionerVariantsNoTitle)}
        onClick={() => questionerAdminTsjrpcClient.addTemplateTextValue({ blankw: blank.w, templateId })}
      >
        {translateBase(BaseLocaleKey.QuestionerAddVariant)}
      </Button>
    </>
  );
};
