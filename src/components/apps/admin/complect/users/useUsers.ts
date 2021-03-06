import { useDispatch, useSelector } from "react-redux";
import { adminStorage } from "../../../../../shared/jstorages";
import { RootState } from "../../../../../shared/store";
import { UserMessage } from "../../../../index/Index.model";
import { IExportableUser, UserVisits } from "../../Admin.model";
import { setCurrentUser, updateUserList, updateUserVisits } from "../../Admin.store";
import useAdminNav from "../../useAdminNav";
import { User } from "./User";

let localUsers: User[] = [];
let currentUser: User | und;

export default function useUsers() {
    const dispatch = useDispatch();
    const userLogin = useSelector((state: RootState) => state.admin.currentUser);
    const { goTo } = useAdminNav();
    const visits = useSelector((state: RootState) => state.admin.userVisits);
    const userMessages = useSelector((state: RootState) => state.index.userMessages);
    const now = Date.now();

    if (!currentUser) currentUser = localUsers.find(user => user.login === userLogin);

    const sortUsers = () => {
        localUsers.sort((a, b) => visits[b.login] - visits[a.login]);
    };

    const ret = {
        users: localUsers,
        currentUser,
        visits,
        getMessages: (user: User): UserMessage[] => {
            return userMessages.filter((message) => message.login === user.login);
        },
        updateUserList: (list: IExportableUser[]) => {
            localUsers = updateUsers(list);
            sortUsers();
            dispatch(updateUserList(list));
        },
        updateVisits: (visits: UserVisits) => {
            dispatch(updateUserVisits(visits));
            sortUsers();
        },
        navToUser: (user: User) => {
            goTo('user');
            ret.setCurrentUser(user);
        },
        setCurrentUser: (user: User) => {
            currentUser = user;
            dispatch(setCurrentUser(user.login));
            adminStorage.set('currentUser', user.login);
        },
        visit: (user: User) => {
            const visited = visits[user.login];
            const diff = now - visited;

            return diff < 60000
                ? '?? ????????'
                : diff > inMonth * 3
                    ? '???????????? 3 ??????.'
                    : diff > inMonth
                        ? '???????????? ??????.'
                        : diff > inWeek * 3
                            ? '???????????? 3 ??????.'
                            : diff > inWeek
                                ? '???????????? ??????.'
                                : diff > inDay * 3
                                    ? '???????????? 3??.'
                                    : diff > inDay
                                        ? '???????????? ??????????'
                                        : diff > inHour * 17
                                            ? '????. 17??. ??????????'
                                            : diff > inHour * 12
                                                ? '????????????'
                                                : diff > inHour * 5
                                                    ? '???????????? 5 ??.'
                                                    : diff > inHour * 3
                                                        ? '???????????? 3 ??.'
                                                        : diff > inHour
                                                            ? '?????????? ????????'
                                                            : diff > inMin * 30
                                                                ? '??????????????'
                                                                : diff > inMin * 5
                                                                    ? '??????????????'
                                                                    : '???????????? ??????';
        },
    };

    return ret;
}

const updateUsers = (val: IExportableUser[]) => localUsers = val.map(user => new User(user));
adminStorage.listen('userList', 'main', updateUsers);


const inSec = 1000;
const inMin = inSec * 60;
const inHour = inMin * 60;
const inDay = inHour * 24;
const inWeek = inDay * 7;
const inMonth = inDay * 30;