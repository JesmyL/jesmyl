import { makeQuestionerTextIncludeSymbolSplitRegExp } from '#shared/lib/const/q/textIncludeSymbols';
import React from 'react';
import { QuestionerTextIncludeTemplate } from 'shared/model/q';

export const QuestionerTextIncludeResultText = ({
  correctReplacements,
  template,
}: {
  template: QuestionerTextIncludeTemplate;
  correctReplacements: Record<string, string>;
}) => {
  return (
    <div className="text-x3 my-3 white-pre-line">
      {template.text.split(makeQuestionerTextIncludeSymbolSplitRegExp(template)).map((textFragment, textFragmenti) => {
        if (correctReplacements[textFragment] != null)
          return (
            <span
              className="text-x7"
              key={textFragmenti}
            >
              {correctReplacements[textFragment]}
            </span>
          );

        return <React.Fragment key={textFragmenti}>{textFragment}</React.Fragment>;
      })}
    </div>
  );
};
