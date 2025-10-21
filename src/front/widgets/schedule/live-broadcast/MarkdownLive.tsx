import { markdown } from '#shared/config/markdown';
import { css } from 'styled-components';

interface Props {
  md?: string;
}

export const ScheduleWidgetMarkdownLiveBroadcast = ({ md }: Props) => {
  return (
    md && (
      <div className="markdown-broadcast-screen">
        <div dangerouslySetInnerHTML={{ __html: markdown.render(md) }} />
        <style>
          {'' +
            css`
              .markdown-broadcast-screen {
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
