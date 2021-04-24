/* eslint-disable no-await-in-loop */
import moment from 'moment';
import {
  getAllFarms,
  getFarmById,
  getAllRecentUpdates,
  getGAPCertificationById
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
  getSingleFarm,
  getAllFarmsForFarmSearch,
  getGapCertificationStatus,
  getAllRecentUpdatesByUserType,
  getCertificationLabels,
  getCertificationSteps,
  mapCertificationStepsToLabels,
  getDefaultCertificationObj
};
