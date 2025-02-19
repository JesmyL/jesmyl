import { LazyIcon } from '#shared/ui/icon';
import { PageContainer } from '#shared/ui/PageContainer';
import { useState } from 'react';

export const ComNotFoundPage = () => {
  const [firstNow] = useState(Date.now());

  if (Date.now() - firstNow < 400) return null;

  return (
    <PageContainer
      className="com-container"
      contentClass="padding-gap color--ko flex full-size center"
      headTitle="К списку песен"
      content={
        <span className="flex flex-gap">
          <LazyIcon icon="FileNotFound" />
          Песня не найдена
        </span>
      }
    />
  );
};
