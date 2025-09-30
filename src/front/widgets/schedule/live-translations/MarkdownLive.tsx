import { markdown } from '#shared/config/markdown';
import { css } from 'styled-components';

interface Props {
  md?: string;
}

export const ScheduleWidgetMarkdownLiveTranslation = ({ md }: Props) => {
  return (
    md && (
      <div className="markdown-translation-screen">
        <div dangerouslySetInnerHTML={{ __html: markdown.render(md) }} />
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
