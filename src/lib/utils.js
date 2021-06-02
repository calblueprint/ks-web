/* eslint-disable no-await-in-loop */
import moment from 'moment';
import {
  getAllFarms,
  getFarmById,
  getGAPCertificationById,
  updateFarm,
  updateGAPCertification,
  getTotalHarvestById
} from './airtable/request';

import { createRecentUpdateFromCertification } from './gapCertificationUtils';

// Helper functions

export async function getAllFarmsForKS() {
  const farms = await getAllFarms();
  return farms.filter(farm => farm.ksAffiliated);
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

export async function getTotalHarvest(id) {
  const totalHarvest = await getTotalHarvestById(id);
  return totalHarvest;
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
        createRecentUpdateFromCertification(gapDiff, newFarm, author.id);
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

export function getMonthsofYear() {
  return [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
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
  getAllFarmsForKS,
  getDateOptions,
  getPrevMonths,
  getTotalHarvest,
  updateFarmAndCertification
};
