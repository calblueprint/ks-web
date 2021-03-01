/*
    THIS IS A GENERATED FILE
    Changes might be overwritten in the future, edit with caution!
*/

export const Tables = {
  User: 'User',
  Farm: 'Farm',
  GAPStatus: 'GAP Status'
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
    onboardingStep: { name: `Onboarding Step`, type: `number` }
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
    foodHub: { name: `Food Hub`, type: `formula` },
    gapStatuIds: { name: `GAP Status`, type: `foreignKey-many` },
    statusfromGapStatus: { name: `Status (from GAP Status)`, type: `lookup` },
    createdfromGapStatus: { name: `Created (from GAP Status)`, type: `lookup` },
    farmerName: { name: `Farmer Name`, type: `text` },
    primaryKeyfromInspector: {
      name: `Primary Key (from Inspector)`,
      type: `lookup`
    },
    emailfromInspector: { name: `Email (from Inspector)`, type: `lookup` }
  },
  'GAP Status': {
    gapUpdate: { name: `Gap Update`, type: `formula` },
    farmId: { name: `Farm`, type: `foreignKey-one` },
    status: { name: `Status`, type: `select` },
    created: { name: `Created`, type: `formula` },
    farmNamefromFarm: { name: `Farm Name (from Farm)`, type: `lookup` }
  }
};
