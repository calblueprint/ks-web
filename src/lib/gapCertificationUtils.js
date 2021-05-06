import {
  createManyRecentUpdates,
  getAllUsers,
  getGAPCertificationById,
  getAllRecentUpdates
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

export async function getGapCertificationStatus(id) {
  const status = await getGAPCertificationById(id);
  return status;
}

export function createRecentUpdateFromCertification(
  gapCertificationChanges,
  farmName,
  authorId
) {
  const recentUpdates = [];
  Object.entries(gapCertificationChanges).forEach(kv => {
    const [k, v] = kv;
    if (v === 'Complete') {
      let message = certificationLabelToCompletedMessage[k];
      message = message.replace('FARM', farmName);
      console.log(message);
      console.log(farmName);
      // todo decide if organization should be both
      recentUpdates.push({
        message,
        authorId,
        organization: ['KS', 'NSEVP']
      });
    }
  });
  const res = createManyRecentUpdates(recentUpdates);
  return res;
}

export async function getAllRecentUpdatesByUserType(userType) {
  let comments = [];
  comments = await getAllRecentUpdates();
  return comments.filter(c => c.organization.includes(userType));
}

export default {
  getCertificationLabels,
  getCertificationSteps,
  getPossibleCertificationStates,
  getDefaultCertificationObj,
  mapCertificationStepsToLabels,
  getAllGroupGapContacts,
  getGapCertificationStatus,
  getAllRecentUpdatesByUserType
};
