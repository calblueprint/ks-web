import { createManyRecentUpdates } from './airtable/request';

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

export default {
  certificationLabelToCompletedMessage
};
