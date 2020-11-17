/**
 *
 * Credentials and util functions for specifying credentials of users
 * based on their data stored on Airtable
 *
 */

import constants from '../constants';

const { SUBSCRIBER_OWNER, GENERAL_OWNER } = constants;

const Credentials = {
  ADMIN: 'A',
  GENERAL: 'G',
  SUBSCRIBER: 'S',
  ONBOARDING: 'O',
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

  if (userTypes.includes(SUBSCRIBER_OWNER)) {
    credentials += Credentials.SUBSCRIBER;
  }

  if (userTypes.includes(GENERAL_OWNER)) {
    credentials += Credentials.GENERAL;
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

function isSubscriberUser(credentials) {
  return credentials.includes(Credentials.SUBSCRIBER);
}

function isGeneralUser(credentials) {
  return credentials.includes(Credentials.GENERAL);
}

function isSuperAdmin(credentials) {
  return credentials.includes(Credentials.SUPERADMIN);
}

export {
  getCredentials,
  isAdmin,
  isSubscriberUser,
  isGeneralUser,
  isSuperAdmin,
  isSignedIn,
  isOnboarding,
  Credentials
};
