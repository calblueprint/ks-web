/*
    THIS IS A GENERATED FILE
    Changes might be overwritten in the future, edit with caution!
*/

export const Tables = {
  User: 'User',
  RateSchedule: 'Rate Schedule',
  InvestmentBreakdown: 'Investment Breakdown'
};

export const Columns = {
  User: {
    primaryKey: { name: `Primary Key`, type: `formula` },
    dateCreated: { name: `Date Created`, type: `formula` },
    dateUpdated: { name: `Date Updated`, type: `formula` },
    userTypes: { name: `User Types`, type: `multiSelect` },
    id: { name: `ID`, type: `formula` },
    subscriberBills: { name: `Subscriber Bills`, type: `text` },
    adminOf: { name: `Admin Of`, type: `text` },
    numberOfShares: { name: `Number of Shares`, type: `number` },
    isReceivingDividends: { name: `Is Receiving Dividends?`, type: `checkbox` },
    solarProject: { name: `Solar Project`, type: `text` },
    firstName: { name: `First Name`, type: `text` },
    lastName: { name: `Last Name`, type: `text` },
    email: { name: `Email`, type: `text` },
    alternateEmail: { name: `Alternate Email`, type: `text` },
    permanentStreet1: { name: `Permanent Street 1`, type: `text` },
    permanentStreet2: { name: `Permanent Street 2`, type: `text` },
    permanentCity: { name: `Permanent City`, type: `text` },
    permanentState: { name: `Permanent State`, type: `text` },
    permanentZipcode: { name: `Permanent Zipcode`, type: `text` },
    mailingStreet1: { name: `Mailing Street 1`, type: `text` },
    mailingStreet2: { name: `Mailing Street 2`, type: `text` },
    mailingCity: { name: `Mailing City`, type: `text` },
    mailingState: { name: `Mailing State`, type: `text` },
    mailingZipcode: { name: `Mailing Zipcode`, type: `text` },
    phoneNumber: { name: `Phone Number`, type: `phone` },
    onboardingStep: { name: `Onboarding Step`, type: `number` },
    password: { name: `Password`, type: `text` },
    announcements: { name: `Announcements`, type: `text` },
    name: { name: `Name`, type: `formula` },
    permanentAddress: { name: `Permanent Address`, type: `formula` },
    mailingAddress: { name: `Mailing Address`, type: `formula` },
    mailingAddressSame: { name: `Mailing Address Same`, type: `checkbox` },
    bylaw1: { name: `Bylaw 1`, type: `checkbox` },
    bylaw2: { name: `Bylaw 2`, type: `checkbox` },
    certifyPermanentAddress: {
      name: `Certify Permanent Address`,
      type: `checkbox`
    },
    rateScheduleId: { name: `Rate Schedule`, type: `foreignKey-one` },
    latestBillNumber: { name: `Latest Bill Number`, type: `rollup` },
    meterId: { name: `Meter ID`, type: `text` },
    isSuperAdmin: { name: `Is Super Admin?`, type: `checkbox` },
    pledgeInvite: { name: `Pledge Invite`, type: `text` },
    subscriberAccountNumber: {
      name: `Subscriber Account Number`,
      type: `number`
    }
  },
  'Rate Schedule': {
    primaryKey: { name: `Primary Key`, type: `formula` },
    subscriberBill: { name: `Subscriber Bill`, type: `text` },
    dateCreated: { name: `Date Created`, type: `formula` },
    dateUpdated: { name: `Date Updated`, type: `formula` },
    rate: { name: `Rate`, type: `number` },
    rebateRate: { name: `Rebate Rate`, type: `number` },
    id: { name: `ID`, type: `formula` },
    subscriberIds: { name: `Subscribers`, type: `foreignKey-many` },
    status: { name: `Status`, type: `select` }
  },
  'Investment Breakdown': {
    categoryName: { name: `Category Name`, type: `text` },
    percentage: { name: `Percentage`, type: `number` },
    color: { name: `Color`, type: `text` }
  }
};
