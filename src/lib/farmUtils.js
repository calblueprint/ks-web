/* eslint-disable no-await-in-loop */
import { getAllFarms, getFarmById } from './airtable/request';

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

export function getCertifcationSteps() {
  return [
    'Farm Referred',
    'Farm Applied',
    'Farm Accepted',
    'Food Safety Plan Complete',
    'Risk Assessment',
    'Mock Recall Complete',
    'Internal Audit Complete (1)',
    'Internal Audit Complete (2)',
    'Group GAP Certified!'
  ];
}

export default {
  getSingleFarm,
  getAllFarmsForFarmSearch,
  getCertifcationSteps
};
