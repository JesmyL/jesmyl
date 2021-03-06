import useAbsoluteBottomPopup from "../../../../../complect/absolute-popup/useAbsoluteBottomPopup";
import EvaIcon from "../../../../../complect/eva-icon/EvaIcon";
import PhaseAdminEditorContainer from "../../phase-editor-container/PhaseAdminEditorContainer";
import UserMore from "./UserMore";
import useUsers from "./useUsers";

export default function TheUser() {
  const { currentUser, getMessages } = useUsers();
  const { openAbsoluteBottomPopup } = useAbsoluteBottomPopup();

  if (!currentUser) return null;

  return (
    <PhaseAdminEditorContainer
      topClass="user-application"
      headTitle={`Пользователь - ${currentUser.name}`}
      content={
        <>
          <div className="flex margin-gap">
            Уровень доступа - {currentUser.level}
          </div>
          <div className="">Сообщения от пользователя</div>
          <div className="messages-box">
            {getMessages(currentUser).map((message) => (
              <div
                key={`message-${message.w}`}
                className="message flex between"
              >
                <span>{message.message}</span>
                <EvaIcon
                  name="more-vertical"
                  className="pointer"
                  onClick={() => {
                    openAbsoluteBottomPopup(<UserMore message={message} />);
                  }}
                />
              </div>
            ))}
          </div>
        </>
      }
    />
  );
}
