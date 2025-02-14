import { useState } from 'react';
import PhaseContainerConfigurer from '../../../../../complect/phase-container/PhaseContainerConfigurer';
import { IconFileNotFoundStrokeRounded } from '../../../../../complect/the-icon/icons/file-not-found';

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
          <IconFileNotFoundStrokeRounded />
          Песня не найдена
        </span>
      }
    />
  );
};
