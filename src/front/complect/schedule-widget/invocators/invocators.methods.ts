import { SokiInvocatorClient } from 'front/SokiInvocator.client';
import { SchSokiInvocatorMethods } from 'shared/api/invocators/schedules/invocators.model';

class SchSokiInvocatorClient extends SokiInvocatorClient<SchSokiInvocatorMethods> {}
export const schSokiInvocatorClient = new SchSokiInvocatorClient('SchSokiInvocatorClient', {
  oooooooooooooooooooooooooooooooooooooo: true,

  create: true,
  remove: true,
  rename: true,
  setTopic: true,
  setDescription: true,
  setStartTime: true,
  addDay: true,
  addUsersByExcel: true,
  setUserFio: true,
  putSharedPhotos: true,
  getSharedPhotos: true,
  setUserRights: true,
  setFirstDayAsTech: true,
  setTgChatRequisites: true,
  toggleIsTgInform: true,
  setTgInformTime: true,

  createRole: true,
  setRoleIcon: true,
  setRoleTitle: true,
  addRoleCategory: true,
  setRoleCategoryTitle: true,
  setCategoryForRole: true,
  setRoleUser: true,
  makeFreeRole: true,

  createListCategory: true,
  setListCategoryTitle: true,
  setCategoryMembersTitle: true,
  setCategoryMentorsTitle: true,
  setListCategoryIcon: true,
  createListCategoryUnit: true,
  setListUnitDescription: true,
  setListUnitTitle: true,
  addUserListUnitMembership: true,
  removeUserListUnitMembership: true,

  addGameCriteria: true,
  setGameCriteriaTitle: true,
  setGameSortedDict: true,
  toggleGameStrikedUser: true,
  addGame: true,
  setGameTeams: true,
  setGameTitle: true,
});
