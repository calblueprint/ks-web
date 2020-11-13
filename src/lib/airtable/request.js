/* eslint no-restricted-imports: 0 */
/* eslint-disable no-unused-vars */

/*
  THIS IS A GENERATED FILE
  Changes might be overwritten in the future, edit with caution!

  Wrapper functions around functions in airtable.js that interact with Airtable, designed
  to provide basic functionality

  If you're adding a new function: make sure you add a corresponding test (at least 1) for it in request.spec.js

*/

import { Tables, Columns } from './schema';
import {
  createRecord,
  createRecords,
  updateRecord,
  updateRecords,
  getAllRecords,
  getRecordsByAttribute,
  getRecordById,
  deleteRecord
} from './airtable';

/*
 ******* CREATE RECORDS *******
 */

export const createUser = async record => {
  return createRecord(Tables.User, record);
};

export const createManyUsers = async records => {
  const createPromises = [];
  const numCalls = Math.ceil(records.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = records.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      createPromises.push(createRecords(Tables.User, subset));
  }
  return Promise.all(createPromises);
};

export const createRateSchedule = async record => {
  return createRecord(Tables.RateSchedule, record);
};

export const createManyRateSchedules = async records => {
  const createPromises = [];
  const numCalls = Math.ceil(records.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = records.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      createPromises.push(createRecords(Tables.RateSchedule, subset));
  }
  return Promise.all(createPromises);
};

export const createInvestmentBreakdown = async record => {
  return createRecord(Tables.InvestmentBreakdown, record);
};

export const createManyInvestmentBreakdowns = async records => {
  const createPromises = [];
  const numCalls = Math.ceil(records.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = records.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      createPromises.push(createRecords(Tables.InvestmentBreakdown, subset));
  }
  return Promise.all(createPromises);
};

/*
 ******* READ RECORDS *******
 */

export const getUserById = async id => {
  return getRecordById(Tables.User, id);
};

export const getUsersByIds = async (ids, filterByFormula = '', sort = []) => {
  let formula = `OR(${ids.reduce((f, id) => `${f} {ID}='${id}',`, '')} 1 < 0)`;
  formula = filterByFormula ? `AND(${filterByFormula}, ${formula})` : formula;
  return getAllRecords(Tables.User, formula, sort);
};

export const getAllUsers = async (filterByFormula = '', sort = []) => {
  return getAllRecords(Tables.User, filterByFormula, sort);
};

export const getRateScheduleById = async id => {
  return getRecordById(Tables.RateSchedule, id);
};

export const getRateSchedulesByIds = async (
  ids,
  filterByFormula = '',
  sort = []
) => {
  let formula = `OR(${ids.reduce((f, id) => `${f} {ID}='${id}',`, '')} 1 < 0)`;
  formula = filterByFormula ? `AND(${filterByFormula}, ${formula})` : formula;
  return getAllRecords(Tables.RateSchedule, formula, sort);
};

export const getAllRateSchedules = async (filterByFormula = '', sort = []) => {
  return getAllRecords(Tables.RateSchedule, filterByFormula, sort);
};

export const getInvestmentBreakdownById = async id => {
  return getRecordById(Tables.InvestmentBreakdown, id);
};

export const getInvestmentBreakdownsByIds = async (
  ids,
  filterByFormula = '',
  sort = []
) => {
  let formula = `OR(${ids.reduce((f, id) => `${f} {ID}='${id}',`, '')} 1 < 0)`;
  formula = filterByFormula ? `AND(${filterByFormula}, ${formula})` : formula;
  return getAllRecords(Tables.InvestmentBreakdown, formula, sort);
};

export const getAllInvestmentBreakdowns = async (
  filterByFormula = '',
  sort = []
) => {
  return getAllRecords(Tables.InvestmentBreakdown, filterByFormula, sort);
};

/*
 ******* UPDATE RECORDS *******
 */

export const updateUser = async (id, recordUpdates) => {
  return updateRecord(Tables.User, id, recordUpdates);
};

export const updateManyUsers = async recordUpdates => {
  const updatePromises = [];
  const numCalls = Math.ceil(recordUpdates.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = recordUpdates.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      updatePromises.push(updateRecords(Tables.User, subset));
  }
  return Promise.all(updatePromises);
};

export const updateRateSchedule = async (id, recordUpdates) => {
  return updateRecord(Tables.RateSchedule, id, recordUpdates);
};

export const updateManyRateSchedules = async recordUpdates => {
  const updatePromises = [];
  const numCalls = Math.ceil(recordUpdates.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = recordUpdates.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      updatePromises.push(updateRecords(Tables.RateSchedule, subset));
  }
  return Promise.all(updatePromises);
};

export const updateInvestmentBreakdown = async (id, recordUpdates) => {
  return updateRecord(Tables.InvestmentBreakdown, id, recordUpdates);
};

export const updateManyInvestmentBreakdowns = async recordUpdates => {
  const updatePromises = [];
  const numCalls = Math.ceil(recordUpdates.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = recordUpdates.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      updatePromises.push(updateRecords(Tables.InvestmentBreakdown, subset));
  }
  return Promise.all(updatePromises);
};

/*
 ******* DELETE RECORDS *******
 */

export const deleteUser = async id => {
  return deleteRecord(Tables.User, id);
};
export const deleteRateSchedule = async id => {
  return deleteRecord(Tables.RateSchedule, id);
};
export const deleteInvestmentBreakdown = async id => {
  return deleteRecord(Tables.InvestmentBreakdown, id);
};
