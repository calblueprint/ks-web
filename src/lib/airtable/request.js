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

export const createOwner = async record => {
  return createRecord(Tables.Owner, record);
};

export const createManyOwners = async records => {
  const createPromises = [];
  const numCalls = Math.ceil(records.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = records.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      createPromises.push(createRecords(Tables.Owner, subset));
  }
  return Promise.all(createPromises);
};

export const createProjectGroup = async record => {
  return createRecord(Tables.ProjectGroup, record);
};

export const createManyProjectGroups = async records => {
  const createPromises = [];
  const numCalls = Math.ceil(records.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = records.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      createPromises.push(createRecords(Tables.ProjectGroup, subset));
  }
  return Promise.all(createPromises);
};

export const createAnnouncement = async record => {
  return createRecord(Tables.Announcement, record);
};

export const createManyAnnouncements = async records => {
  const createPromises = [];
  const numCalls = Math.ceil(records.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = records.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      createPromises.push(createRecords(Tables.Announcement, subset));
  }
  return Promise.all(createPromises);
};

export const createSolarProject = async record => {
  return createRecord(Tables.SolarProject, record);
};

export const createManySolarProjects = async records => {
  const createPromises = [];
  const numCalls = Math.ceil(records.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = records.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      createPromises.push(createRecords(Tables.SolarProject, subset));
  }
  return Promise.all(createPromises);
};

export const createSubscriberBill = async record => {
  return createRecord(Tables.SubscriberBill, record);
};

export const createManySubscriberBills = async records => {
  const createPromises = [];
  const numCalls = Math.ceil(records.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = records.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      createPromises.push(createRecords(Tables.SubscriberBill, subset));
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

export const createPledgeInvite = async record => {
  return createRecord(Tables.PledgeInvite, record);
};

export const createManyPledgeInvites = async records => {
  const createPromises = [];
  const numCalls = Math.ceil(records.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = records.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      createPromises.push(createRecords(Tables.PledgeInvite, subset));
  }
  return Promise.all(createPromises);
};

export const createPayment = async record => {
  return createRecord(Tables.Payment, record);
};

export const createManyPayments = async records => {
  const createPromises = [];
  const numCalls = Math.ceil(records.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = records.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      createPromises.push(createRecords(Tables.Payment, subset));
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

export const getOwnerById = async id => {
  return getRecordById(Tables.Owner, id);
};

export const getOwnersByIds = async (ids, filterByFormula = '', sort = []) => {
  let formula = `OR(${ids.reduce((f, id) => `${f} {ID}='${id}',`, '')} 1 < 0)`;
  formula = filterByFormula ? `AND(${filterByFormula}, ${formula})` : formula;
  return getAllRecords(Tables.Owner, formula, sort);
};

export const getAllOwners = async (filterByFormula = '', sort = []) => {
  return getAllRecords(Tables.Owner, filterByFormula, sort);
};

export const getProjectGroupById = async id => {
  return getRecordById(Tables.ProjectGroup, id);
};

export const getProjectGroupsByIds = async (
  ids,
  filterByFormula = '',
  sort = []
) => {
  let formula = `OR(${ids.reduce((f, id) => `${f} {ID}='${id}',`, '')} 1 < 0)`;
  formula = filterByFormula ? `AND(${filterByFormula}, ${formula})` : formula;
  return getAllRecords(Tables.ProjectGroup, formula, sort);
};

export const getAllProjectGroups = async (filterByFormula = '', sort = []) => {
  return getAllRecords(Tables.ProjectGroup, filterByFormula, sort);
};

export const getAnnouncementById = async id => {
  return getRecordById(Tables.Announcement, id);
};

export const getAnnouncementsByIds = async (
  ids,
  filterByFormula = '',
  sort = []
) => {
  let formula = `OR(${ids.reduce((f, id) => `${f} {ID}='${id}',`, '')} 1 < 0)`;
  formula = filterByFormula ? `AND(${filterByFormula}, ${formula})` : formula;
  return getAllRecords(Tables.Announcement, formula, sort);
};

export const getAllAnnouncements = async (filterByFormula = '', sort = []) => {
  return getAllRecords(Tables.Announcement, filterByFormula, sort);
};

export const getSolarProjectById = async id => {
  return getRecordById(Tables.SolarProject, id);
};

export const getSolarProjectsByIds = async (
  ids,
  filterByFormula = '',
  sort = []
) => {
  let formula = `OR(${ids.reduce((f, id) => `${f} {ID}='${id}',`, '')} 1 < 0)`;
  formula = filterByFormula ? `AND(${filterByFormula}, ${formula})` : formula;
  return getAllRecords(Tables.SolarProject, formula, sort);
};

export const getAllSolarProjects = async (filterByFormula = '', sort = []) => {
  return getAllRecords(Tables.SolarProject, filterByFormula, sort);
};

export const getSubscriberBillById = async id => {
  return getRecordById(Tables.SubscriberBill, id);
};

export const getSubscriberBillsByIds = async (
  ids,
  filterByFormula = '',
  sort = []
) => {
  let formula = `OR(${ids.reduce((f, id) => `${f} {ID}='${id}',`, '')} 1 < 0)`;
  formula = filterByFormula ? `AND(${filterByFormula}, ${formula})` : formula;
  return getAllRecords(Tables.SubscriberBill, formula, sort);
};

export const getAllSubscriberBills = async (
  filterByFormula = '',
  sort = []
) => {
  return getAllRecords(Tables.SubscriberBill, filterByFormula, sort);
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

export const getPledgeInviteById = async id => {
  return getRecordById(Tables.PledgeInvite, id);
};

export const getPledgeInvitesByIds = async (
  ids,
  filterByFormula = '',
  sort = []
) => {
  let formula = `OR(${ids.reduce((f, id) => `${f} {ID}='${id}',`, '')} 1 < 0)`;
  formula = filterByFormula ? `AND(${filterByFormula}, ${formula})` : formula;
  return getAllRecords(Tables.PledgeInvite, formula, sort);
};

export const getAllPledgeInvites = async (filterByFormula = '', sort = []) => {
  return getAllRecords(Tables.PledgeInvite, filterByFormula, sort);
};

export const getPaymentById = async id => {
  return getRecordById(Tables.Payment, id);
};

export const getPaymentsByIds = async (
  ids,
  filterByFormula = '',
  sort = []
) => {
  let formula = `OR(${ids.reduce((f, id) => `${f} {ID}='${id}',`, '')} 1 < 0)`;
  formula = filterByFormula ? `AND(${filterByFormula}, ${formula})` : formula;
  return getAllRecords(Tables.Payment, formula, sort);
};

export const getAllPayments = async (filterByFormula = '', sort = []) => {
  return getAllRecords(Tables.Payment, filterByFormula, sort);
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

export const updateOwner = async (id, recordUpdates) => {
  return updateRecord(Tables.Owner, id, recordUpdates);
};

export const updateManyOwners = async recordUpdates => {
  const updatePromises = [];
  const numCalls = Math.ceil(recordUpdates.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = recordUpdates.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      updatePromises.push(updateRecords(Tables.Owner, subset));
  }
  return Promise.all(updatePromises);
};

export const updateProjectGroup = async (id, recordUpdates) => {
  return updateRecord(Tables.ProjectGroup, id, recordUpdates);
};

export const updateManyProjectGroups = async recordUpdates => {
  const updatePromises = [];
  const numCalls = Math.ceil(recordUpdates.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = recordUpdates.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      updatePromises.push(updateRecords(Tables.ProjectGroup, subset));
  }
  return Promise.all(updatePromises);
};

export const updateAnnouncement = async (id, recordUpdates) => {
  return updateRecord(Tables.Announcement, id, recordUpdates);
};

export const updateManyAnnouncements = async recordUpdates => {
  const updatePromises = [];
  const numCalls = Math.ceil(recordUpdates.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = recordUpdates.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      updatePromises.push(updateRecords(Tables.Announcement, subset));
  }
  return Promise.all(updatePromises);
};

export const updateSolarProject = async (id, recordUpdates) => {
  return updateRecord(Tables.SolarProject, id, recordUpdates);
};

export const updateManySolarProjects = async recordUpdates => {
  const updatePromises = [];
  const numCalls = Math.ceil(recordUpdates.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = recordUpdates.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      updatePromises.push(updateRecords(Tables.SolarProject, subset));
  }
  return Promise.all(updatePromises);
};

export const updateSubscriberBill = async (id, recordUpdates) => {
  return updateRecord(Tables.SubscriberBill, id, recordUpdates);
};

export const updateManySubscriberBills = async recordUpdates => {
  const updatePromises = [];
  const numCalls = Math.ceil(recordUpdates.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = recordUpdates.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      updatePromises.push(updateRecords(Tables.SubscriberBill, subset));
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

export const updatePledgeInvite = async (id, recordUpdates) => {
  return updateRecord(Tables.PledgeInvite, id, recordUpdates);
};

export const updateManyPledgeInvites = async recordUpdates => {
  const updatePromises = [];
  const numCalls = Math.ceil(recordUpdates.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = recordUpdates.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      updatePromises.push(updateRecords(Tables.PledgeInvite, subset));
  }
  return Promise.all(updatePromises);
};

export const updatePayment = async (id, recordUpdates) => {
  return updateRecord(Tables.Payment, id, recordUpdates);
};

export const updateManyPayments = async recordUpdates => {
  const updatePromises = [];
  const numCalls = Math.ceil(recordUpdates.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = recordUpdates.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      updatePromises.push(updateRecords(Tables.Payment, subset));
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

export const deleteOwner = async id => {
  return deleteRecord(Tables.Owner, id);
};
export const deleteProjectGroup = async id => {
  return deleteRecord(Tables.ProjectGroup, id);
};
export const deleteAnnouncement = async id => {
  return deleteRecord(Tables.Announcement, id);
};
export const deleteSolarProject = async id => {
  return deleteRecord(Tables.SolarProject, id);
};
export const deleteSubscriberBill = async id => {
  return deleteRecord(Tables.SubscriberBill, id);
};
export const deleteRateSchedule = async id => {
  return deleteRecord(Tables.RateSchedule, id);
};
export const deletePledgeInvite = async id => {
  return deleteRecord(Tables.PledgeInvite, id);
};
export const deletePayment = async id => {
  return deleteRecord(Tables.Payment, id);
};
export const deleteInvestmentBreakdown = async id => {
  return deleteRecord(Tables.InvestmentBreakdown, id);
};
