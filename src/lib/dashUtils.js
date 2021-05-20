import {
  getGAPCertificationById,
  getTotalHarvestById,
  getRecentHarvestLogById
} from './airtable/request';

export async function getSingleGAPCertfication(id) {
  const singleGAPCertfication = await getGAPCertificationById(id);
  return singleGAPCertfication;
}

export async function getSingleTotalHarvestById(id) {
  const singleHarvest = await getTotalHarvestById(id);
  return singleHarvest;
}

export async function getSingleRecentHarvestLogById(id) {
  const singleRecentHarvest = await getRecentHarvestLogById(id);
  return singleRecentHarvest;
}

export default {
  getSingleGAPCertfication,
  getSingleTotalHarvestById,
  getSingleRecentHarvestLogById
};
