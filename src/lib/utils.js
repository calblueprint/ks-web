/* eslint-disable no-await-in-loop */
import USStates from '@assets/usStates.json';
import { updateUser, deleteUser } from './airtable/request';
import { refreshUserData, clearUserData } from './redux/userData';
import { signupUser } from './airlock/airlock';

// Helper functions to validate user record fields

// Ensure value exists
// Allows custom error message
const validateExistence = (
  value,
  error = 'Please enter this required field.'
) => {
  return value ? '' : error;
};

// Validation Styling
const toggleValidColor = (input, type) => {
  if (!type) {
    return input !== '' && typeof input !== 'undefined' ? 'b-is-not-valid' : '';
  }
  return !input ? '\u00A0' : input;
};

// Ensure Zipcode is of valid length
const validateZipcode = value => {
  return value.length === 5 ? '' : 'Must be 5 digits';
};

// Ensure valid email using regex
const validateEmail = value => {
  if (value && value.length === 0) {
    return '';
  }
  // No such thing as perfect regex email validation but this is supposed to be pretty thorough! Ideally we validate by sending them an email
  // eslint-disable-next-line no-useless-escape
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(value) ? '' : 'Please enter a valid email address.';
};

// Ensure email is unique
const validateUniqueEmail = async value => {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const url = `${SERVER_URL}/uniqueEmail?email=${value}`;
  const response = await fetch(url);
  const result = await response.json();
  return result.unique
    ? ''
    : 'It looks like an account with this email already exists.';
};

// TODO: Add Better Password Rules
// Ensure valid password
const validatePassword = value => {
  return value.length >= 6 ? '' : 'Must be at least 6 characters';
};

// Ensure value is a number
const validateNumber = value => {
  return !Number.isNaN(value) ? '' : 'Must be a number';
};

// Ensure State is a real state (either abbreivation or full name)
const ValidateUSState = value => {
  const upperCaseValue = value.toUpperCase();
  if (USStates.map(s => s.toUpperCase()).indexOf(upperCaseValue) !== -1) {
    return '';
  }
  return 'Invalid State';
};

const validatePhoneNumber = value => {
  // validated phone numbers in this form:
  // (123) 456-7890
  // (123)456-7890
  // 123-456-7890
  // 123.456.7890
  // 1234567890
  // +31636363634
  // 075-63546725
  const re = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;
  return re.test(value) ? '' : 'Please enter a valid phone number.';
};

// Specify special validation functions for fields
// Default for all fields: [validateExistence]
const ValidatorData = {
  email: [validateExistence, validateEmail, validateUniqueEmail],
  farmEmail: [validateExistence, validateEmail],
  phoneNumber: [validateExistence, validatePhoneNumber],
  phone: [validateExistence, validatePhoneNumber],
  password: [validateExistence, validatePassword],
  physicalState: [validateExistence, ValidateUSState],
  mailingState: [validateExistence, ValidateUSState],
  physicalZipcode: [validateExistence, validateZipcode],
  mailingZipcode: [validateExistence, validateZipcode]
};

// Asynchronously validate field
const validateField = async (name, value) => {
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
};

const validateFieldSync = (name, value) => {
  let validators = ValidatorData[name];

  // Set Default Validator
  if (!validators) {
    validators = [validateExistence];
  }

  for (let i = 0; i < validators.length; i += 1) {
    const validateFunc = validators[i];
    const error = validateFunc(value);
    if (error !== '') {
      return error;
    }
  }

  return '';
};

// Update or Create the user with the given fields
const updateUserFields = async (user, fields) => {
  // Ensure that only the fields that are supposed to be updated are updated
  const userUpdate = {};
  fields.forEach(field => {
    userUpdate[field] = user[field];
  });

  // If user exists, update it, else, create.
  if (user.id) {
    await updateUser(user.id, userUpdate);
    refreshUserData(user.id);
  } else {
    // TODO: Error Handling
    const id = await signupUser(
      userUpdate.email,
      userUpdate.password,
      { ...userUpdate, password: undefined } // Remove password from user update
    );
    refreshUserData(id);
  }
};

const createFalseDict = keys => {
  const dict = {};
  keys.forEach(k => {
    dict[k] = false;
  });
  return dict;
};

// Delete user and return to homepage. This is used if the user does not live in california
const returnToHomepage = user => {
  deleteUser(user.id);
  clearUserData();
};

const farmFieldsToValidate = [
  'contactFirstName',
  'contactLastName',
  'farmName',
  'phone',
  'farmEmail',
  'physicalStreet1',
  'physicalCity',
  'physicalState',
  'physicalZipcode',
  'mailingStreet1',
  'mailingCity',
  'mailingState',
  'mailingZipcode'
];

const validateFarmEdit = async farm => {
  // Keep track of whether we've found any errors
  let foundErrors = false;
  const allErrorMessages = await Promise.all(
    farmFieldsToValidate.map(f => validateField(f, farm[f]))
  ).catch(e => {
    console.error(e);
  });

  const newErrors = {};
  farmFieldsToValidate.forEach((field, i) => {
    const errorMessage = allErrorMessages[i];
    if (errorMessage !== '') {
      newErrors[field] = errorMessage;
      foundErrors = true;
    } else {
      newErrors[field] = false;
    }
  });

  if (!foundErrors) {
    return { errors: createFalseDict(farmFieldsToValidate), validated: true };
  }
  return { errors: newErrors, validated: false };
};

export {
  validateField,
  validateFieldSync,
  updateUserFields,
  returnToHomepage,
  toggleValidColor,
  validateEmail,
  validateUniqueEmail,
  validateNumber,
  validateExistence,
  validateZipcode,
  createFalseDict,
  validateFarmEdit,
  farmFieldsToValidate,
  validatePhoneNumber
};
