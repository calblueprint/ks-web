import {
  getAllGAPCertifications,
  getGAPCertificationById,
  getTotalHarvestById,
  getAllTotalHarvests,
  getAllRecentHarvestLogs,
  getRecentHarvestLogById
} from './airtable/request';

export async function getAllGAPCertificationsForStatCard() {
  const AllGAPCertfications = await getAllGAPCertifications();
  return AllGAPCertfications;
}

export async function getSingleGAPCertfication(id) {
  const singleGAPCertfication = await getGAPCertificationById(id);
  return singleGAPCertfication;
}

export async function getAllTotalHarvestsForStatCard() {
  const AllHarvests = await getAllTotalHarvests();
  return AllHarvests;
}

export async function getSingleTotalHarvestById(id) {
  const singleHarvest = await getTotalHarvestById(id);
  return singleHarvest;
}

export async function getAllRecentHarvestLogsForStatCard() {
  const AllHarvests = await getAllRecentHarvestLogs();
  return AllHarvests;
}

export async function getSingleRecentHarvestLogById(id) {
  const singleRecentHarvest = await getRecentHarvestLogById(id);
  return singleRecentHarvest;
}

export default {
  getSingleGAPCertfication,
  getAllGAPCertificationsForStatCard,
  getAllTotalHarvestsForStatCard,
  getSingleTotalHarvestById,
  getAllRecentHarvestLogsForStatCard,
  getSingleRecentHarvestLogById
};
