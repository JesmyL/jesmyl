import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { useScheduleWidgetRightsContext } from '../contexts';

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
    <div className={twMerge('flex gap-2', className)}>
      {prefix}
      {titleBox != null &&
        ((iForceShowTopic || userRights.isCanReadTitles) && topicBox?.topic ? (
          <>
            <span className="text-x3">{titleBox.title || altTitle}: </span>
            {topicBox.topic}
          </>
        ) : (
          <span className="text-x3">{titleBox.title || altTitle}</span>
        ))}
    </div>
  );
}
