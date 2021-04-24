/* eslint-disable no-await-in-loop */
import {
  getAllFarms,
  getFarmById,
  getAllRecentUpdates,
  getGAPCertificationById,
  getAllUsers,
  updateFarm,
  updateGAPCertification
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

export async function getGapCertificationStatus(id) {
  const status = await getGAPCertificationById(id);
  // maps certification value to an index to be compatible with select components
  getCertificationSteps().forEach(k => {
    status[`${k}Date`] = new Date(status[`${k}Date`]).toLocaleDateString(
      'en-CA'
    );
  });
  delete status.gapCertifiedDate;
  status.gapCertificationDate = new Date(
    status.gapCertificationDate
  ).toLocaleDateString('en-CA');

  return status;
}

export async function getSingleFarmAndGapCertification(id) {
  let gapStatus = false;
  let farm;
  await getSingleFarm(id).then(async res => {
    farm = res;
    if (res.gapCertificationId) {
      gapStatus = await getGapCertificationStatus(res.gapCertificationId);
    }
  });
  return [farm, gapStatus];
}

export async function getAllRecentUpdatesByUserType(userType) {
  let comments = [];
  comments = await getAllRecentUpdates();
  return comments.filter(c => c.organization.includes(userType));
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

export function getPossibleCertificationStates() {
  return [' ', 'Incomplete', 'Complete', 'Failed', 'Outdated'];
}

export function getDefaultCertificationObj() {
  const defaultGAPCertification = {};
  getCertificationSteps().forEach(step => {
    defaultGAPCertification[step] = 'Incomplete';
  });
  defaultGAPCertification.gapCertified = false;
  defaultGAPCertification.farmReferredDate = Date.now();
  return defaultGAPCertification;
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

export async function getAllGroupGapContacts() {
  const users = await getAllUsers("SEARCH('NSEVP', {User Types})");
  const ids = [];
  const names = [];
  users.forEach(u => {
    ids.push(u.id);
    names.push(u.name);
  });
  return [ids, names];
}

export function updateFarmAndCertification(
  oldFarm,
  newFarm,
  oldGapStatus,
  gapStatus
) {
  let farmDiff = Object.entries(newFarm).filter(kv => {
    const [k, v] = kv;
    return oldFarm[k] !== v;
  });
  if (farmDiff) {
    farmDiff = Object.fromEntries(farmDiff);
    updateFarm(newFarm.farmId, farmDiff);
  }

  let gapDiff = Object.entries(gapStatus).filter(kv => {
    const [k, v] = kv;
    return oldGapStatus[k] !== v;
  });
  if (gapDiff) {
    gapDiff = Object.fromEntries(gapDiff);
    updateGAPCertification(newFarm.gapCertificationId, gapDiff);
  }
}

export default {
  getSingleFarm,
  getAllFarmsForFarmSearch,
  getGapCertificationStatus,
  getAllRecentUpdatesByUserType,
  getCertificationLabels,
  getCertificationSteps,
  mapCertificationStepsToLabels,
  getDefaultCertificationObj,
  getPossibleCertificationStates,
  updateFarmAndCertification
};
