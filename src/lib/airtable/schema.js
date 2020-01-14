/*
    THIS IS A GENERATED FILE
    Changes might be overwritten in the future, edit with caution!
*/

export const Tables = {
  Payment: 'Payment',
  Organization: 'Organization',
  ProjectGroup: 'Project Group',
  Person: 'Person',
  RateSchedule: 'Rate Schedule',
  Address: 'Address',
  TestDevelopment: 'Test (Development)',
  SubscriberBill: 'Subscriber Bill',
  Announcement: 'Announcement',
  PGEUsage: 'PGE Usage',
  PledgeInvite: 'Pledge Invite',
  SolarProject: 'Solar Project',
  UserLogin: 'User Login',
  Owner: 'Owner',
  Generation: 'Generation'
};

export const Columns = {
  Payment: {
    ID: `ID`,
    DateCreated: `Date Created`,
    DateUpdated: `Date Updated`,
    Owner: `Owner`,
    Status: `Status`,
    Type: `Type`,
    Amount: `Amount`,
    SubscriberBill: `Subscriber Bill`,
    OrderID: `Order ID`,
    PayerID: `Payer ID`,
    CurrencyCode: `Currency Code`,
    Address: `Address`,
    PayerFullName: `Payer Full Name`,
    Intent: `Intent`,
    PaymentCreateTime: `Payment Create Time`,
    PaymentUpdateTime: `Payment Update Time`,
    Notes: `Notes`,
    PayerEmail: `Payer Email`
  },
  Organization: {
    ID: `ID`,
    PersonsAffiliated: `Person(s) Affiliated`,
    DateCreated: `Date Created`,
    DateUpdated: `Date Updated`,
    Address: `Address`,
    Name: `Name`
  },
  ProjectGroup: {
    PrimaryKey: `Primary Key`,
    Owner: `Owner`,
    DateCreated: `Date Created`,
    DateUpdated: `Date Updated`,
    IsPublic: `Is Public?`,
    IsTakingPledges: `Is taking pledges?`,
    Name: `Name`,
    SolarProject: `Solar Project`,
    Admin: `Admin`,
    Announcement: `Announcement`,
    Street1: `Street 1`,
    Street2: `Street 2`,
    State: `State`,
    Zipcode: `Zipcode`,
    City: `City`,
    Description: `Description`,
    Latitude: `Latitude`,
    Longitude: `Longitude`,
    IsDefault: `Is Default?`,
    ID: `ID`
  },
  Person: {
    ID: `ID`,
    Email: `Email`,
    PhoneNumber: `Phone Number`,
    Owner: `Owner`,
    Organization: `Organization`,
    DateCreated: `Date Created`,
    DateUpdated: `Date Updated`,
    Tags: `Tags`,
    UserLogin: `User Login`,
    Name: `Name`,
    RECORDIDforDev: `RECORD ID (for dev)`,
    Announcement: `Announcement`,
    Street: `Street`,
    City: `City`,
    State: `State`,
    Zipcode: `Zipcode`,
    Apt: `Apt`,
    OnboardingStep: `Onboarding Step`,
    AlternativeEmail: `Alternative Email`,
    MailingStreet: `Mailing Street`,
    MailingApt: `Mailing Apt`,
    MailingCity: `Mailing City`,
    MailingState: `Mailing State`,
    MailingZipcode: `Mailing Zipcode`,
    MailingPhoneNumber: `Mailing Phone Number`,
    Dividends: `Dividends`,
    BillingStreet: `Billing Street`,
    BillingApt: `Billing Apt`,
    BillingCity: `Billing City`,
    BillingState: `Billing State`,
    BillingZipcode: `Billing Zipcode`,
    ProjectGroup: `Project Group`,
    Address: `Address`
  },
  RateSchedule: {
    ID: `ID`,
    SubscriberBill: `Subscriber Bill`,
    DateCreated: `Date Created`,
    DateUpdated: `Date Updated`,
    Rate: `Rate`,
    RebateRate: `Rebate Rate`
  },
  Address: {
    ID: `ID`,
    Person: `Person`,
    Organization: `Organization`,
    DateCreated: `Date Created`,
    DateUpdated: `Date Updated`,
    Street: `Street`,
    City: `City`,
    State: `State`,
    ZipCode: `Zip Code`,
    SolarProject: `Solar Project`,
    Apt: `Apt`
  },
  TestDevelopment: {
    Name: `Name`,
    Tag: `Tag`,
    ID: `ID`
  },
  SubscriberBill: {
    ID: `ID`,
    DateCreated: `Date Created`,
    DateUpdated: `Date Updated`,
    SubscriberOwner: `Subscriber Owner`,
    StatementDate: `Statement Date`,
    StartDate: `Start Date`,
    EndDate: `End Date`,
    RateSchedule: `Rate Schedule`,
    EstimatedRebate: `Estimated Rebate`,
    TotalEstimatedRebate: `Total Estimated Rebate`,
    AmountDueOnPrevious: `Amount Due on Previous`,
    AmountReceivedSincePrevious: `Amount Received Since Previous`,
    AmountDue: `Amount Due`,
    Owner: `Owner`,
    Payment: `Payment`,
    Status: `Status`,
    Balance: `Balance`
  },
  Announcement: {
    Title: `Title`,
    Link: `Link`,
    Attachments: `Attachments`,
    ProjectGroup: `Project Group`,
    Author: `Author`,
    Message: `Message`,
    EventType: `Event type`,
    ID: `ID`,
    Location: `Location`,
    Time: `Time`
  },
  PGEUsage: {
    ID: `ID`,
    DateCreated: `Date Created`,
    DateUpdated: `Date Updated`,
    SolarProject: `Solar Project`,
    SubscriberOwner: `Subscriber Owner`,
    StartDate: `Start Date`,
    EndDate: `End Date`,
    Amount: `Amount`,
    EBCERebate: `EBCE Rebate`
  },
  PledgeInvite: {
    ID: `ID`,
    GeneralOwner: `General Owner`,
    DateCreated: `Date Created`,
    DateUpdated: `Date Updated`,
    FirstName: `First Name`,
    LastName: `Last Name`,
    ShareAmount: `Share Amount`,
    WantsDividends: `Wants Dividends?`,
    PhoneNumber: `Phone Number`,
    Email: `Email`,
    Token: `Token`,
    Status: `Status`
  },
  SolarProject: {
    ID: `ID`,
    DateCreated: `Date Created`,
    DateUpdated: `Date Updated`,
    Name: `Name`,
    Size: `Size`,
    Address: `Address`,
    Status: `Status`,
    SubscriberOwner: `Subscriber Owner`,
    Generation: `Generation`,
    PGEUsage: `PGE Usage`,
    ProjectGroup: `Project Group`
  },
  UserLogin: {
    ID: `ID`,
    Person: `Person`,
    Owner: `Owner`,
    DateCreated: `Date Created`,
    DateUpdated: `Date Updated`,
    Email: `Email`,
    Password: `password`,
    PasswordSalt: `Password Salt`,
    PasswordHash: `Password Hash`,
    PasswordReminderToken: `Password Reminder Token`,
    PasswordReminderExpire: `Password Reminder Expire`,
    EmailConfirmationToken: `Email Confirmation Token`
  },
  Owner: {
    ID: `ID`,
    Person: `Person`,
    DateCreated: `Date Created`,
    DateUpdated: `Date Updated`,
    AgreementID: `Agreement ID`,
    ProjectGroup: `Project Group`,
    UserLogin: `User Login`,
    Payment: `Payment`,
    OwnerType: `Owner Type`,
    OwnerID: `Owner ID`,
    SubscriberBill: `Subscriber Bill`,
    PledgeInvite: `Pledge Invite`,
    AdminOf: `Admin Of`,
    SolarProject: `Solar Project`,
    NumberOfShares: `Number of Shares`,
    ReceivingDividends: `Receiving Dividends?`
  },
  Generation: {
    ID: `ID`,
    DateCreated: `Date Created`,
    DateUpdated: `Date Updated`,
    SolarProject: `Solar Project`,
    SubscriberOwners: `Subscriber Owner(s)?`,
    StartDate: `Start Date`,
    EndDate: `End Date`,
    Amount: `Amount`
  }
};
