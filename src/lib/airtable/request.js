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

export const createGAPCertification = async record => {
  return createRecord(Tables.GAPCertification, record);
};

export const createManyGAPCertifications = async records => {
  const createPromises = [];
  const numCalls = Math.ceil(records.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = records.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      createPromises.push(createRecords(Tables.GAPCertification, subset));
  }
  return Promise.all(createPromises);
};

export const createComment = async record => {
  return createRecord(Tables.Comments, record);
};

export const createManyComments = async records => {
  const createPromises = [];
  const numCalls = Math.ceil(records.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = records.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      createPromises.push(createRecords(Tables.Comments, subset));
  }
  return Promise.all(createPromises);
};

export const createRecentUpdate = async record => {
  return createRecord(Tables.RecentUpdates, record);
};

export const createManyRecentUpdates = async records => {
  const createPromises = [];
  const numCalls = Math.ceil(records.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = records.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      createPromises.push(createRecords(Tables.RecentUpdates, subset));
  }
  return Promise.all(createPromises);
};

export const createRecentHarvestLog = async record => {
  return createRecord(Tables.RecentHarvestLogs, record);
};

export const createManyRecentHarvestLogs = async records => {
  const createPromises = [];
  const numCalls = Math.ceil(records.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = records.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      createPromises.push(createRecords(Tables.RecentHarvestLogs, subset));
  }
  return Promise.all(createPromises);
};

export const createTotalHarvest = async record => {
  return createRecord(Tables.TotalHarvests, record);
};

export const createManyTotalHarvests = async records => {
  const createPromises = [];
  const numCalls = Math.ceil(records.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = records.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      createPromises.push(createRecords(Tables.TotalHarvests, subset));
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

export const getGAPCertificationById = async id => {
  return getRecordById(Tables.GAPCertification, id);
};

export const getGAPCertificationsByIds = async (
  ids,
  filterByFormula = '',
  sort = []
) => {
  let formula = `OR(${ids.reduce((f, id) => `${f} {ID}='${id}',`, '')} 1 < 0)`;
  formula = filterByFormula ? `AND(${filterByFormula}, ${formula})` : formula;
  return getAllRecords(Tables.GAPCertification, formula, sort);
};

export const getAllGAPCertifications = async (
  filterByFormula = '',
  sort = []
) => {
  return getAllRecords(Tables.GAPCertification, filterByFormula, sort);
};

export const getCommentById = async id => {
  return getRecordById(Tables.Comments, id);
};

export const getCommentsByIds = async (
  ids,
  filterByFormula = '',
  sort = []
) => {
  let formula = `OR(${ids.reduce((f, id) => `${f} {ID}='${id}',`, '')} 1 < 0)`;
  formula = filterByFormula ? `AND(${filterByFormula}, ${formula})` : formula;
  return getAllRecords(Tables.Comments, formula, sort);
};

export const getAllComments = async (filterByFormula = '', sort = []) => {
  return getAllRecords(Tables.Comments, filterByFormula, sort);
};

export const getRecentUpdateById = async id => {
  return getRecordById(Tables.RecentUpdates, id);
};

export const getRecentUpdatesByIds = async (
  ids,
  filterByFormula = '',
  sort = []
) => {
  let formula = `OR(${ids.reduce((f, id) => `${f} {ID}='${id}',`, '')} 1 < 0)`;
  formula = filterByFormula ? `AND(${filterByFormula}, ${formula})` : formula;
  return getAllRecords(Tables.RecentUpdates, formula, sort);
};

export const getAllRecentUpdates = async (filterByFormula = '', sort = []) => {
  return getAllRecords(Tables.RecentUpdates, filterByFormula, sort);
};

export const getRecentHarvestLogById = async id => {
  return getRecordById(Tables.RecentHarvestLogs, id);
};

export const getRecentHarvestLogsByIds = async (
  ids,
  filterByFormula = '',
  sort = []
) => {
  let formula = `OR(${ids.reduce((f, id) => `${f} {ID}='${id}',`, '')} 1 < 0)`;
  formula = filterByFormula ? `AND(${filterByFormula}, ${formula})` : formula;
  return getAllRecords(Tables.RecentHarvestLogs, formula, sort);
};

export const getAllRecentHarvestLogs = async (
  filterByFormula = '',
  sort = []
) => {
  return getAllRecords(Tables.RecentHarvestLogs, filterByFormula, sort);
};

export const getTotalHarvestById = async id => {
  return getRecordById(Tables.TotalHarvests, id);
};

export const getTotalHarvestsByIds = async (
  ids,
  filterByFormula = '',
  sort = []
) => {
  let formula = `OR(${ids.reduce((f, id) => `${f} {ID}='${id}',`, '')} 1 < 0)`;
  formula = filterByFormula ? `AND(${filterByFormula}, ${formula})` : formula;
  return getAllRecords(Tables.TotalHarvests, formula, sort);
};

export const getAllTotalHarvests = async (filterByFormula = '', sort = []) => {
  return getAllRecords(Tables.TotalHarvests, filterByFormula, sort);
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

export const updateGAPCertification = async (id, recordUpdates) => {
  return updateRecord(Tables.GAPCertification, id, recordUpdates);
};

export const updateManyGAPCertifications = async recordUpdates => {
  const updatePromises = [];
  const numCalls = Math.ceil(recordUpdates.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = recordUpdates.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      updatePromises.push(updateRecords(Tables.GAPCertification, subset));
  }
  return Promise.all(updatePromises);
};

export const updateComment = async (id, recordUpdates) => {
  return updateRecord(Tables.Comments, id, recordUpdates);
};

export const updateManyComments = async recordUpdates => {
  const updatePromises = [];
  const numCalls = Math.ceil(recordUpdates.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = recordUpdates.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      updatePromises.push(updateRecords(Tables.Comments, subset));
  }
  return Promise.all(updatePromises);
};

export const updateRecentUpdate = async (id, recordUpdates) => {
  return updateRecord(Tables.RecentUpdates, id, recordUpdates);
};

export const updateManyRecentUpdates = async recordUpdates => {
  const updatePromises = [];
  const numCalls = Math.ceil(recordUpdates.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = recordUpdates.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      updatePromises.push(updateRecords(Tables.RecentUpdates, subset));
  }
  return Promise.all(updatePromises);
};

export const updateRecentHarvestLog = async (id, recordUpdates) => {
  return updateRecord(Tables.RecentHarvestLogs, id, recordUpdates);
};

export const updateManyRecentHarvestLogs = async recordUpdates => {
  const updatePromises = [];
  const numCalls = Math.ceil(recordUpdates.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = recordUpdates.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      updatePromises.push(updateRecords(Tables.RecentHarvestLogs, subset));
  }
  return Promise.all(updatePromises);
};

export const updateTotalHarvest = async (id, recordUpdates) => {
  return updateRecord(Tables.TotalHarvests, id, recordUpdates);
};

export const updateManyTotalHarvests = async recordUpdates => {
  const updatePromises = [];
  const numCalls = Math.ceil(recordUpdates.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = recordUpdates.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      updatePromises.push(updateRecords(Tables.TotalHarvests, subset));
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
export const deleteGAPCertification = async id => {
  return deleteRecord(Tables.GAPCertification, id);
};
export const deleteComment = async id => {
  return deleteRecord(Tables.Comments, id);
};
export const deleteRecentUpdate = async id => {
  return deleteRecord(Tables.RecentUpdates, id);
};
export const deleteRecentHarvestLog = async id => {
  return deleteRecord(Tables.RecentHarvestLogs, id);
};
export const deleteTotalHarvest = async id => {
  return deleteRecord(Tables.TotalHarvests, id);
};
