import { mylib } from '#shared/lib/my-lib';
import { excel2jsonParserBox } from '#shared/lib/parseExcel2Json';
import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import { useToast } from '#shared/ui/modal/useToast';
import { SendButton } from '#shared/ui/sends/send-button/SendButton';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { useScheduleScopePropsContext } from '#widgets/schedule/complect/lib/contexts';
import { useScheduleWidgetRightsContext } from '#widgets/schedule/contexts';
import { schUsersSokiInvocatorClient } from '#widgets/schedule/invocators/invocators.methods';
import { useEffect, useMemo, useRef, useState } from 'react';

interface Props {
  close: () => void;
}

const defExcludedFios = new Set<string>();

export function ScheduleWidgetUserAddByExcelContent({ close }: Props) {
  const rights = useScheduleWidgetRightsContext();
  const userFios = useMemo(
    () => rights.schedule.ctrl.users.reduce((set, user) => (user.fio ? set.add(user.fio) : set), new Set<string>()),
    [rights.schedule.ctrl.users],
  );
  const scheduleScopeProps = useScheduleScopePropsContext();

  const inputRef = useRef<HTMLInputElement>(null);
  const toast = useToast();
  const [wetUsers, setWetUsers] = useState<Record<string, string>[] | null>(null);
  const [titles, setTitles] = useState<string[]>([]);
  const [nameField, setNameField] = useState<string | null>(null);
  const [lastNameField, setLastNameField] = useState<string | null>(null);
  const [noteField, setNoteField] = useState<string | null>(null);
  const hiddenIds = useMemo(() => [noteField, lastNameField, nameField], [lastNameField, nameField, noteField]);
  const dropdownItems = useMemo(() => titles.map(id => ({ id, title: id })), [titles]);
  const [excludedFios, setExcludedFios] = useState(defExcludedFios);

  const [userList, existsUsers]: [{ fio: string }[] | null, string[] | null] = useMemo(() => {
    if (nameField == null || wetUsers == null) return [null, null];
    const usersSet = new Set<string>();
    const existsUsersSet = new Set<string>();

    wetUsers.forEach(wetUser => {
      const fio =
        wetUser[nameField] &&
        wetUser[nameField].trim() +
          (lastNameField && wetUser[lastNameField] ? ` ${wetUser[lastNameField].trim()}` : '') +
          (noteField && wetUser[noteField] ? ` (${wetUser[noteField].trim()})` : '');

      if (!fio) return;
      if (userFios.has(fio)) {
        existsUsersSet.add(fio);
        return;
      }

      usersSet.add(fio);
    });

    return [Array.from(usersSet).map(fio => ({ fio })), Array.from(existsUsersSet)];
  }, [lastNameField, nameField, noteField, userFios, wetUsers]);

  const resultUsers = useMemo(() => userList?.filter(user => !excludedFios.has(user.fio)), [excludedFios, userList]);

  useEffect(() => {
    if (inputRef.current === null) return;
    const inputNode = inputRef.current;

    return hookEffectLine()
      .addEventListener(inputNode, 'change', () => {
        if (!inputNode.files?.[0]) return;
        const file = inputNode.files[0];
        inputNode.value = null!;

        (async () => {
          try {
            const parser = await excel2jsonParserBox();
            const wetUsers = await parser(file);

            setWetUsers(wetUsers);
            const titlesSet = new Set<string>();

            wetUsers.forEach(wetUser => mylib.keys(wetUser).forEach(name => titlesSet.add(name)));

            setTitles(Array.from(titlesSet));
          } catch (error) {
            toast('' + error, { mood: 'ko' });
          }
        })();
      })
      .effect();
  }, [toast]);

  if (wetUsers === null)
    return (
      <>
        <h3>Файл Excel</h3>
        <p>
          <input
            ref={inputRef}
            type="file"
            accept=".xls, .xlsx"
          />
        </p>
      </>
    );

  return (
    <>
      <div>
        <h3>Имя</h3>
        <Dropdown
          id={nameField}
          items={dropdownItems}
          onSelectId={setNameField}
          hiddenIds={hiddenIds}
        />
        <h3>Фамилия</h3>
        <Dropdown
          id={lastNameField}
          items={dropdownItems}
          onSelectId={setLastNameField}
          hiddenIds={hiddenIds}
          nullTitle="Не выбирать"
        />
        <h3>(Примечание)</h3>
        <Dropdown
          id={noteField}
          items={dropdownItems}
          onSelectId={setNoteField}
          hiddenIds={hiddenIds}
          nullTitle="Не выбирать"
        />
        <div>
          {!!userList?.length && nameField && (
            <>
              <h3>Сформированный список{resultUsers && <> ({resultUsers.length} уч)</>}:</h3>
              {userList.map((user: { fio: string }) => {
                return (
                  <div
                    key={user.fio}
                    className="flex flex-gap margin-gap-v"
                  >
                    <span className={'' + (excludedFios.has(user.fio) ? ' text-strike' : '')}>{user.fio}</span>
                    {excludedFios.has(user.fio) ? (
                      <LazyIcon
                        icon="LinkBackward"
                        className="pointer color--ok"
                        onClick={() => excludedFios.delete(user.fio) && setExcludedFios(new Set(excludedFios))}
                      />
                    ) : (
                      <LazyIcon
                        icon="Cancel01"
                        className="pointer color--ko"
                        onClick={() => setExcludedFios(new Set(excludedFios.add(user.fio)))}
                      />
                    )}
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
      <div className="flex center margin-big-gap">
        <SendButton
          disabled={!resultUsers?.length}
          title="Загрузить список"
          onSuccess={close}
          onSend={() =>
            schUsersSokiInvocatorClient.addUsersByExcel({ props: scheduleScopeProps, users: resultUsers ?? [] })
          }
        />
      </div>
      {!existsUsers?.length || (
        <>
          <h3>Ранее добавленные участники</h3>
          {existsUsers?.map(fio => <div key={fio}>{fio}</div>)}
        </>
      )}
    </>
  );
}
