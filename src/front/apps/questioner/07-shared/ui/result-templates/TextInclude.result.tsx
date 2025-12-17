import React from 'react';
import { makeQuestionerTextIncludeSymbolSplitRegExp } from 'shared/const/q/textIncludeSymbols';
import { QuestionerType } from 'shared/model/q';
import { QuestionerResultContentProps } from 'shared/model/q/answer';

export const QuestionerResultTextIncludeTemplateCardContent = ({
  template,
  userAnswer,
}: QuestionerResultContentProps<QuestionerType.TextInclude>) => {
  return (
    <>
      <div className="text-x3 my-3 white-pre-line">
        {template.text
          .split(makeQuestionerTextIncludeSymbolSplitRegExp(template))
          .map((textFragment, textFragmenti) => {
            const correctAnswerText = template.correct?.[textFragment];

            if (correctAnswerText != null) {
              const userAnswerText = userAnswer?.v[textFragment];

              return (
                <span
                  className={
                    correctAnswerText.toUpperCase() === userAnswerText?.toUpperCase() ? 'text-xOK' : 'text-xKO'
                  }
                  key={textFragmenti}
                >
                  {userAnswerText}
                </span>
              );
            }

            return <React.Fragment key={textFragmenti}>{textFragment}</React.Fragment>;
          })}
      </div>
    </>
  );
};
