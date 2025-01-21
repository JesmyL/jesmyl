import { useState } from 'react';
import { SokiVisitor } from 'shared/api';
import { isNIs } from 'shared/utils';
import { TgLinkOrFio } from './TgLinkOrFio';

export const Visitor = ({ visitor }: { visitor: SokiVisitor }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div onClick={() => setIsOpen(isNIs)}>
      <span className={'color--3'}>
        <TgLinkOrFio profile={visitor} /> v{visitor.version || '?'} {visitor.deviceId}
      </span>
      {isOpen ? (
        <div className="margin-gap">
          <div>{visitor.fio}</div>
          <div className="color--7">{visitor.time}</div>
          <div className="color--4">{visitor.browser}</div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};
