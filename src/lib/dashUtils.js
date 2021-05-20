import {
  getGAPCertificationById,
  getAllGAPCertifications,
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

export async function getAllGAPCertificationsForKS() {
  const GAPCertifications = await getAllGAPCertifications();
  return GAPCertifications.filter(
    gap => gap.ksAffiliated && gap.ksAffiliated[0]
  );
}

export default {
  getSingleGAPCertfication,
  getSingleTotalHarvestById,
  getSingleRecentHarvestLogById,
  getAllGAPCertificationsForKS
};
