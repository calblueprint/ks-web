/*
    THIS IS A GENERATED FILE
    Changes might be overwritten in the future, edit with caution!
*/

export const Tables = {
  User: 'User',
  Farm: 'Farm',
  GAPCertification: 'GAP Certification',
  Comments: 'Comments',
  RecentUpdates: 'Recent Updates',
  RecentHarvestLogs: 'Recent Harvest Logs',
  TotalHarvests: 'Total Harvests'
};

export const Columns = {
  User: {
    primaryKey: { name: `Primary Key`, type: `formula` },
    dateCreated: { name: `Date Created`, type: `formula` },
    dateUpdated: { name: `Date Updated`, type: `formula` },
    userTypes: { name: `User Types`, type: `select` },
    id: { name: `ID`, type: `formula` },
    firstName: { name: `First Name`, type: `text` },
    lastName: { name: `Last Name`, type: `text` },
    email: { name: `Email`, type: `text` },
    password: { name: `Password`, type: `text` },
    name: { name: `Name`, type: `formula` },
    farmIds: { name: `Farm`, type: `foreignKey-many` },
    profilePicture: { name: `Profile Picture`, type: `multipleAttachment` },
    commentIds: { name: `Comments`, type: `foreignKey-many` },
    recentUpdateIds: { name: `Recent Updates`, type: `foreignKey-many` },
    lastSynced: { name: `Last Synced`, type: `date` }
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
    groupGapContactId: { name: `Group GAP Contact`, type: `foreignKey-one` },
    farmEmail: { name: `Farm Email`, type: `text` },
    commentIds: { name: `Comments`, type: `foreignKey-many` },
    farmId: { name: `Farm ID`, type: `formula` },
    foodHubAffiliation: { name: `Food Hub Affiliation`, type: `text` },
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
    recentHarvestLogIds: {
      name: `Recent Harvest Logs`,
      type: `foreignKey-many`
    },
    totalHarvestIds: { name: `Total Harvests`, type: `foreignKey-many` },
    gapCertificationId: { name: `GAP Certification`, type: `foreignKey-one` },
    commentfromComments: { name: `Comment (from Comments)`, type: `lookup` },
    hcCompanyName: { name: `HC Company Name`, type: `text` },
    field31: { name: `Field 31`, type: `text` }
  },
  'GAP Certification': {
    id: { name: `ID`, type: `formula` },
    farmReferredDate: { name: `Farm Referred Date`, type: `date` },
    farmApplied: { name: `Farm Applied`, type: `select` },
    farmAppliedDate: { name: `Farm Applied Date`, type: `date` },
    farmAccepted: { name: `Farm Accepted`, type: `select` },
    farmAcceptedDate: { name: `Farm Accepted Date`, type: `date` },
    farmFoodSafetyPlan: { name: `Farm Food Safety Plan`, type: `select` },
    farmFoodSafetyPlanDate: {
      name: `Farm Food Safety Plan Date`,
      type: `date`
    },
    riskAssessment: { name: `Risk Assessment`, type: `select` },
    riskAssessmentDate: { name: `Risk Assessment Date`, type: `date` },
    mockRecall: { name: `Mock Recall`, type: `select` },
    mockRecallDate: { name: `Mock Recall Date`, type: `date` },
    internalAudit1: { name: `Internal Audit (1)`, type: `select` },
    internalAudit1Date: { name: `Internal Audit 1 Date`, type: `date` },
    internalAudit2: { name: `Internal Audit (2)`, type: `select` },
    internalAudit2Date: { name: `Internal Audit 2 Date`, type: `date` },
    gapCertified: { name: `GAP Certified`, type: `select` },
    gapCertifiedDate: { name: `GAP Certified Date`, type: `date` },
    farmReferred: { name: `Farm Referred`, type: `select` },
    farmId: { name: `Farm`, type: `foreignKey-one` },
    ksAffiliated: { name: `KS Affiliated`, type: `lookup` },
    created: { name: `Created`, type: `formula` }
  },
  Comments: {
    id: { name: `ID`, type: `formula` },
    authorId: { name: `Author`, type: `foreignKey-one` },
    farmId: { name: `Farm`, type: `foreignKey-one` },
    comment: { name: `Comment`, type: `multilineText` },
    authorName: { name: `Author Name`, type: `text` },
    date: { name: `Date`, type: `formula` }
  },
  'Recent Updates': {
    id: { name: `ID`, type: `formula` },
    authorId: { name: `Author`, type: `foreignKey-one` },
    message: { name: `Message`, type: `multilineText` },
    date: { name: `Date`, type: `formula` },
    organization: { name: `Organization`, type: `multiSelect` },
    namefromAuthor: { name: `Name (from Author)`, type: `lookup` }
  },
  'Recent Harvest Logs': {
    id: { name: `ID`, type: `formula` },
    farmId: { name: `Farm`, type: `foreignKey-one` },
    date: { name: `Date`, type: `date` },
    crops: { name: `Crops`, type: `text` },
    created: { name: `Created`, type: `formula` }
  },
  'Total Harvests': {
    id: { name: `ID`, type: `formula` },
    farmId: { name: `Farm`, type: `foreignKey-one` },
    date: { name: `Date`, type: `date` },
    crops: { name: `Crops`, type: `text` },
    quantities: { name: `Quantities`, type: `text` },
    totalProductionPounds: { name: `Total Production Pounds`, type: `number` }
  }
};
