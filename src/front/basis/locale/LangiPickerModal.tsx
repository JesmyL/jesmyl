import { currentLangiAtom, translateBase, translateDynamic } from '#basis/locale';
import { isLangiPickerOpenAtom, localeLastModifiedAtAtom } from '#basis/state/locale';
import { Button } from '#shared/components/ui/button';
import { Modal, ModalBody, ModalFooter, ModalHeader } from '#shared/ui/modal';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { useAtomValue } from 'atomaric';
import { Langi } from 'shared/api';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { DynLocaleKey } from 'shared/model/+locale/_DynLocaleKey';

const langis = [Langi.Ru, Langi.Ua, Langi.Kz, Langi.En];

/** Dictionaries are cached by a language-independent key, so a full refresh makes the server resend them. */
const reloadWithLangi = (langi: Langi | nil) => {
  if (langi == null) currentLangiAtom.reset();
  else currentLangiAtom.set(langi);

  localeLastModifiedAtAtom.reset();

  window.location.reload();
};

export const LangiPickerModal = () => {
  const currentLangi = useAtomValue(currentLangiAtom);
  const isSystemLangi = currentLangiAtom.isInitialValue();
  const translateCurrent = translateDynamic(currentLangi);

  const langItems = langis
    .map(langi => ({
      langi,
      title: translateDynamic(langi)(it => it[DynLocaleKey.Lang][langi]),
      description: translateCurrent(it => it[DynLocaleKey.Lang][langi]),
    }))
    .sort((a, b) => a.title.localeCompare(b.title));

  return (
    <Modal openAtom={isLangiPickerOpenAtom}>
      <ModalHeader>{translateBase(BaseLocaleKey.AppLanguage)}</ModalHeader>
      <ModalBody className="flex flex-col gap-2">
        {langItems.map(({ langi, title, description }) => (
          <Button
            key={langi}
            className="w-full h-auto justify-start text-left gap-3 py-2"
            onClick={() => (langi === currentLangi ? isLangiPickerOpenAtom.reset() : reloadWithLangi(langi))}
          >
            <LazyIcon icon="Flag03" />
            <span className="flex custom-align-items min-w-0 flex-col items-start">
              <span className="ellipsis max-w-full">{title}</span>
              <span className="ellipsis max-w-full text-xs opacity-60">{description}</span>
            </span>
            {langi !== currentLangi || (
              <LazyIcon icon="CheckmarkCircle01" className={`ml-auto${isSystemLangi ? ' opacity-50' : ''}`} />
            )}
          </Button>
        ))}
      </ModalBody>
      <ModalFooter>
        <Button onClick={() => reloadWithLangi(null)}>
          {translateBase(BaseLocaleKey.SystemLanguage)}
        </Button>
      </ModalFooter>
    </Modal>
  );
};
