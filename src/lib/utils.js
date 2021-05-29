/* eslint-disable no-await-in-loop */
import moment from 'moment';
import {
  getAllFarms,
  getFarmById,
  getAllRecentUpdates,
  getAllGAPCertifications,
  getGAPCertificationById,
  getAllUsers,
  updateFarm,
  updateGAPCertification
} from './airtable/request';

// Helper functions

export async function getAllFarmsForKS() {
  const farms = await getAllFarms();
  return farms.filter(farm => farm.ksAffiliated);
}

export async function getAllGAPCertificationsForKS() {
  const GAPCertifications = await getAllGAPCertifications();
  return GAPCertifications.filter(
    gap => gap.ksAffiliated && gap.ksAffiliated[0]
  );
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

export async function getSingleFarmAndGapCertification(id) {
  let gapStatus = false;
  let farm;
  await getFarmById(id).then(async res => {
    farm = res;
    if (res.gapCertificationId) {
      gapStatus = await getGAPCertificationById(res.gapCertificationId);
    }
  });
  return [farm, gapStatus];
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

export async function updateFarmAndCertification(
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
    updateFarm(newFarm.farmId, farmDiff).catch(e => {
      console.error(e);
      return false;
    });
  }

  let gapDiff = Object.entries(gapStatus).filter(kv => {
    const [k, v] = kv;
    return oldGapStatus[k] !== v;
  });
  if (gapDiff) {
    gapDiff = Object.fromEntries(gapDiff);
    updateGAPCertification(newFarm.gapCertificationId, gapDiff).catch(e => {
      console.error(e);
      return false;
    });
  }
  return true;
}

export function getDateOptions() {
  return [
    'Last 60 Days',
    'Year to Date',
    'Last Year',
    'This Year Q1',
    'This Year Q2',
    'This Year Q3',
    'This Year Q4'
  ];
}

/* eslint-disable no-unused-vars */
export function getPrevMonths(n) {
  const date = new Date();
  const m = moment(date);
  m.subtract(n, 'months');

  return [...Array(n)].map(_i => m.add(1, 'months').format('MMM[\n]YYYY'));
}

export default {
  getDateOptions,
  getPrevMonths,
  getAllGAPCertificationsForKS,
  getAllRecentUpdatesByUserType,
  getCertificationLabels,
  getCertificationSteps,
  mapCertificationStepsToLabels,
  getDefaultCertificationObj,
  getPossibleCertificationStates,
  updateFarmAndCertification
};
