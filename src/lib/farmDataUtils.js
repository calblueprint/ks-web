/* eslint-disable no-await-in-loop */
import { getAllFarms } from './airtable/request';
import { refreshUserData } from './redux/userData';
import {
  validateExistence,
  validateEmail,
  validateUniqueEmail,
  validateNumber,
  validateZipcode
} from './onboardingUtils';
import { store } from './redux/store';
import USStates from '../assets/usStates.json';

// Ensure State is a real state (either abbreivation or full name)
const ValidateUSState = value => {
  const upperCaseValue = value.toUpperCase();
  if (USStates.map(s => s.toUpperCase()).indexOf(upperCaseValue) !== -1) {
    return '';
  }
  return 'Invalid State';
};

// Specify special validation functions for fields
// Default for all fields: [validateExistence]
const ValidatorData = {
  // inviteEmail: [validateExistence, validateEmail, validateUniqueEmail],
  // inviteShareAmount: [validateExistence, validateNumber, validateShares],
  updateEmail: [validateExistence, validateEmail, validateUniqueEmail],
  updateState: [validateExistence, ValidateUSState],
  updateZipcode: [validateExistence, validateNumber, validateZipcode],
  updateStreet2: []
};

// Determines validation styling
export function toggleValidColor(input, type) {
  switch (type) {
    case 0:
      return input !== '' && typeof input !== 'undefined'
        ? 'b-is-not-valid'
        : 'b-is-valid';
    case 1:
      return !input ? '\u00A0' : input;
    case 2:
      return input !== '' && typeof input !== 'undefined'
        ? 'b-is-not-valid'
        : null;
    default:
      return null;
  }
}

// Asynchronously validate field
export async function validateField(name, value) {
  let validators = ValidatorData[name];

  // Set Default Validator
  if (!validators) {
    validators = [validateExistence];
  }

  for (let i = 0; i < validators.length; i += 1) {
    const validateFunc = validators[i];
    const error = await validateFunc(value);
    if (error !== '') {
      return error;
    }
  }

  return '';
}

// Remove user from project group
// TODO: What is the UX for the user when they try and log back in?
export async function removeUser() {
  // const projectGroup = await getProjectGroupById(user.projectGroupId);

  // const newUserIds = projectGroup.userIds.filter(id => id !== user.id);

  // await updateProjectGroup(projectGroup.id, {
  //   userIds: newUserIds
  // });

  // Refresh local copy of data after updating users
  const { user: loggedInUser } = store.getState().userData;
  await refreshUserData(loggedInUser.id);
}

// Get all user records for a given project group
// This filters out users that are currently onboarding
// export async function getUserRecordsForProjectGroup(projectGroup) {
//   const allUsers = await getUsersByIds(projectGroup.userIds);

//   // Ensure onboarding users aren't considered
//   return allUsers.filter(o => o.onboardingStep === -1);
// }

export async function getAllFarmsPls() {
  const allFarms = await getAllFarms();
  return allFarms;
}

// Invite a member to a project group. Takes in a pledge invite Record
// export async function inviteMember(pledgeInvite) {
//   return createPledgeInvite(pledgeInvite);
// }

// Calls a backend function that sends an email to the invited user with the pledge invite
// export async function triggerEmail(pledgeInviteId) {
//   try {
//     const emailInvite = await fetch(
//       `${process.env.REACT_APP_SERVER_URL}/invite`,
//       {
//         method: 'POST',
//         headers: {
//           Accept: 'application/json',
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           pledgeInviteId
//         })
//       }
//     );

//     const emailResponse = await emailInvite.json();
//     const { status } = emailResponse;
//     return status;
//   } catch (err) {
//     return 'error';
//   }
// }
