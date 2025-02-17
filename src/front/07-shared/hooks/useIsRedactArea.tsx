import IconButton from '#shared/ui/the-icon/IconButton';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { useState } from 'react';

type booleanOrNil = boolean | nil;
type OnEditStart = ((isSelfRedact: boolean) => void) | nil;

export default function useIsRedactArea(
  redactable?: booleanOrNil,
  redact?: booleanOrNil,
  canRedact?: booleanOrNil,
  isShowDoneButton?: booleanOrNil,
  onEditStart?: OnEditStart,
) {
  return useIsRedactAreaWithInit(false, redactable, redact, canRedact, isShowDoneButton, onEditStart);
}

export function useIsRedactAreaWithInit(
  init: boolean,
  redactable?: booleanOrNil,
  redact?: booleanOrNil,
  canRedact?: booleanOrNil,
  isShowDoneButton?: booleanOrNil,
  onEditStart?: OnEditStart,
) {
  const [isSelfRedact, setIsSelfRedact] = useState(init);
  const isCanRedact = !!(canRedact == null || canRedact);

  const ret = {
    isSelfRedact,
    isRedact: isCanRedact && (redact ?? (redactable == null ? isSelfRedact : redactable && isSelfRedact)),
    setIsSelfRedact,
    editIcon:
      redactable && isCanRedact ? (
        !(redact ?? isSelfRedact) ? (
          <LazyIcon
            icon="Edit02"
            className="pointer edit-button"
            onClick={event => {
              event.stopPropagation();
              if (redact == null) setIsSelfRedact(true);
              onEditStart?.(true);
            }}
          />
        ) : (
          isShowDoneButton && (
            <IconButton
              icon="CheckmarkCircle02"
              className="edit-button color--ok"
              disabled={redact === true && !isSelfRedact}
              onClick={event => {
                event.stopPropagation();
                setIsSelfRedact(false);
                onEditStart?.(false);
              }}
            />
          )
        )
      ) : null,
  };

  return ret;
}
