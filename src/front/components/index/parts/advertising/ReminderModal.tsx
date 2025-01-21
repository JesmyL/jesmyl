import { Link } from 'react-router-dom';
import { ModalBody } from '../../../../complect/modal/Modal/ModalBody';
import { ModalHeader } from '../../../../complect/modal/Modal/ModalHeader';
import { useCurrentApp } from '../../atoms';

export const IndexAdvertisingReminderModalContent = ({ onClose }: { onClose: (isOpen: false) => void }) => {
  const currentApp = useCurrentApp() ?? 'cm';

  return (
    <>
      <ModalHeader>Сторонняя реклама</ModalHeader>
      <ModalBody>
        {'Посети, пожалуйста, '}
        <Link
          to={`/${currentApp}/!other/advertising`}
          className="color--7 pointer text-underline"
          onClick={() => onClose(false)}
        >
          раздел Сторонней рекламы.
        </Link>
        {' Это поможет проекту jesmyl существовать.'}
        <div className="margin-gap-t">
          Перейдя по ссылке, пожалуйста, удостоверься, что в каждой рекламке прогрузилась картинка и сопровождающий
          текст. Таким образом прокрути страничку до конца и можно покидать раздел.
        </div>
        <div className="margin-gap-t">
          Если в списке рекламы присутствует неподобающий контент, пожалуйста, сделай скрин и отправь в
          jesmyl-поддержку. Такую рекламу будем скрывать)
        </div>
      </ModalBody>
    </>
  );
};
