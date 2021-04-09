/* eslint-disable no-await-in-loop */
import {
  getAllFarms,
  getFarmById,
  getUserById,
  getAllRecentUpdates
} from './airtable/request';

// Helper functions

// TODO: Nick is too lazy to read on the proper way to export this function
// I don't think I should be using the `default` keyword
// Returns a list of farms to render for FarmSearch page.
export async function getAllFarmsForFarmSearch() {
  const farms = await getAllFarms();
  return farms;
}

export async function getSingleFarm(id) {
  const singleFarm = await getFarmById(id);
  return singleFarm;
}

export async function getAllRecentUpdatesAndUsers(userType) {
  let comments = [];
  comments = await getAllRecentUpdates();

  for (let i = 0; i < comments.length; i += 1) {
    comments[i].author = await getUserById(comments[i].authorId);
    console.log(comments[i].author);
  }
  console.log(userType);
  return comments.filter(c => c.organization.includes(userType));
}

export default {
  getSingleFarm,
  getAllFarmsForFarmSearch,
  getAllRecentUpdatesAndUsers
};
