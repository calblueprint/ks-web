import {
  // getProjectGroupById,
  getOwnerById
  // getSolarProjectsByIds
} from '../airtable/request';
import { store } from './store';
import {
  saveUserData,
  deauthenticateAndClearUserData,
  setLoadingForUserData
} from './userDataSlice';

// Function takes in an ownerId and fetches the latest owner object and all associated user data
const refreshUserData = async (ownerId, loadSilently = false) => {
  if (!loadSilently) {
    // Save loading status to Redux
    store.dispatch(setLoadingForUserData());
  }

  // Fetch latest version of owner
  const owner = await getOwnerById(ownerId);

  // Fetch all the data

  // let projectGroup = {};
  // let solarProjects = [];

  // if (owner.projectGroupId) {
  //   projectGroup = await getProjectGroupById(owner.projectGroupId);

  //   const { solarProjectIds } = projectGroup;
  //   if (solarProjectIds) {
  //     solarProjects = await getSolarProjectsByIds(solarProjectIds);
  //   }
  // }

  // Save fetched user data to the redux store
  const userData = {
    owner
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
