/* eslint-disable no-await-in-loop */
import moment from 'moment';
import {
  getAllFarms,
  getFarmById,
  updateFarm,
  updateGAPCertification
} from '@lib/airtable/request';
import {
  createRecentUpdateFromCertification,
  getGapCertificationStatus
} from './gapCertificationUtils';

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

export async function updateFarmAndCertification(
  oldFarm,
  newFarm,
  oldGapStatus,
  gapStatus,
  author
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
    updateGAPCertification(newFarm.gapCertificationId, gapDiff)
      .then(() => {
        createRecentUpdateFromCertification(
          gapDiff,
          newFarm.farmName,
          author.id
        );
      })
      .catch(e => {
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
  getSingleFarm,
  getAllFarmsForFarmSearch,
  updateFarmAndCertification
};
