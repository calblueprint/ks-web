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
  NSEVP: 'N'
};

// Gets credentials for a given user
function getCredentials(user) {
  let credentials = '';

  if (user == null) {
    return credentials;
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
function isSignedIn(credentials) {
  return credentials !== '';
}

function isKSUser(credentials) {
  return credentials.includes(Credentials.KS);
}

function isNSEVPUser(credentials) {
  return credentials.includes(Credentials.NSEVP);
}

export { getCredentials, isKSUser, isNSEVPUser, isSignedIn, Credentials };
