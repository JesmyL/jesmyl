import { useEffect, useState } from "react";
import "./Admin.scss";
import UserFace from "./complect/users/UserFace";
import useUsers from "./complect/users/useUsers";
import PhaseAdminEditorContainer from "./phase-editor-container/PhaseAdminEditorContainer";

let timeOut: any;
let updates = 0;

export default function Admin() {
  const { users } = useUsers();
  const usersUses = useUsers();
  const [, setUpdates] = useState(0);

  useEffect(() => {
    const set = () => {
      setUpdates(++updates);
      clearTimeout(timeOut);
      timeOut = setTimeout(set, 60000);
    };
    set();
    return () => clearTimeout(timeOut);
  }, []);

  return (
    <PhaseAdminEditorContainer
      topClass="admin-application"
      withoutBackButton
      headTitle="Админ"
      content={
        <>
          {users.map((user) => (
            <UserFace key={`user-${user.login}`} user={user} uses={usersUses} />
          ))}
        </>
      }
    />
  );
}
