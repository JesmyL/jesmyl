import { ReactNode } from 'react';
import { useScheduleWidgetRightsContext } from '../useScheduleWidget';

export function ScheduleWidgetTopicTitle<TitleBox extends { title?: string }>({
  titleBox,
  topicBox,
  className,
  altTitle,
  prefix,
  iForceShowTopic,
}: {
  titleBox: TitleBox;
  topicBox?: { topic?: string };
  className?: string;
  prefix?: ReactNode;
  iForceShowTopic?: boolean;
} & (TitleBox['title'] extends string ? { altTitle?: string } : { altTitle: string })) {
  const userRights = useScheduleWidgetRightsContext();

  return (
    <div className={(className || '') + ' flex flex-gap'}>
      {prefix}
      {titleBox != null &&
        ((iForceShowTopic || userRights.isCanReadTitles) && topicBox?.topic ? (
          <>
            <span className="color--3">{titleBox.title || altTitle}: </span>
            {topicBox.topic}
          </>
        ) : (
          <span className="color--3">{titleBox.title || altTitle}</span>
        ))}
    </div>
  );
}
