import PhaseContainerConfigurer from 'front/08-shared/ui/phase-container/PhaseContainerConfigurer';
import { LazyIcon } from 'front/08-shared/ui/the-icon/LazyIcon';
import { useState } from 'react';

export const ComNotFoundPage = () => {
  const [firstNow] = useState(Date.now());

  if (Date.now() - firstNow < 400) return null;

  return (
    <PhaseContainerConfigurer
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
