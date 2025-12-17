import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import React from 'react';
import {
  makeQuestionerTextIncludeSymbolSplitRegExp,
  takeQuestionerTextIncludeSymbols,
} from 'shared/const/q/textIncludeSymbols';
import { QuestionerType } from 'shared/model/q';
import { QuestionerUserAnswerContentProps } from 'shared/model/q/answer';
import { QuestionerTextIncludeResultText } from '../-inner-ui/TextIncludeResultText';

export const QuestionerUserTextIncludeTemplateCardContent = ({
  isCantRedact,
  onUpdate,
  template,
  userAnswer,
}: QuestionerUserAnswerContentProps<QuestionerType.TextInclude>) => {
  const variantItems = template.textVariants?.map(title => ({ id: title, title })) ?? [];
  const symbolCharsSet = new Set(
    takeQuestionerTextIncludeSymbols(template)
      .split('')
      .map(it => it[0]),
  );

  return (
    <>
      {isCantRedact ? (
        userAnswer?.v && (
          <QuestionerTextIncludeResultText
            correctReplacements={userAnswer.v}
            template={template}
          />
        )
      ) : (
        <div className="text-x3 my-3 white-pre-line">
          {template.text
            .split(makeQuestionerTextIncludeSymbolSplitRegExp(template))
            .map((textFragment, textFragmenti) => {
              if (symbolCharsSet.has(textFragment[0]))
                return (
                  <span
                    className="text-x7"
                    key={textFragmenti}
                  >
                    <Dropdown
                      placeholder="..."
                      id={userAnswer?.v[textFragment]}
                      items={variantItems}
                      hiddenArrow
                      onSelectId={id => onUpdate(prev => ({ ...prev, [textFragment]: id }))}
                    />
                  </span>
                );

              return <React.Fragment key={textFragmenti}>{textFragment}</React.Fragment>;
            })}
        </div>
      )}
    </>
  );
};
