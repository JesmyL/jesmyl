import React from 'react';
import { makeQuestionerTextIncludeSymbolSplitRegExp } from 'shared/const/q/textIncludeSymbols';
import { QuestionerTextIncludeTemplate } from 'shared/model/q';

export const QuestionerTextIncludeResultText = ({
  correctReplacements,
  template,
  focused,
}: {
  template: QuestionerTextIncludeTemplate;
  correctReplacements: Record<string, string>;
  focused?: string | null;
}) => {
  return (
    <div className="text-x3 my-3 white-pre-line">
      {template.text.split(makeQuestionerTextIncludeSymbolSplitRegExp(template)).map((textFragment, textFragmenti) => {
        if (correctReplacements[textFragment] != null)
          return (
            <span
              className={focused === textFragment ? 'text-xKO' : 'text-x7'}
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
