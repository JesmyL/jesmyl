import { ReactNode, useEffect, useState } from "react";
import EvaIcon from "../../../../../../complect/eva-icon/EvaIcon";
import KeyboardInput from "../../../../../../complect/keyboard/KeyboardInput";
import modalService from "../../../../../../complect/modal/Modal.service";
import useIsRedactArea from "../../../complect/useIsRedactArea";
import {
  ContextFieldBlankExportable,
  contextFieldBlankTypeDictAliases
} from "./Blanks.model";

export default function ContextFieldBlank({
  blank,
  redact,
  addition,
  onRedact,
  onDelete,
  onEditStart,
}: {
  blank: ContextFieldBlankExportable;
  redact?: boolean;
  addition?: boolean;
  onRedact?: (blank: ContextFieldBlankExportable) => void;
  onDelete?: () => void;
  onEditStart?: () => void;
}) {
  const [isInit, setIsInit] = useState(true);
  const [key, setKey] = useState(blank.key);
  const [name, setName] = useState(blank.name);
  const [def, setDef] = useState(blank.def);
  const [value, setValue] = useState(blank.value);
  const [type] = useState(blank.type);
  const { editIcon, isRedact } = useIsRedactArea(
    true,
    redact,
    null,
    onEditStart
  );

  let nameNode;
  let keyNode;
  let defNode;
  let valueNode;

  if (isRedact) {
    nameNode = <KeyboardInput
      onInput={(value) => setName(value)}
      value={name}
      multiline
    />;
    defNode = <KeyboardInput
      onInput={(value) => setDef(value)}
      value={def}
      multiline
    />;
    valueNode = <KeyboardInput
      onInput={(value) => setValue(value)}
      value={value}
      multiline
    />;

    if (redact && addition) {
      keyNode = <KeyboardInput
        preferLanguage="en"
        onInput={(value) => setKey(value)}
        value={key}
        multiline
      />;
    }
  } else {
    nameNode = name;
    defNode = def;
    valueNode = value;
  }

  const net: [string, ReactNode][] = [
    ["Ключ", keyNode ?? key],
    ["Тип значения", contextFieldBlankTypeDictAliases[blank.type]],
    ["Название", nameNode],
    ["Значение по умолчанию", defNode],
    ["Конечное значение", valueNode],
  ];

  useEffect(() => {
    if (isInit) {
      setIsInit(false);
      return;
    }
    onRedact?.({ name, def, type, value, key });
  }, [name, def, type, value, key]);

  return (
    <div className="margin-gap padding-gap border--3 relative">
      <div className="flex flex-end full-width">
        {addition ? (
          <EvaIcon
            name="close"
            onClick={async () => {
              if (await modalService.confirm(`Удалить бланк ${name || key}?`))
                onDelete?.();
            }}
          />
        ) : (
          <span className="absolute pos-right pos-top margin-gap">{editIcon}</span>
        )}
      </div>
      {net.map(([title, node]) => {
        return (
          <div className="flex flex-gap margin-gap-v">
            <span className="nowrap">{title}</span>
            <span className="color--3 user-select full-width">
              {node || " - "}
            </span>
          </div>
        );
      })}
    </div>
  );
}