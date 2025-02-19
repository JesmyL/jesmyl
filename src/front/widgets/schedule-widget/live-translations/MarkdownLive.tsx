import Markdown from 'markdown-to-jsx';
import { css } from 'styled-components';

interface Props {
  md?: string;
}

export const ScheduleWidgetMarkdownLiveTranslation = ({ md }: Props) => {
  return (
    md && (
      <div className="markdown-translation-screen">
        <Markdown>{md}</Markdown>
        <style>
          {'' +
            css`
              .markdown-translation-screen {
                padding: 5%;

                table {
                  width: 100%;

                  tr:has(strong) td {
                    padding: 20px 0;
                  }
                }
              }
            `}
        </style>
      </div>
    )
  );
};
