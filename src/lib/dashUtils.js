import {
    getAllGAPCertifications,
    getGAPCertificationById
  } from './airtable/request';
  
  export async function getAllGAPCertificationsForStatCard() {
    const AllGapCertfications = await getAllGAPCertifications();
    return AllGapCertfications;
  }
  
  export async function getSingleGapCertfication(id) {
    const singleGapCertfication = await getGAPCertificationById(id);
    return singleGapCertfication;
  }
  
  export default {
    getSingleGapCertfication,
    getAllGAPCertificationsForStatCard
  };