import { useState } from 'react';
import { makeRegExp } from 'shared/utils';
import { useCheckIsAccessed } from '../../../../../complect/exer/hooks/check-is-accessed';
import useIsExpand from '../../../../../complect/expand/useIsExpand';
import KeyboardInput from '../../../../../complect/keyboard/KeyboardInput';
import SendButton from '../../../../../complect/sends/send-button/SendButton';
import { IconPlusSignCircleStrokeRounded } from '../../../../../complect/the-icon/icons/plus-sign-circle';
import { useAuth } from '../../../../index/atoms';
import { gamerExer } from '../../gamerExer';
import { useSpyLocations } from './molecules';

export default function SpyLocations({ isForceShow }: { isForceShow?: boolean }) {
  const [isOpenAdder, setIsOpenAdder] = useState(false);
  const [newName, setNewName] = useState('');
  const [title, isExpand] = useIsExpand(false, <h2>Все локации</h2>);

  const locations = useSpyLocations();
  const auth = useAuth();
  const checkIsAccessed = useCheckIsAccessed(auth);

  const locationsNode = <div>{locations?.map(location => <div key={location}>{location}</div>)}</div>;
  if (isForceShow) return locationsNode;

  const isShortNewName = newName.length < 3;
  const incorrectsInNewName = newName.match(makeRegExp('/[^а-яё -]+|[- ]{2,}|^[ -]|[ -]$/i'));
  const upperName = newName.toUpperCase();
  const isInclusiveNewName = locations?.some(loc => loc === upperName);

  return (
    <>
      {title}
      {isExpand && (
        <>
          {locationsNode}
          {!isOpenAdder && checkIsAccessed(50) && (
            <IconPlusSignCircleStrokeRounded
              className="margin-gap color--ok"
              onClick={() => setIsOpenAdder(is => !is)}
            />
          )}
          {isOpenAdder && (
            <div className="margin-big-gap-v">
              <div className="full-width">
                Новая локация
                <KeyboardInput
                  value={newName}
                  onChange={value => setNewName(value)}
                />
              </div>
              {isInclusiveNewName && <div className="error-message text-center">Такая локация уже существует</div>}
              {incorrectsInNewName && (
                <div className="error-message text-center">Некорректное название ({incorrectsInNewName})</div>
              )}
              {isShortNewName && <div className="error-message text-center">Минимум 3 символа для названия</div>}

              <div className="flex center margin-big-gap">
                <SendButton
                  title="Отправить локацию"
                  onSuccess={() => setNewName('')}
                  disabled={isInclusiveNewName || !!incorrectsInNewName || isShortNewName}
                  onSend={() => {
                    return gamerExer.send({
                      action: 'addNewLocation',
                      method: 'push',
                      args: {
                        location: upperName,
                      },
                    });
                  }}
                />
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
