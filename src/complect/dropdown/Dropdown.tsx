import { useEffect, useState } from "react";
import { DropdownItem, DropdownProps } from "./Dropdown.model";
import "./Dropdown.scss";

export default function Dropdown<Item extends DropdownItem>(props: DropdownProps<Item>) {
  const [selectedItem, setItem] = useState(
    props.items.find((item) => item.id === props.id)
  );
  const [isDropped, setDropped] = useState(false);

  useEffect(() => {
    const close = () => setDropped(false);
    const onKeydown = (event: KeyboardEvent) => {
      if (isDropped && event.key === "Escape") {
        event.stopPropagation();
        close();
      }
    };
    document.addEventListener("click", close);
    document.addEventListener("keydown", onKeydown);

    return () => {
      document.removeEventListener("click", close);
      document.removeEventListener("keydown", onKeydown);
    };
  }, [isDropped]);

  return (
    <div
      className={`dropdown-selector ${isDropped ? "dropped" : ""}`}
      onClick={(event) => {
        event.stopPropagation();
        setDropped(!isDropped);
      }}
    >
      <div className="selected-item">
        {selectedItem?.title || (
          <span className="not-selected">Не выбрано</span>
        )}
      </div>
      <div className="item-list">
        {props.items.map((item) => {
          return (
            <div
              key={`dropdown-item ${item.id}`}
              className="list-item"
              onClick={(event) => {
                event.stopPropagation();
                setDropped(false);
                setItem(item);
                props.onSelect?.(item);
              }}
            >
              {item.title}
            </div>
          );
        })}
      </div>
    </div>
  );
}