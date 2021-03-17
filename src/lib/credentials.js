/**
 *
 * Credentials and util functions for specifying credentials of users
 * based on their data stored on Airtable
 *
 */

import constants from '@root/constants';

const { KS_USER, NSEVP_USER } = constants;

const Credentials = {
  KS: 'K',
  NSEVP: 'N',
  ONBOARDING: 'O',
  ADMIN: 'A',
  // GENERAL: 'G',
  // SUBSCRIBER: 'S',
  SUPERADMIN: 'X'
};

// Gets credentials for a given user
function getCredentials(user) {
  let credentials = '';

  if (user == null) {
    return credentials;
  }

  if (user.onboardingStep !== -1) {
    credentials += Credentials.ONBOARDING;
    return credentials;
  }

  // Assumes that admin is only user of one project group
  if (user.adminOfId && user.adminOfId.length >= 0) {
    credentials += Credentials.ADMIN;
  }

  if (user.isSuperAdmin) {
    credentials += Credentials.SUPERADMIN;
  }

  const { userTypes } = user;

  if (userTypes.includes(KS_USER)) {
    credentials += Credentials.KS;
  }

  if (userTypes.includes(NSEVP_USER)) {
    credentials += Credentials.NSEVP;
  }

  return credentials;
}

// Helper functions to check whether a user has a certain credential

function isOnboarding(credentials) {
  return credentials.includes(Credentials.ONBOARDING);
}
function isSignedIn(credentials) {
  return credentials !== '';
}

function isAdmin(credentials) {
  return credentials.includes(Credentials.ADMIN);
}

function isKSUser(credentials) {
  return credentials.includes(Credentials.KS);
}

function isNSEVPUser(credentials) {
  return credentials.includes(Credentials.NSEVP);
}

function isSuperAdmin(credentials) {
  return credentials.includes(Credentials.SUPERADMIN);
}

export {
  getCredentials,
  isAdmin,
  isKSUser,
  isNSEVPUser,
  isSuperAdmin,
  isSignedIn,
  isOnboarding,
  Credentials
};
