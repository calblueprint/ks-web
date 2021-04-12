import {
  getAllGAPCertifications,
  getGAPCertificationById,
  getTotalHarvestById,
  getAllTotalHarvests,
  getAllRecentHarvestLogs,
  getRecentHarvestLogById
} from './airtable/request';

export async function getAllGAPCertificationsForStatCard() {
  const AllGapCertfications = await getAllGAPCertifications();
  return AllGapCertfications;
}

export async function getSingleGapCertfication(id) {
  const singleGapCertfication = await getGAPCertificationById(id);
  return singleGapCertfication;
}

// export async function getAllTotalHarvestsForStatCard() {
//   const AllHarvests = await getAllTotalHarvests();
//   return AllHarvests;
// }

// export async function getSingleTotalHarvestById(id) {
//   const singleGapCertfication = await getTotalHarvestById(id);
//   return singleGapCertfication;
// }

// export async function getAllTotalHarvestsForStatCard() {
//   const AllHarvests = await getAllTotalHarvests();
//   return AllHarvests;
// }

// export async function getSingleGapCertfication(id) {
//   const singleGapCertfication = await getGAPCertificationById(id);
//   return singleGapCertfication;
// }

export default {
  getSingleGapCertfication,
  getAllGAPCertificationsForStatCard
};
