import {
  createManyRecentUpdates,
  getAllUsers,
  getAllRecentUpdates,
  getAllGAPCertifications
} from './airtable/request';

const certificationLabelToCompletedMessage = {
  farmReferred: 'Referred FARM to the Group GAP program.',
  farmApplied: 'FARM has applied to the Group GAP Program.',
  farmAccepted: 'Accepted FARM to the Group GAP Program.',
  farmFoodSafetyPlan: 'FARM completed the Farm Food Safety Program',
  riskAssessment: 'FARM completed Risk Assessment.',
  mockRecall: 'FARM completed Mock Recall.',
  internalAudit1: 'FARM completed their first internal audit',
  internalAudit2: 'FARM completed their second internal audit',
  gapCertified: 'FARM is successfully GAP certified!'
};

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

export function getPossibleCertificationStates() {
  return [' ', 'Incomplete', 'Complete', 'Failed', 'Outdated'];
}

export function getDefaultCertificationObj() {
  const defaultGAPCertification = {};
  getCertificationSteps().forEach(step => {
    defaultGAPCertification[step] = 'Incomplete';
  });
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

export async function getAllGAPCertificationsForKS() {
  const GAPCertifications = await getAllGAPCertifications();
  return GAPCertifications.filter(
    gap => gap.ksAffiliated && gap.ksAffiliated[0]
  );
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

export function createRecentUpdateFromCertification(
  gapCertificationChanges,
  farm,
  authorId
) {
  const recentUpdates = [];
  Object.entries(gapCertificationChanges).forEach(kv => {
    const [k, v] = kv;
    if (v === 'Complete') {
      let message = certificationLabelToCompletedMessage[k];
      message = message.replace('FARM', farm.farmName);
      console.log(message);
      recentUpdates.push({
        message,
        authorId,
        farmId: farm.farmId
      });
    }
  });
  const res = createManyRecentUpdates(recentUpdates);
  return res;
}

export async function getAllRecentUpdatesByUserType(userType) {
  let comments = [];
  comments = await getAllRecentUpdates();
  if (userType === 'NSEVP') {
    return comments;
  }
  return comments.filter(
    c => c.ksAffiliatedfromFarm && c.ksAffiliatedfromFarm[0] === true
  );
}

export default {
  getCertificationLabels,
  getCertificationSteps,
  getPossibleCertificationStates,
  getDefaultCertificationObj,
  mapCertificationStepsToLabels,
  getAllGroupGapContacts,
  getAllRecentUpdatesByUserType,
  getAllGAPCertificationsForKS
};
