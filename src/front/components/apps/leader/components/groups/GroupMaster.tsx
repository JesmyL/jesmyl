import { useState } from "react";
import KeyboardInput from "../../../../../complect/keyboard/KeyboardInput";
import SendButton from "../../../../../complect/SendButton";
import { leaderExer } from "../../Leader.store";
import useLeaderContexts from "../contexts/useContexts";
import SelectHumans from "../people/SelectHumans";
import LeaderGroup from "./Group";

export default function LeaderGroupMaster({
  group,
  close,
}: {
  group?: LeaderGroup;
  close: () => void;
}) {
  const [name, setName] = useState<string>(group?.name || "");

  const [addMentors, updateAddMentors] = useState<number[]>([]);
  const [delMentors, updateDelMentors] = useState<number[]>([]);
  const [addMembers, updateAddMembers] = useState<number[]>([]);
  const [delMembers, updateDelMembers] = useState<number[]>([]);

  const { ccontext } = useLeaderContexts();

  const uniq = `group master ${group?.ts}`;
  
  return (
    <div className="full-container flex column padding-giant-gap">
      <div className="flex flex-gap full-width">
        <div>Название:</div>
        <KeyboardInput
          value={group?.name}
          preferLanguage="ru"
          onInput={(value) => setName(value)}
        />
      </div>
      <SelectHumans
        uniq={uniq + "members"}
        chooseTitle={`Выбор из участников ${ccontext?.name || "контекста"}`}
        chosenPlaceholder="Поиск по участникам группы"
        chosenTitle="Список участников группы"
        excludedTitle="Лидер"
        redact
        fixedList={group?.members.map((human) => human.wid)}
        wholeList={ccontext?.members.map((human) => human.wid)}
        excludes={ccontext?.mentors.map((human) => human.wid)}
        onListsUpdate={(addList, delList) => {
          updateAddMembers(addList);
          updateDelMembers(delList);
        }}
      />

      {leaderExer.actionAccessedOrNull("ruleIsCanRedactGroupMentorList") && (
        <SelectHumans
          uniq={uniq + "mentors"}
          chooseTitle={`Выбор из участников ${ccontext?.name || "контекста"}`}
          chosenPlaceholder="Поиск по лидерам группы"
          chosenTitle="Список лидеров группы"
          excludedTitle="Участник"
          redact
          fixedList={group?.mentors.map((human) => human.wid)}
          wholeList={ccontext?.mentors.map((human) => human.wid)}
          excludes={ccontext?.members.map((human) => human.wid)}
          onListsUpdate={(addList, delList) => {
            updateAddMentors(addList);
            updateDelMentors(delList);
          }}
        />
      )}
      {(!group ||
        !!group.getChangesStack({
          name,
          contextw: 0,
          addMembers,
          addMentors,
          delMembers,
          delMentors,
        }).length) && (
          <SendButton
            title={`Опубликовать ${group ? "изменения" : "группу"}`}
            confirm
            onSuccess={() => close()}
            onSend={() => {
              if (!ccontext) return;

              if (group) {
                return group.sendChanges({
                  addMembers,
                  addMentors,
                  contextw: ccontext.wid,
                  delMembers,
                  delMentors,
                  name,
                });
              } else {
                return LeaderGroup.publicateNew({
                  name,
                  members: addMembers,
                  mentors: addMentors,
                  contextw: ccontext.wid,
                });
              }
            }}
          />
        )}
    </div>
  );
}