import { useEffect, useState } from "react";
import useKeyboard from "../../../../../../../../complect/keyboard/useKeyboard";
import modalService from "../../../../../../../../complect/modal/Modal.service";
import { EditableCom } from "../../EditableCom";

export default function TextAreaRedactor({
  ccoln,
  com,
  col,
  coli,
  onChange,
  onInsert,
}: {
  ccoln: "texts" | "chords";
  com: EditableCom;
  coli: number;
  col: string;
  onChange: (value: string) => void;
  onInsert: (value: string) => void;
}) {
  const [currValue, setValue] = useState(col || "");
  const istcoln = ccoln === "texts";

  const input = useKeyboard()(`redact ${ccoln} #${coli} of com ${com.wid}`, {
    multiline: true,
    closeButton: false,
    className: `cleared-input com-editor-textarea full-width no-resize`,
    initialValue: currValue,
    setIsUnknownSymbols: (char) => ["\r", "\t"].indexOf(char) > -1,
    preferLanguage: ccoln === "texts" ? (com.langi ? "ua" : "ru") : "en",
    autofocus: !currValue,
    onChange: async (value) => {
      const prev = currValue;
      const curr = value;

      if (prev !== curr) {
        const valnum = curr.split("").reduce((p, c) => p + c.charCodeAt(0), 0);
        const diffnum = prev.split("").reduce((p, c) => p + c.charCodeAt(0), 0);
        const letter = String.fromCharCode(valnum - diffnum);
        const isNewBlock = letter === "\n" && prev[prev.length - 1] === "\n";

        if (isNewBlock) {
          const txt = istcoln ? "Текстовый блок" : "блок Аккордов";
          if (!(await modalService.confirm(`Добавить новый ${txt}?`))) return;

          onInsert("");
        }
        onChange(isNewBlock ? curr.replace(/\n+$/, "") : curr);
        setValue(curr);
      }
    },
    onPaste: (value) => {
      com.parseBlocksFromClipboard(value, (blocks): boolean => {
        if (blocks.length > 1) {
          if (currValue !== "") {
            return false;
          }
        } else return false;

        return true;
      });
    },
  });

  useEffect(() => setValue(col), [col]);
  useEffect(() => {
    input.value(currValue);
  }, [input, currValue]);

  return <>{input.node}</>;
}
