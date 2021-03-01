/*
    THIS IS A GENERATED FILE
    Changes might be overwritten in the future, edit with caution!
*/

export const Tables = {
  User: 'User',
  Farm: 'Farm',
  Comments: 'Comments'
};

export const Columns = {
  User: {
    primaryKey: { name: `Primary Key`, type: `formula` },
    dateCreated: { name: `Date Created`, type: `formula` },
    dateUpdated: { name: `Date Updated`, type: `formula` },
    userTypes: { name: `User Types`, type: `multiSelect` },
    id: { name: `ID`, type: `formula` },
    firstName: { name: `First Name`, type: `text` },
    lastName: { name: `Last Name`, type: `text` },
    email: { name: `Email`, type: `text` },
    password: { name: `Password`, type: `text` },
    name: { name: `Name`, type: `formula` },
    farmIds: { name: `Farm`, type: `foreignKey-many` },
    profilePicture: { name: `Profile Picture`, type: `multipleAttachment` },
    onboardingStep: { name: `Onboarding Step`, type: `number` },
    commentIds: { name: `Comments`, type: `foreignKey-many` }
  },
  Farm: {
    farmName: { name: `Farm Name`, type: `text` },
    photo: { name: `Photo`, type: `multipleAttachment` },
    address: { name: `Address`, type: `text` },
    created: { name: `Created`, type: `formula` },
    lastModified: { name: `Last Modified`, type: `formula` },
    contactFirstName: { name: `Contact First Name`, type: `text` },
    contactLastName: { name: `Contact Last Name`, type: `text` },
    phone: { name: `Phone`, type: `phone` },
    inspectorIds: { name: `Inspector`, type: `foreignKey-many` },
    farmEmail: { name: `Farm Email`, type: `text` },
    gapCertified: { name: `GAP Certified`, type: `checkbox` },
    gapCertificationDate: { name: `GAP Certification Date`, type: `date` },
    foodHubParticipant: { name: `Food Hub Participant`, type: `checkbox` },
    farmerName: { name: `Farmer Name`, type: `text` },
    inspectorName: { name: `Inspector Name`, type: `lookup` },
    commentIds: { name: `Comments`, type: `foreignKey-many` },
    farmId: { name: `Farm ID`, type: `formula` },
    farmReferred: { name: `Farm Referred`, type: `select` },
    farmApplied: { name: `Farm Applied`, type: `select` },
    farmAccepted: { name: `Farm Accepted`, type: `select` },
    farmFoodSafetyPlan: { name: `Farm Food Safety Plan`, type: `select` },
    riskAssessment: { name: `Risk Assessment`, type: `select` },
    mockRecall: { name: `Mock Recall`, type: `select` },
    internalAudit1: { name: `Internal Audit (1)`, type: `select` },
    internalAudit2: { name: `Internal Audit (2)`, type: `select` },
    foodHubAffiliation: { name: `Food Hub Affiliation`, type: `select` }
  },
  Comments: {
    id: { name: `ID`, type: `formula` },
    authorId: { name: `Author`, type: `foreignKey-one` },
    farmId: { name: `Farm`, type: `foreignKey-one` },
    comment: { name: `Comment`, type: `multilineText` }
  }
};
