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

export const createFarm = async record => {
  return createRecord(Tables.Farm, record);
};

export const createManyFarms = async records => {
  const createPromises = [];
  const numCalls = Math.ceil(records.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = records.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      createPromises.push(createRecords(Tables.Farm, subset));
  }
  return Promise.all(createPromises);
};

export const createGAPStatu = async record => {
  return createRecord(Tables.GAPStatus, record);
};

export const createManyGAPStatus = async records => {
  const createPromises = [];
  const numCalls = Math.ceil(records.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = records.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      createPromises.push(createRecords(Tables.GAPStatus, subset));
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

export const getFarmById = async id => {
  return getRecordById(Tables.Farm, id);
};

export const getFarmsByIds = async (ids, filterByFormula = '', sort = []) => {
  let formula = `OR(${ids.reduce((f, id) => `${f} {ID}='${id}',`, '')} 1 < 0)`;
  formula = filterByFormula ? `AND(${filterByFormula}, ${formula})` : formula;
  return getAllRecords(Tables.Farm, formula, sort);
};

export const getAllFarms = async (filterByFormula = '', sort = []) => {
  return getAllRecords(Tables.Farm, filterByFormula, sort);
};

export const getGAPStatuById = async id => {
  return getRecordById(Tables.GAPStatus, id);
};

export const getGAPStatusByIds = async (
  ids,
  filterByFormula = '',
  sort = []
) => {
  let formula = `OR(${ids.reduce((f, id) => `${f} {ID}='${id}',`, '')} 1 < 0)`;
  formula = filterByFormula ? `AND(${filterByFormula}, ${formula})` : formula;
  return getAllRecords(Tables.GAPStatus, formula, sort);
};

export const getAllGAPStatus = async (filterByFormula = '', sort = []) => {
  return getAllRecords(Tables.GAPStatus, filterByFormula, sort);
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

export const updateFarm = async (id, recordUpdates) => {
  return updateRecord(Tables.Farm, id, recordUpdates);
};

export const updateManyFarms = async recordUpdates => {
  const updatePromises = [];
  const numCalls = Math.ceil(recordUpdates.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = recordUpdates.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      updatePromises.push(updateRecords(Tables.Farm, subset));
  }
  return Promise.all(updatePromises);
};

export const updateGAPStatu = async (id, recordUpdates) => {
  return updateRecord(Tables.GAPStatus, id, recordUpdates);
};

export const updateManyGAPStatus = async recordUpdates => {
  const updatePromises = [];
  const numCalls = Math.ceil(recordUpdates.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = recordUpdates.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      updatePromises.push(updateRecords(Tables.GAPStatus, subset));
  }
  return Promise.all(updatePromises);
};

/*
 ******* DELETE RECORDS *******
 */

export const deleteUser = async id => {
  return deleteRecord(Tables.User, id);
};
export const deleteFarm = async id => {
  return deleteRecord(Tables.Farm, id);
};
export const deleteGAPStatu = async id => {
  return deleteRecord(Tables.GAPStatus, id);
};
