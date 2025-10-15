import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { useState } from 'react';

export const CmComNotFoundPage = () => {
  const [firstNow] = useState(Date.now());

  if (Date.now() - firstNow < 400) return null;

  return (
    <PageContainerConfigurer
      className="com-container"
      contentClass="p-2 text-xKO flex full-size center"
      headTitle="К списку песен"
      content={
        <span className="flex gap-2">
          <LazyIcon icon="FileNotFound" />
          Песня не найдена
        </span>
      }
    />
  );
};
