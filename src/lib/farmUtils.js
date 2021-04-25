/* eslint-disable no-await-in-loop */
import {
  getAllFarms,
  getFarmById,
  getAllRecentUpdates,
  getGAPCertificationById,
  getRecentHarvestLogById,
  getTotalHarvestById
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

export async function getGapCertificationStatus(id) {
  const status = await getGAPCertificationById(id);
  return status;
}

export async function getHarvestLog(id) {
  const harvestLog = await getRecentHarvestLogById(id);
  return harvestLog;
}

export async function getTotalHarvest(id) {
  const totalHarvest = await getTotalHarvestById(id);
  return totalHarvest;
}

export async function getAllRecentUpdatesByUserType(userType) {
  let comments = [];
  comments = await getAllRecentUpdates();
  return comments.filter(c => c.organization.includes(userType));
}

export function getCertificationSteps() {
  return [
    'farmReferred',
    'farmApplied',
    'farmAccepted',
    'farmFoodSafetyPlan',
    'riskAssessment',
    'mockRecall',
    'internalAudit1',
    'internalAudit2',
    'gapCertified'
  ];
}

export function getCertificationLabels() {
  return [
    'Farm\nReferred',
    'Farm\nApplied',
    'Farm\nAccepted',
    'Farm Food\nSafety Plan',
    'Risk\nAssessment',
    'Mock\nRecall',
    'Internal\nAudit (1)',
    'Internal\nAudit (2)',
    'Group GAP\nCertified!'
  ];
}

export function mapCertificationStepsToLabels() {
  const keys = getCertificationSteps();
  const values = getCertificationLabels();

  const map = {};
  keys.forEach((key, idx) => {
    map[key] = values[idx];
  });
  return map;
}

export default {
  getSingleFarm,
  getAllFarmsForFarmSearch,
  getGapCertificationStatus,
  getAllRecentUpdatesByUserType,
  getCertificationLabels,
  getCertificationSteps,
  mapCertificationStepsToLabels,
  getHarvestLog,
  getTotalHarvest
};
