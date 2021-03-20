/*
    THIS IS A GENERATED FILE
    Changes might be overwritten in the future, edit with caution!
*/

export const Tables = {
  User: 'User',
  Farm: 'Farm',
  Comments: 'Comments',
  RecentUpdates: 'Recent Updates'
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
    commentIds: { name: `Comments`, type: `foreignKey-many` },
    recentUpdateIds: { name: `Recent Updates`, type: `foreignKey-many` }
  },
  Farm: {
    farmName: { name: `Farm Name`, type: `text` },
    photo: { name: `Photo`, type: `multipleAttachment` },
    address: { name: `Address`, type: `formula` },
    created: { name: `Created`, type: `formula` },
    lastModified: { name: `Last Modified`, type: `formula` },
    contactFirstName: { name: `Contact First Name`, type: `text` },
    contactLastName: { name: `Contact Last Name`, type: `text` },
    phone: { name: `Phone`, type: `phone` },
    groupGapContactIds: { name: `Group GAP Contact`, type: `foreignKey-many` },
    farmEmail: { name: `Farm Email`, type: `text` },
    gapCertified: { name: `GAP Certified`, type: `checkbox` },
    gapCertificationDate: { name: `GAP Certification Date`, type: `date` },
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
    foodHubAffiliation: { name: `Food Hub Affiliation`, type: `select` },
    ksAffiliated: { name: `KS Affiliated`, type: `checkbox` },
    physicalStreet1: { name: `Physical Street 1`, type: `text` },
    physicalStreet2: { name: `Physical Street 2`, type: `text` },
    physicalCity: { name: `Physical City`, type: `text` },
    physicalState: { name: `Physical State`, type: `text` },
    physicalZipcode: { name: `Physical Zipcode`, type: `text` },
    mailingAddress: { name: `Mailing Address`, type: `formula` },
    mailingStreet1: { name: `Mailing Street 1`, type: `text` },
    mailingStreet2: { name: `Mailing Street 2`, type: `text` },
    mailingCity: { name: `Mailing City`, type: `text` },
    mailingState: { name: `Mailing State`, type: `text` },
    mailingZipcode: { name: `Mailing Zipcode`, type: `text` },
    farmReferredDate: { name: `Farm Referred Date`, type: `date` },
    farmAppliedDate: { name: `Farm Applied Date`, type: `date` },
    farmAcceptedDate: { name: `Farm Accepted Date`, type: `date` },
    farmFoodSafetyPlanDate: {
      name: `Farm Food Safety Plan Date`,
      type: `date`
    },
    riskAssessmentDate: { name: `Risk Assessment Date`, type: `date` },
    mockRecallDate: { name: `Mock Recall Date`, type: `date` },
    internalAudit1Date: { name: `Internal Audit 1 Date`, type: `date` },
    internalAudit2Date: { name: `Internal Audit 2 Date`, type: `date` }
  },
  Comments: {
    id: { name: `ID`, type: `formula` },
    authorId: { name: `Author`, type: `foreignKey-one` },
    farmId: { name: `Farm`, type: `foreignKey-one` },
    comment: { name: `Comment`, type: `multilineText` }
  },
  'Recent Updates': {
    id: { name: `ID`, type: `formula` },
    authorId: { name: `Author`, type: `foreignKey-one` },
    message: { name: `Message`, type: `multilineText` },
    date: { name: `Date`, type: `formula` },
    organization: { name: `Organization`, type: `multiSelect` }
  }
};
