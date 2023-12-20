import { LocalSokiAuth } from "../../../../../../models";
import useAuth from "../../../../../index/useAuth";
import { useAliasCurrentTeamNaked } from "./current-team";
import { useAliasSpeakerLogin } from "./speaker-login";


export const useAliasIsMyTeam = () => useAliasIsMyTeamByAuth(useAuth());

export const useAliasIsMyTeamByAuth = (auth: LocalSokiAuth) => {
    const team = useAliasCurrentTeamNaked('team');

    return auth.login && team?.members.includes(auth.login);;
};

export const useAliasIsMySpeech = () => {
    const auth = useAuth();
    const login = useAliasSpeakerLogin();

    return auth ? auth.login === login : null;
};
