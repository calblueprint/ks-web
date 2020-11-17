import {
  // getProjectGroupById,
  getUserById
  // getSolarProjectsByIds
} from '../airtable/request';
import { store } from './store';
import {
  saveUserData,
  deauthenticateAndClearUserData,
  setLoadingForUserData
} from './userDataSlice';

// Function takes in an userId and fetches the latest user object and all associated user data
const refreshUserData = async (userId, loadSilently = false) => {
  if (!loadSilently) {
    // Save loading status to Redux
    store.dispatch(setLoadingForUserData());
  }

  // Fetch latest version of user
  const user = await getUserById(userId);

  // Fetch all the data

  // let projectGroup = {};
  // let solarProjects = [];

  // if (user.projectGroupId) {
  //   projectGroup = await getProjectGroupById(user.projectGroupId);

  //   const { solarProjectIds } = projectGroup;
  //   if (solarProjectIds) {
  //     solarProjects = await getSolarProjectsByIds(solarProjectIds);
  //   }
  // }

  // Save fetched user data to the redux store
  const userData = {
    user
    // projectGroup,
    // solarProjects
  };
  store.dispatch(saveUserData(userData));
};

const clearUserData = () => {
  store.dispatch(deauthenticateAndClearUserData());
};

const startLoading = () => {
  store.dispatch(setLoadingForUserData());
};

export { refreshUserData, clearUserData, startLoading };
